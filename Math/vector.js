function Vector(start, end) {
	this.start = {};
	this.end = {};
	this.start = start;
	this.end = end;
	this.x = this.end.x - this.start.x;
	this.y = this.end.y - this.start.y;
}

Vector.prototype.start = {};
Vector.prototype.end = {};

Vector.prototype.length = function() {
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector.prototype.dotProduct = function(vector) {
	return this.x * vector.x + this.y * vector.y;
}
