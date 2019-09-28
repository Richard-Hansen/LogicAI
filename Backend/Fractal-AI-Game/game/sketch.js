var boundingRectangle;
var vertices;
/* The size of the gameboard. e.g 5x5 3x8 .... */
var size;
/* This will tell us if they are logining in, in game, or in score screen */
var gameState;
var mgameScreen;
var userID;
var difficulty;
var board;
var activeImage;
var boardOne;
var boardTwo;
var boardThree;

function preload() {
  boardOne = loadImage('assets/board1.png')

  /* temp while we dont have more boards */
  boardTwo = boardOne
  boardThree = boardOne
  activeImage = boardOne
}

function setup() {
  /* Create our canvas with the max windowWidth and windowHeight */
  createCanvas(windowWidth,windowHeight)
  /* Have all our rects in center mode */
  rectMode(CENTER);
  /* Have all our text in center mode */
  textAlign(CENTER);
  /* Making an instance of the game, this will call the map route to setup the game */
  mgameScreen = new gameScreen();
  /* Making an instance of the start screen, this is where you will make your
     username and what not */
  mstartScreen = new StartScreen();
  mstartScreen.start()
  /* Set the gameState */
  gameState = 0;
}

function draw() {
  /* Check what gamestate we are in
            0 = start screen
            1 = game screen
            2 = score screen
  */
  if(gameState == 0){
    /* Init state, will be called when a new user logs in */
    mstartScreen.draw();
  }else if(gameState == 1) {
    /* Call our games draw function, conditional rendering at its finest :) */
    mgameScreen.draw();
  }
}

/*
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files &
*/
