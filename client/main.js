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
	var camera = new Camera($("#root"));
	var teapot = new TriModel(camera.div, "teapot");

	var oldx=0, oldy=0;
	$(document).mousemove(function(e){
		var off=3;
		local_plyr.rot.y -= (oldx - e.pageX)/off;
		local_plyr.rot.x += (oldy - e.pageY)/off;
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
				local_plyr.weapon().reload;
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
		// TODO do plyr/cam updates here
	}, 100);
});
