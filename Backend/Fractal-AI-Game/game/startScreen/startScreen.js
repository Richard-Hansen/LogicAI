class startScreen {
  constructor() {
    /* Position of the title X and Y. It will start in the center of the screen */
    this.titleX = windowWidth/2;
    this.titleY = windowHeight/2;
    /* The size of the title, this will be decreased by 1 per frame until it gets to the top */
    this.titleSize = 200;
    /* This is the state of the start screen we are in */
    this.startScreenState = 0;

    /* All this code is to create text inputs. I'm not sure how to center this correctly */
    // textAlign(RIGHT);
    // this.input = createInput().size(windowWidth/3.5,windowHeight/15);
    // // this.input.position(windowWidth/2, windowHeight/2);
    // this.input.style('font-size', '30px');
    // this.input.style('border-radius', '25px');
    // this.input.style('border', 'px solid #000000');
    // this.input.center();
  }

  /**
   * draw - This function will be called when we are in gamestate 0
   */
  draw() {
    /* Setting background to white */
    background(255)
    /* Draw the LogicAI title */
    this.drawTitle(this.titleX, this.titleY, this.titleSize);
    /* Make the title move */
    this.animateTitle();
    /* Checking what startscreen state we are in */
    if(this.startScreenState == 1){
      this.animateBoxes();
    }
  }

  /**
   * animateBoxes - This function will be called once @link{animateTitle} has finished.
   *                Once this happens this function will start displaying the boxes.
   */
  animateBoxes() {

  }

  /**
   * animateTitle - This function will make the title animated.
   */
  animateTitle() {
    /* Once the titleY goes to high, we will stop it and put it into a new startscreen */
    if(this.titleY < windowHeight/8) {
      /* Set the new startscreen state */
      this.startScreenState = 1;
    } else {
      /* This will start bring the title up */
      this.titleY -= windowHeight/150
      /* This will decrease the size of the title as it moves */
      this.titleSize -= 1
    }
  }

  /**
   * drawTitle - This function display the LogicAI logo at the top of the screen
   */
  drawTitle(x, y, size) {
    /* push all my settings */
    push();
    /* Setting the fontSize */
    textSize(size);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Translate back to 0,0 (so the top left corner is the (0,0) coordinate) */
    translate(0,0);
    /* Set my textAlign to the left so they get lined up correctly */
    textAlign(CENTER);
    /* Drawing 'AI' in the left top corner of the screen */
    text('LogicAI', x, y);
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }
}
