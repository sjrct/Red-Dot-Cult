//
// main.js
//

$(document).ready(function(){
	var mleft = false, mright = false;
	var mfoward = false, mbackward = false;
	var local_plyr = new Player("You");
	var camera = new Camera($("#root"));

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
			case 37: mleft     = true; break;
			case 38: mfoward   = true; break;
			case 39: mright    = true; break;
			case 40: mbackward = true; break;
		};
	});

	$(document).keyup(function(e)
	{
		switch(e.keyCode) {
			case 37: mleft     = false; break;
			case 38: mfoward   = false; break;
			case 39: mright    = false; break;
			case 40: mbackward = false; break;
		};
	});
	
	window.setInterval(function()
	{
		// TODO do plyr/cam updates here
	}, 100);
});
