//
// Camera.js
//

function __CameraUpdateHack(cam) {
	window.setInterval(function(){cam.Update()}, 100)
}

function Camera(parent) {
	this.rot = new Vector3(180, 90, 0);
	this.trs = new Vector3(0, 200, -1000);
	this.div = document.createElement("div");
	
	this.Update = function() {
		// I am pretty sure the correct order should be rotate->translate
		UpdateByObj(this.div, transform, rotate3d(this.rot) + translate3d(this.trs));
	}
	
	parent.append(this.div);
	UpdateByObj(this.div, transform_style, "preserve-3d");
	UpdateByObj(this.div, backface_visibility, "hidden");
	UpdateByObj(this.div, transition_duration, "0.3s")
	this.Update();
	__CameraUpdateHack(this);
}

