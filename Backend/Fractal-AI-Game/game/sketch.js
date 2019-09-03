var boundingRectangle;
var vertices;
/* The size of the gameboard. e.g 5x5 3x8 .... */
var size;

function setup() {
  createCanvas(windowWidth,windowHeight)
  rectMode(CENTER);
  textAlign(CENTER);
  boundingRectangle = new BoundingRectangle();
  vertices = new Vertices();
  size = createVector(5,5);
}

function draw() {
  /* Redraw the background */
  background(0);
  /* Draw bounding rectangle */
  boundingRectangle.drawBoundingRectangle();
  /* Draw the Grid */
  vertices.drawGrid(size);
}

function mouseClicked() {
  ellipse(mouseX, mouseY, 20, 20);
  callMoveRoute();
}

function callMoveRoute() {
  httpPost("http://localhost:8080/move", {XOne: 0, YOne:2, XTwo:4, YTwo:6}, function(res) {
    // console.log(res);
  });

}
