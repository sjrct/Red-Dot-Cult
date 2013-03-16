//
// main.js
//

var Controls = {
	left:   37,	// left arrow
	up:     38,	// up arrow
	right:  39,	// right arrow
	down:   40,	// down arrow
	reload: 17,	// ctrl
	menu:   27,	// escape
};

$(document).ready(function(){
	var mleft = false, mright = false;
	var mfoward = false, mbackward = false;
	var local_plyr = new Player("You");
	var camera = new Camera($("#camera"));

	// lock camera to player
	camera.rot = local_plyr.rot;
	camera.pos = local_plyr.pos;
	
	// temporary
	var lvl = new Level(camera.div, "testlvl");
	camera.pos.y = -600;
	camera.pos.z = 1500;
	camera.rot.x = 160;
	local_plyr.add_weapon(new Weapon("L4z0R", 10, 5, 15));

	// menu setup	
	var menu = new Hud.Menu();
	menu.add('hello', function(){console.log("hello")});
	menu.add('Resume', function(){Hud.stop_menu(); menu_shown=false});
	var menu_shown = false;
	
	Hud.update_all(local_plyr);

	///// handlers begin /////
	var oldx=0, oldy=0, first_mm = true;
	$(document).mousemove(function(e){
		if (menu_shown) return;

		if (first_mm) {
			first_mm = false;
		} else {
			var off=3;
			local_plyr.rot.y += (oldx - e.pageX)/off;
			local_plyr.rot.x += (oldy - e.pageY)/off;
		}
		
		oldx = e.pageX;
		oldy = e.pageY;
	});
	
	$(document).keydown(function(e)
	{
		switch(e.keyCode) {
			case Controls.left:  mleft     = true; break;
			case Controls.up:    mfoward   = true; break;
			case Controls.right: mright    = true; break;
			case Controls.down:  mbackward = true; break;

			case Controls.reload:
				if (menu_shown) return;
	
				if (local_plyr.has_weapon()) {
					local_plyr.weapon().reload();
					Hud.update_ammo(local_plyr);
				}
				break;
			
			case Controls.menu:
				if (menu_shown) Hud.stop_menu();
				else Hud.set_menu(menu);
				menu_shown = !menu_shown;
				break;
		};
	});

	$(document).keyup(function(e)
	{
		if (menu_shown) return;

		switch(e.keyCode) {
			case Controls.left:  mleft     = false; break;
			case Controls.up:    mfoward   = false; break;
			case Controls.right: mright    = false; break;
			case Controls.down:  mbackward = false; break;
		};
	});
	
	$(document).click(function(e)
	{
		if (menu_shown) return;

		if (local_plyr.has_weapon()) {
			local_plyr.weapon().fire();
			Hud.update_ammo(local_plyr);
		}
	});

	var speed = 40;	
	window.setInterval(function()
	{
		if (menu_shown) return;

		var theta = -local_plyr.rot.y * (Math.PI)/180;
		var theta2 = theta + (Math.PI/2);
		var dx = 0, dz = 0;
		if (mfoward) {
			dz -= Math.cos(theta) * speed;
			dx -= Math.sin(theta) * speed;
		}
		if (mbackward) {
			dz += Math.cos(theta) * speed;
			dx += Math.sin(theta) * speed;
		}
		if (mright) {
			dz -= Math.cos(theta2) * speed;
			dx -= Math.sin(theta2) * speed;
		}
		if (mleft) {
			dz += Math.cos(theta2) * speed;
			dx += Math.sin(theta2) * speed;
		}
		
		local_plyr.pos.x += dx;
		local_plyr.pos.z += dz;
		
		$("#dbg").html(
			"cam pos = (" + camera.pos.x + ", " + camera.pos.y + ", " + camera.pos.z + ")<br>" +
			"cam rot = (" + camera.rot.x + ", " + camera.rot.y + ", " + camera.rot.z + ")<br>"
		);
	}, 100);
	
	debug("Connecting...");
	Socket.Connect(connect);
});

var Server = {
	GetArena : 000,
}

function debug(data) {
	$("#console").html($("#console").html() + "<br>" + data);
}

var foo;
function chooseArena(arena) {
	Hud.stop_menu();
	arena = arena.currentTarget.textContent;
	debug("Chose " + arena);
	console.log(arena);
}

function ArenaMenu(list) {
	debug("Retreived list of active arenas");
	var menu = new Hud.Menu();
	var arenas = list.split(";");
	arenas.forEach(function(arena){
		menu.add(arena, chooseArena);
	});
	Hud.set_menu(menu);
}

function connect(connected) {
	if(connected) {
		debug("Connected to centeral server");
		debug("Retreiving list of active arenas");
		Socket.Transaction(Server.GetArena, ArenaMenu);
	} else {
		debug("Failed to connect to server");
	}
}


