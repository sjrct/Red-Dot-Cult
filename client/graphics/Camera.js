//
// Camera.js
//

function __CameraUpdateHack(cam) {
	window.setInterval(function(){cam.Update()}, 70)
}

function Camera(parent) {
	this.rot = new Vector3(0, 0, 0);
	this.pos = new Vector3(0, 0, 0);
	this.div = document.createElement("div");
	
	this.Update = function() {
		// I am pretty sure the correct order should be rotate->translate
		mx = -this.pos.x;
		my = -this.pos.y;
		mz = -this.pos.z;
		UpdateByObj(this.div, transform_origin, mx + "px " + my + "px " + mz + "px");
		UpdateByObj(this.div, transform, ptranslate3d(this.pos.x, this.pos.y, -150) + rotate3d(this.rot));
	}
	
	parent.append(this.div);
	UpdateByObj(this.div, transform_style, "preserve-3d");
	UpdateByObj(this.div, backface_visibility, "hidden");
	UpdateByObj(this.div, transition_duration, "0.3s")
	this.Update();
	__CameraUpdateHack(this);
}

