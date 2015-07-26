function Poly() {
	this.points = [];
	this.copy = [];
	this.closed = false;
}

Poly.prototype.addPoint = function(point) {
	this.points.push(point);
	return this;
};

Poly.prototype.addPointTo = function(point, index) {
	this.points.splice(index, 0, point);
	return this;
};

Poly.prototype.get = function(index) {
	return this.points[index];
};

Poly.prototype.getFirstPoint = function() {
	return this.points[0];
};

Poly.prototype.numberOfPoints = function() {
	return this.points.length;
};

Poly.prototype.next = function(index) {
	return this.has(index + 1) ? this.get(index + 1) : this.getFirstPoint()
};

Poly.prototype.has = function(index) {
	return !!this.points[index];
};

Poly.prototype.makeCopy = function() {
	return this.copy = this.points.slice();
};

Poly.prototype.getCopy = function(index) {
	return this.copy.length ? this.copy[index] : this.points[index];
};

Poly.prototype.copyHas = function(index) {
	return !!(this.copy.length ? this.copy[index] : this.points[index]);
};

Poly.prototype.copyCount = function() {
	return this.copy.length ? this.copy.length : this.points.length;
};

Poly.prototype.close = function() {
	this.closed = true;
	return this;
};

Poly.prototype.isClosed = function() {
	return this.closed;
};