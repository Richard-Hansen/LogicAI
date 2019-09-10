var boundingRectangle;
var vertices;
/* The size of the gameboard. e.g 5x5 3x8 .... */
var size;
/* This will tell us if they are logining in, in game, or in score screen */
var gameState;

function setup() {
  /* Create our canvas with the max windowWidth and windowHeight */
  createCanvas(windowWidth,windowHeight)
  /* Have all our rects in center mode */
  rectMode(CENTER);
  /* Have all our text in center mode */
  textAlign(CENTER);
  /* Making an instance of the game, this will call the map route to setup the game */
  mgameScreen = new gameScreen();
  /* Set the gameState */
  gameState = 1;
}

function draw() {
  /* Check what gamestate we are in
            0 = start screen
            1 = game screen
            2 = score screen
  */
  if(gameState == 0){

  }else if(gameState == 1) {
    /* Call our games draw function, conditional rendering at its finest :) */
    mgameScreen.draw();
  }
}

/*
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files &
*/
