//
// Vector3.js
//

function Vector3(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
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
