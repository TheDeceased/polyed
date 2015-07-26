var canvasElement = document.getElementById('myCanvas');
var context = canvasElement.getContext('2d');

context.strokeStyle = '#777777';
context.lineWidth = 3;

var poly = new Poly();

canvasElement.addEventListener('click', function(ev) {
	var point = new Point(ev.offsetX, ev.offsetY);
	if (poly.isClosed()) {
		poly.makeCopy();
		poly.addPointTo(point, getClosestLine(poly, point) + 1);
		redraw(poly, context);
		return;
	}
	poly.addPoint(point);
	redraw(poly, context);
});

document.addEventListener('keypress', function(ev) {
	if (ev.which == 13) {
		poly.close();
		redraw(poly, context);
	}
});

function redraw(poly, context) {
	context.clearRect(0,0,600,400);
	var pointsCount = poly.numberOfPoints();
	if (pointsCount > 1) {
		for (var i = 0; i < poly.copyCount(); i++) {
			if (poly.copyHas([i+1])) {
				drawLine(poly.getCopy(i), poly.getCopy(i + 1), context);
			} else {
				if (poly.isClosed()) {
					drawLine(poly.getCopy(i), poly.getCopy(0), context)
				}
			}
		}
		context.beginPath();
		context.moveTo(poly.getFirstPoint().x, poly.getFirstPoint().y);
		for (var i = 0; i < pointsCount; i++) {
			if (poly.has([i+1])) {
				drawSection(poly.get(i), poly.get(i + 1), context);
			}
		}
		if (poly.isClosed()) {
			context.closePath();
		}

		context.stroke();
	}
	for (var i = 0; i < pointsCount; i++) {
		drawPoint(poly.get(i), i, context);
	}
}

function drawPoint(point, index, context) {
	context.beginPath();
	context.fillStyle = '#2D89EF';
	context.arc(point.x, point.y, 5, 0, 2*Math.PI, false);
	context.fill();
	context.closePath();
	context.fillText(index, point.x+5, point.y-3);
}

function drawSection(A, B, context) {
	context.lineTo(B.x, B.y);
}

function drawLine(A, B, context) {
	var first = (A.y*B.x - A.x*B.y + 0*(B.y - A.y))/(B.x - A.x);
	var last = (A.y*B.x - A.x*B.y + 600*(B.y - A.y))/(B.x - A.x);
	context.lineWidth = 1;
	context.strokeStyle = '#cecece';
	context.closePath();
	context.beginPath();
	context.moveTo(0, first);
	context.lineTo(600, last);
	context.stroke();
	context.closePath();
	context.strokeStyle = '#777777';
	context.lineWidth = 3;
}