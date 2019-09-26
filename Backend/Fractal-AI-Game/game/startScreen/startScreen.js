/**
 * User Stories
 * 1. As a user, I would like to be able to enter my name upon my first time playing the game -- Done
 * 2. As a user, I would like to be able to select the difficulty of the AI -- Done
 * 3. As a user, I would like to be able to press a button to start the game -- Done
 * 4. As a user, I would like to be remembered [by the browser] so that information is stored between sessions -- Done
 * 5. As a user, I would like to be able to select a game board to play on -- Done
 * 6. As a user, I would like to be able to navigate to the game board page so that I would be able to go to the game -- wat
 * 16.
 * 18.
 */


class StartScreen {
  constructor() {
    /* This is the state of the start screen we are in */
    this.startScreenState = 0;
  }

  start() {
    this.buildScreen()
    this.createInputs()
    this.hide()
  }

  buildScreen() {
    /* Position of the title X and Y. It will start in the center of the screen */
    this.titleX = windowWidth / 2;
    this.titleY = windowHeight / 2;
    /* The size of the title, this will be decreased by 1 per frame until it gets to the top */
    this.titleSize = 200;
    this.boxAlpha = 0;
    this.callScoresRoute()
    this.inpWidth = windowWidth / 3.5
    this.inpHeight = windowHeight / 15
    this.ds = new DifficultySelector()
    this.bs = new BoardSelector()
  }

  createInputs() {
    this.nameInput = createInput();
    this.nameInput.size(windowWidth / 3.5, windowHeight / 15)
    this.nameInput.style('font-size', '30px');
    this.nameInput.style('border-radius', '0px');
    this.nameInput.style('position', 'absolute');
    this.nameInput.style('top', '85%');
    this.nameInput.style('left', '50%');
    this.nameInput.style('margin-left', -1 * this.inpWidth / 2 + 'px')
    this.nameInput.style('margin-top', -1 * this.inpHeight / 2 + 'px')
    this.loginUser();
    this.button = createButton('play');
    this.button.mousePressed(this.playGame(this));
    this.button.position(100, windowHeight / 1.1)
    this.button.center('horizontal')
    this.ds.createInputs()
    this.bs.createInputs()
  }

  hide() {
    this.bs.hide()
    this.ds.hide()
    this.nameInput.hide()
    this.button.hide()
  }

  /*
  * switch - hides inputs and switches gameState
  */
  switchState(test = false) {
    // smoke and mirrors
    if (!test)
      this.hide()
    gameState = 1;
  }

  /*
  * playGame - checks if username has been entered and sets username then switches page
  */
  playGame(that, test = false) {
    return function () {
      if (!that.nameInput.elt.value) {
        alert("Please enter a username!")
        return 'NOUSERNAME'
      } else if (that.nameInput.elt.value.length > 30) {
        alert("Please enter a username less than 30 characters!")
        return 'LONGUSERNAME'
      } else if (!/^[a-zA-Z\d]*$/.test(that.nameInput.elt.value)) {
        alert("Only use alphabetical characters or digits!")
        return 'BADCHARS'
      } else {
        if (that.callAuthRoute()) {
          window.localStorage.setItem("userName", that.nameInput.elt.value)
          that.switchState(test)
        }
        else return 'NOTOK'
        return 'OK'
      }
    }
  }

  /*
  * loginUser - Checks if user in localStorage, creates new ID if not, retrieves name if so
  */
  loginUser() {
    if (!(userID = window.localStorage.getItem("userID"))) {
      userID = Math.floor(Math.random() * 10000000);
      window.localStorage.setItem("userID", userID)
    } else {
      this.nameInput.elt.value = window.localStorage.getItem("userName");
    }
  }

  /*
  * callAuthRoute - Sets username
  */
  callAuthRoute() {
    var that = this
    var isokay = true
    httpPost("http://localhost:8080/auth", { user: userID, username: that.nameInput.elt.value }, function (res) {
      console.log("RES:", res)
    }, function (err) {
      // deal with this better in the future
      alert("Username taken")
      isokay = false
    })
    return isokay
  }

  /*
  * callScoresRoute - Gets high scores
  */
  callScoresRoute() {
    httpPost("http://localhost:8080/hiscores", function (res) {
      console.log(res)
    })
  }

  checkKeyPress(keyCode) {
    if (keyCode === 13 && this.nameInput.elt === document.activeElement) {
      this.playGame()
    }
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
    if (this.startScreenState == 1) {
      // this.animateBoxes();
      var pos = this.bs.getBoardPos()
      image(activeImage, pos.x + (boardOne.width / 3.3) / 3, pos.y + 125, boardOne.width / 3.3, boardOne.height / 3.3)
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
    translate(windowWidth / 2, windowHeight / 2);
    /* Setting my strokeweight */
    strokeWeight(4);
    /* Setting my stroke color */
    stroke(0, 0, 0, this.boxAlpha);
    /* Drawing my rectangle */
    rect(0, -windowHeight / 10, windowWidth / 3, windowHeight / 10, 20);

    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  /**
   * animateTitle - This function will make the title animated.
   */
  animateTitle() {
    /* Once the titleY goes to high, we will stop it and put it into a new startscreen */
    if (this.titleY < windowHeight / 7) {
      /* Set the new startscreen state */
      this.startScreenState = 1;
      this.nameInput.show()
      this.button.show()
      this.bs.show()
      this.ds.show()
    } else {
      /* This will start bring the title up */
      this.titleY -= windowHeight / 150;
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
    translate(0, 0);
    /* Set my textAlign to the left so they get lined up correctly */
    textAlign(CENTER);
    /* Drawing 'AI' in the left top corner of the screen */
    text('LogicAI', x, y);
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }
}

function keyPressed() {
  mstartScreen.checkKeyPress(keyCode);
}

module.exports = StartScreen
