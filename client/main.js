//
// main.js
//

var Controls = {
	left:   37,	// left arrow
	right:  38,	// right arrow
	up:     39,	// up arrow
	down:   40,	// down arrow
	reload: 17,	// ctrl
};

$(document).ready(function(){
	var mleft = false, mright = false;
	var mfoward = false, mbackward = false;
	var local_plyr = new Player("You");
	var camera = new Camera($("#camera"));
	var teapot = new TriModel(camera.div, "teapot");

	// lock camera to player
	camera.rot = local_plyr.rot;
	camera.pos = local_plyr.pos;

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
				if (typeof(local_plyr.cur_weap) !== 'undefined') {
					local_plyr.weapons[local_plyr.cur_weap].reload();
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
	
	window.setInterval(function()
	{
		if (mfoward)   //TODO;
		if (mbackward) ;
		if (mright)    ;
		if (mleft)     ;
		
		$("#dbg").html(
			"cam pos = (" + camera.pos.x + ", " + camera.pos.y + ", " + camera.pos.z + ")<br>" +
			"cam rot = (" + camera.rot.x + ", " + camera.rot.y + ", " + camera.rot.z + ")<br>" 
		);
	}, 100);
});
