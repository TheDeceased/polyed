function getClosestLine(poly, point) {
	var distances = [];
	for (var i = 0; i < poly.numberOfPoints(); i++) {
		distances.push(getDistaceToSector(poly.get(i), poly.next(i), point));
	}
	return distances.indexOf(Math.min.apply(null, distances));
}

function getDistanceToLine(A, B, M) {
	return Math.abs(
		((B.x - A.x) * (M.y - A.y) - (B.y - A.y) * (M.x - A.x)) /
		(Math.sqrt(Math.pow(B.y - A.y, 2) + Math.pow(B.x - A.x, 2)))
	);
	return Math.abs(
		((A.y - B.y) * M.x + (B.x - A.x) * M.y - B.x * A.y + A.x * B.y) /
		(Math.sqrt(Math.pow(B.y - A.y, 2) + Math.pow(B.x - A.x, 2)))
	);
}

function getDistaceToSector(A, B, M) {
	if (new Vector(A, M).dotProduct(new Vector(A, B)) < 0) {
		return new Vector(M, A).length();
	}

	if (new Vector(B, M).dotProduct(new Vector(B, A)) < 0) {
		return new Vector(M, B).length();
	}

	return getDistanceToLine(A, B, M);
}
