//
// Vector.js
//
// written by sjrct
//

Vector = function(a) {
	this.a = a;
}

Vector.prototype.operate = function(v, op) {
	if (this.a.length != v.a.length) {
		throw "Cannot operate on vectors of different size.";
	}
	
	for (var i = 0; i < v.a.length; i++) {
		this.a[i] = op(this.a[i], v.a[i]);
	}
}

Vector.prototype.add = function(v) {
	this.operate(v, function(x,y) { return x+y });
}

Vector.prototype.sub = function(v) {
	this.operate(v, function(x,y) { return x-y });
}

Vector.prototype.mul = function(v) {
	this.operate(v, function(x,y) { return x*y });
}
