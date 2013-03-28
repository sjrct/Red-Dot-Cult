//
// Vector3.js
//

// Vector3(Array[3])
// Vector3(Vector3)
// Vector3(x, y, z)
function Vector3(x, y, z)
{
	if (x instanceof Array) {
		this.x = x[0];
		this.y = x[1];
		this.z = x[2];
	} else if (x instanceof Vector3) {
		this.x = x.x;
		this.y = x.y;
		this.z = x.z;
	} else {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

Vector3.prototype.operate = function(v, op)
{
	this.x = op(this.x, v.x);
	this.y = op(this.y, v.y);
	this.z = op(this.z, v.z);
}

Vector3.prototype.add = function(v) {
	this.operate(v, function(x,y) { return x+y });
}

Vector3.prototype.sub = function(v) {
	this.operate(v, function(x,y) { return x-y });
}

Vector3.prototype.mul = function(v) {
	this.operate(v, function(x,y) { return x*y });
}

Vector3.prototype.isZero = function() {
	return this.x == 0 && this.y == 0 && this.z == 0;
}
