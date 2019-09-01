var boundingRectangle;
var vertices;

function setup() {
  createCanvas(windowWidth,windowHeight)
  rectMode(CENTER);
  textAlign(CENTER);
  boundingRectangle = new BoundingRectangle();
  vertices = new Vertices();
}

function draw() {
  /* Redraw the background */
  background(0);
  /* Draw bounding rectangle */
  boundingRectangle.drawBoundingRectangle();

  // vertices.drawGrid();
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
