var boundingRectangle;
var vertices;
/* The size of the gameboard. e.g 5x5 3x8 .... */
var size;
/* This will tell us if they are logining in, in game, or in score screen */
var gameState;

var gameScreenVar;

function setup() {
  createCanvas(windowWidth,windowHeight)
  rectMode(CENTER);
  textAlign(CENTER);
  mgameScreen = new gameScreen();
  gameState = 1;
}

function draw() {
  /* Redraw the background */
  if(gameState == 0){

  }else if(gameState == 1) {
    mgameScreen.draw();
  }
}

/*
function mouseClicked() {
  ellipse(mouseX, mouseY, 20, 20);
  callMoveRoute();
}
*/
/*
function callMoveRoute() {
  httpPost("http://localhost:8080/move", {XOne: 0, YOne:2, XTwo:4, YTwo:6}, function(res) {
    // console.log(res);
  });
}
*/


/*
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files &
*/
