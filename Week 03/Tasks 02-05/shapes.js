function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.getDistance = function (otherPoint) {
  return Math.sqrt(
    Math.pow(otherPoint.x - this.x, 2) + Math.pow(otherPoint.y - this.y, 2)
  );
};

function Circle(x, y, radius) {
  Point.call(this, x, y);
  this.radius = radius;
}

Circle.prototype = Object.create(Point.prototype);

Circle.prototype.getCircumference = function () {
  return 2 * Math.PI * this.radius;
};

Circle.prototype.getArea = function () {
  return Math.PI * Math.pow(this.radius, 2);
};

Circle.prototype.intersects = function (otherCircle) {
  const distanceBetweenCenters = this.getDistance(
    new Point(otherCircle.x, otherCircle.y)
  );

  return distanceBetweenCenters < this.radius + otherCircle.radius; // or whatever the formula was :D
};

function Rectangle(x1, y1, a, b) {
  Point.call(this, x1, y1);
  this.a = a;
  this.b = b;
}

Rectangle.prototype = Object.create(Point.prototype);

Rectangle.prototype.getPerimeter = function () {
  return 2 * (this.a + this.b);
};

Rectangle.prototype.getArea = function () {
  return this.a * this.b;
};

Rectangle.prototype.getLengthOfDiagonals = function () {
  const diagonalLength = Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.b, 2));
  return [diagonalLength, diagonalLength];
};

Rectangle.prototype.getBiggestCircle = function () {
  const smallestSide = this.a < this.b ? this.a : this.b;
  return new Circle(this.x, this.y, smallestSide / 2);
};

function RectanglePrism(x, y, a, b, c) {
  Rectangle.call(this, x, y, a, b);
  this.c = c;
}

RectanglePrism.prototype = Object.create(Rectangle.prototype);

RectanglePrism.prototype.getVolume = function () {
  return this.a * this.b * this.c;
};
