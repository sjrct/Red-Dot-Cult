//
// Camera.js
//

function __CameraUpdateHack(cam) {
	window.setInterval(function(){cam.Update()}, 70)
}

function Camera(parent) {
	this.rot = new Vector3(0, 0, 0);
	this.pos = new Vector3(0, 0, 0);
	this.fov = 700;
	this.div = document.createElement("div");
	this.divtop = document.createElement("div");
	
	this.Update = function() {
		UpdateByObj(this.divtop, transform, ptranslate3d(0, 0, this.fov) + rotate3d(this.rot) );
		UpdateByObj(this.div, transform, ptranslate3d(this.pos.x, this.pos.y, this.pos.z));		
	}
	
	parent.append(this.divtop);
	$(this.divtop).append(this.div);

	UpdateByObj(this.div, transform_style, "preserve-3d");
	UpdateByObj(this.div, transition_duration, "0.3s")
	UpdateByObj(this.div, transform_origin, "0 0 0");
	UpdateByObj(this.div, backface_visibility, "hidden");
	UpdateByObj(this.divtop, transform_style, "preserve-3d");
	UpdateByObj(this.divtop, transition_duration, "0.3s");
	UpdateByObj(this.divtop, transform_origin, "0 0 0");
	UpdateByObj(this.divtop, backface_visibility, "hidden");

	$(this.div).css("position", "absolute");
	$(this.div).css("left", "50%");
	$(this.div).css("top", "50%");
	$(this.divtop).css("position", "absolute");
	$(this.divtop).css("left", "50%");
	$(this.divtop).css("top", "50%");
	
	this.Update();
	__CameraUpdateHack(this);
}

