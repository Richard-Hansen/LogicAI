/**
 * User Stories
 * 1. As a user, I would like to be able to enter my name upon my first time playing the game
 * 2. As a user, I would like to be able to select the difficulty of the AI
 * 3. As a user, I would like to be able to press a button to start the game
 * 4. As a user, I would like to be remembered [by the browser] so that information is stored between sessions
 * 5. As a user, I would like to be able to select a game board to play on
 * 6. As a user, I would like to be able to navigate to the game board page so that I would be able to go to the game
 * 16.
 * 18.
 */


class startScreen {
  constructor() {
    /* Position of the title X and Y. It will start in the center of the screen */
    this.titleX = windowWidth/2;
    this.titleY = windowHeight/2;
    /* The size of the title, this will be decreased by 1 per frame until it gets to the top */
    this.titleSize = 200;
    /* This is the state of the start screen we are in */
    this.startScreenState = 0;

    this.boxAlpha = 0;

    this.input = createInput().size(windowWidth/3.5,windowHeight/15);
    this.input.style('font-size', '30px');
    this.input.style('border-radius', '0px');
    // this.input.style('border', 'px solid #000000');
  }

  /**
   * draw - This function will be called when we are in gamestate 0
   */
  draw() {
    /* Setting background to white */
    background(255);
    /* Draw the LogicAI title */
    this.drawTitle(this.titleX, this.titleY, this.titleSize);
    /* Make the title move */
    this.animateTitle();
    /* Checking what startscreen state we are in */
    if(this.startScreenState == 1) {
      this.animateBoxes();
    }
  }

  /**
   * animateBoxes - This function will be called once @link{animateTitle} has finished.
   *                Once this happens this function will start displaying the boxes.
   */
  animateBoxes() {
    /* push all my settings */
    push();
    /* All this code is to create text inputs. I'm not sure how to center this correctly */
    this.boxAlpha += 2;
    /* translate my postion to the center of the screen */
    translate(windowWidth/2, windowHeight/2);
    /* Setting my strokeweight */
    strokeWeight(4);
    /* Setting my stroke color */
    stroke(0,0,0,this.boxAlpha);
    /* Drawing my rectangle */
    rect(0, -windowHeight/10, windowWidth/3, windowHeight/10, 20);
    rect(0, -windowHeight/4, windowWidth/3, windowHeight/10, 20);
    // this.input.center('horizontal');
    // this.input.center('vertical');
    // this.input.style('background-color', 'white');
    // this.input.position(0,0);
    // this.input.position(windowWidth/2, windowHeight/2);

    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  /**
   * animateTitle - This function will make the title animated.
   */
  animateTitle() {
    /* Once the titleY goes to high, we will stop it and put it into a new startscreen */
    if(this.titleY < windowHeight/7) {
      /* Set the new startscreen state */
      this.startScreenState = 1;
    } else {
      /* This will start bring the title up */
      this.titleY -= windowHeight/150;
      /* This will decrease the size of the title as it moves */
      this.titleSize -= 1;
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
