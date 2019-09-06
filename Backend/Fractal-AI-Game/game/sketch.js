var boundingRectangle;
var vertices;
/* The size of the gameboard. e.g 5x5 3x8 .... */
var size;
/* This will tell us if they are logining in, in game, or in score screen */
var gameState;

function setup() {
  createCanvas(windowWidth,windowHeight)
  rectMode(CENTER);
  textAlign(CENTER);
  boundingRectangle = new BoundingRectangle();
  vertices = new Vertices();
  size = createVector(5,5);
  gameState = 1;
}

function draw() {
  /* Redraw the background */
  background(0);
  if(gameState == 0){
    gameStateZero();
  }else if(gameState == 1) {
    gameStateOne();
  }
}

function gameStateZero(){}

function gameStateOne(){
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
