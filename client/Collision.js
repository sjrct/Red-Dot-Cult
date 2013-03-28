//
// Collision.js
//

// BoundingBox(Vector3 position, Vector3 size)
// BoundingBox(posx, posy, posz, sizex, sizey, sizez)
function BoundingBox(a, b, c, d, e, f)
{
	if (a instanceof Vector3) {
		this.pos = a;
		this.size = b;
	} else {
		this.pos = new Vector3(a, b, c);
		this.size = new Vector3(d, e, f);
	}
	
	this.sum = new Vector3(this.pos);
	this.sum.add(this.size);
}

BoudingBox.prototype = {
	Check : function(box) {
		if (box.sum.x < this.pos.x) return false;
		if (box.pos.x > this.sum.x) return false;

		if (box.sum.y < this.pos.y) return false;
		if (box.pos.y > this.sum.y) return false;

		if (box.sum.z < this.pos.z) return false;
		if (box.pos.z > this.sum.z) return false;
		
		return true;
	}
	
	CheckMultiple : function(boxes) {
		for (k in boxes) {
			if (this.Check(boxes[k])) return true;
		}
		return false;
	}
};
