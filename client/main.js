//
// main.js
//

var Controls = {
	left:   37,	// left arrow
	up:     38,	// up arrow
	right:  39,	// right arrow
	down:   40,	// down arrow
	reload: 17,	// ctrl
};
var teapot2;
$(document).ready(function(){
	var mleft = false, mright = false;
	var mfoward = false, mbackward = false;
	var local_plyr = new Player("You");
	var camera = new Camera($("#camera"));
	var l = new Entity.Load(camera.div, Entity.ModelType.RectModel, "plane");
//	var teapot = new Entity.Load(camera.div, Entity.ModelType.TriModel, "teapot");
//	teapot2 = new Entity.Load(camera.div, Entity.ModelType.TriModel, "teapot");
//	teapot.Translate3d(new Vector3(600,0,0));

	var lvl = new Level(camera.div, "testlvl");

	// lock camera to player
	camera.rot = local_plyr.rot;
	camera.pos = local_plyr.pos;
	
	camera.pos.y = -600;
	camera.pos.z = 1500;
	camera.rot.x = 160;
	
	local_plyr.add_weapon(new Weapon("L4z0R", 10, 5, 15));
	
	Hud.update_all(local_plyr);

	var oldx=0, oldy=0, first_mm = true;
	$(document).mousemove(function(e){
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
				if (local_plyr.has_weapon()) {
					local_plyr.weapon().reload();
					Hud.update_ammo(local_plyr);
				}
				break;
		};
	});

	$(document).keyup(function(e)
	{
		switch(e.keyCode) {
			case Controls.left:  mleft     = false; break;
			case Controls.up:    mfoward   = false; break;
			case Controls.right: mright    = false; break;
			case Controls.down:  mbackward = false; break;
		};
	});
	
	$(document).click(function(e)
	{
		if (local_plyr.has_weapon()) {
			local_plyr.weapon().fire();
			Hud.update_ammo(local_plyr);
		}
	});

	var speed = 40;	
	window.setInterval(function()
	{
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
	
	/*
	var socket;  
	var host = "ws://localhost:8888/ws";  
	var socket = new WebSocket(host);  
	function message(foo) {
		alert(foo);
	}

	message('<p class="event">Socket Status: '+socket.readyState);  

	socket.onopen = function(){  
		message('<p class="event">Socket Status: '+socket.readyState+' (open)');  
	}  

	socket.onmessage = function(msg){
		message('<p class="message">Received: '+msg.data);  
		socket.send("hi there!");
	}

	socket.onclose = function(){  
		message('<p class="event">Socket Status: '+socket.readyState+' (Closed)');  
	}  */
});
