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
var Gamebackground;
var buttonsOnStartScreen = [];
// var difficultyIntForm;
class StartScreen {
  constructor() {
    /* This is the state of the start screen we are in */
    this.startScreenState = 0;
    /* background object */
    Gamebackground = new gamebackground();

    this.boxAlpha = 0;

    this.difficultyIntForm = 0;

    buttonsOnStartScreen.push(
      {
        "x": (-windowWidth/10),
        "y": (windowHeight / 3.6)
      }
    )

    buttonsOnStartScreen.push(
      {
        "x": (windowWidth/10),
        "y": (windowHeight / 3.6)
      }
    )
    buttonsOnStartScreen.push(
      {
        "x": (-windowWidth/9),
        "y": (windowHeight / 10)
      }
    )
    buttonsOnStartScreen.push(
      {
        "x": (windowWidth/9),
        "y": (windowHeight / 10)
      }
    )
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
        var isokay = that.callAuthRoute()

	if (isokay && test) {
	  console.log("why am i here")
          window.localStorage.setItem("userName", that.nameInput.elt.value)
          that.switchState(test)
	  return 'OK'
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
  async callAuthRoute() {
    var that = this
    await httpPost("http://localhost:8088/auth", { user: userID, username: that.nameInput.elt.value }, function (res) {
	console.log("RES:", res)
	window.localStorage.setItem("userName", that.nameInput.elt.value)
	that.switchState(false)
    }, function (err) {
      // deal with this better in the future
      alert("Username taken")
    })
  }

  /*
  * callScoresRoute - Gets high scores
  */
  callScoresRoute() {
    httpPost("http://localhost:8088/hiscores", function (res) {
      console.log(res)
    })
  }

  async checkKeyPress(keyCode) {
    if (keyCode === 13 && this.nameInput.elt === document.activeElement) {
     var res = await this.playGame()()
     console.log("reesult",res);
     if (res === 'OK') {
	console.log("asdf")
	window.localStorage.setItem("userName", that.nameInput.elt.value)
        that.switchState(test)
	}
    }
  }

  /**
   * draw - This function will be called when we are in gamestate 0
   */
  draw() {
    /* Setting background to white */
    background(255);
    /* Make the title move */
    this.animateTitle();
    /* Checking what startscreen state we are in */
    if (this.startScreenState == 1) {
      push();
      /* Drawing my background */
      pop();
      Gamebackground.draw();
      this.animateBoxes();
      this.animateMapSelection();
      this.animateDiffculity();
      this.animatePlayButton();
    }
    this.drawTitle(this.titleX, this.titleY, this.titleSize);
    mstartScreen.checkPlayButton()
  }

  checkPlayButton() {
    /* push all my settings */
    push();
    /* translate my postion to the center of the screen */
    translate(0,0);
    let x1 = windowWidth / 2;
    let y1 = windowHeight / 1.07;
    let x2 = windowHeight / 8;
    let y2 = windowHeight / 15;

    // fill(255,0,0,100);
    // rect(x1,y1,x2,y2)
    if((mouseX > x1) && (mouseX < x2)){
      console.log("YES");
    }
    pop();
    if (((mouseX > x1) && (mouseX < x2)) && ((mouseY > y1) && (mouseY < y2))) {
      console.log("YEP");
      return 30;
    }
    console.log("NOPE");
    return 255;
  }

  animatePlayButton() {
    /* push all my settings */
    push();
    /* translate my postion to the center of the screen */
    translate(windowWidth / 2, windowHeight / 2);
    /* Setting my strokeweight */
    strokeWeight(4);
    /* Setting my stroke color */
    stroke(0, 0, 0, mstartScreen.checkPlayButton());
    /* Drawing my rectangle */
    rect(0, windowHeight / 2.3, windowWidth / 16, windowHeight / 15, 20);
    fill(0,0,0,mstartScreen.checkPlayButton())
    strokeWeight(0);
    textSize(windowHeight/30);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Write the back onto the box */
    text("Play", 0, windowHeight / 2.25);
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  animateMapSelection() {
    /* push all my settings */
    push();
    /* translate my postion to the center of the screen */
    translate(windowWidth / 2, windowHeight / 2);
    fill(0,0,0,this.boxAlpha)
    strokeWeight(0);
    textSize(windowHeight/20);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Write the back onto the box */
    text("Map Selection", 0, -windowHeight / 10);
    // fill(0,0,0,this.boxAlpha)
    // text(difficulty, 0, -windowHeight / 15 + windowHeight/20);
    this.drawArrows(-windowWidth/9,windowHeight / 10, "right");
    this.drawArrows(windowWidth/9,windowHeight / 10,"left");
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  animateDiffculity() {
    /* push all my settings */
    push();
    /* translate my postion to the center of the screen */
    translate(windowWidth / 2, windowHeight / 2);
    fill(0,0,0,this.boxAlpha)
    strokeWeight(0);
    textSize(windowHeight/20);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Write the back onto the box */
    fill(255,0,0,this.boxAlpha)
    switch(this.difficultyIntForm) {
      case 0: difficulty = "easy"; break;
      case 1: difficulty = "medium"; break;
      case 2: difficulty = "hard"; break;
      case 3: difficulty = "impossible"; break;
    }
    text(difficulty, 0, windowHeight / 3.2);
    this.drawArrows(-windowWidth/10,windowHeight / 3.3,"right");
    this.drawArrows(windowWidth/10,windowHeight / 3.3,"left");
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  drawArrows(x, y, pointing){
    push();
    if(pointing == "right") {
      stroke(0, 0, 0, this.boxAlpha);
      strokeWeight(3);
      line(x, y, x+windowHeight/70, y+windowHeight/70);
      line(x, y, x+windowHeight/70, y-windowHeight/70);
    } else {
      stroke(0, 0, 0, this.boxAlpha);
      strokeWeight(3);
      line(x, y, x-windowHeight/70, y-windowHeight/70);
      line(x, y, x-windowHeight/70, y+windowHeight/70);
    }
    pop();
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
    rect(0, -windowHeight / 5, windowWidth / 4, windowHeight / 15, 20);
    fill(0,0,0,this.boxAlpha)
    strokeWeight(0);
    textSize(windowHeight/20);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Write the back onto the box */
    text("Username", 0, -windowHeight / 5 - windowHeight / 16);
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
    } else {
      /* This will start bring the title up */
      this.titleY -= windowHeight / 150;
      /* This will decrease the size of the title as it moves */
      this.titleSize -= windowHeight/400;
    }
  }

  /**
   * drawTitle - This function display the LogicAI logo at the top of the screen
   */
  drawTitle(x, y, size) {
    // console.log(x + ":" + y + ":" + size);
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

function mouseClicked() {
  push();
  translate(windowWidth/2, windowHeight/2)
  for (var i = 0; i < buttonsOnStartScreen.length; i++) {
    if(dist(buttonsOnStartScreen[i].x, buttonsOnStartScreen[i].y, mouseX-windowWidth/2, mouseY-windowHeight/2) < 30){
      if(i == 0 && mstartScreen.difficultyIntForm > 0){
        mstartScreen.difficultyIntForm--;
      }else if(i == 1 && mstartScreen.difficultyIntForm < 4){
        mstartScreen.difficultyIntForm++;
      }
    }
  }
  if(mstartScreen.checkPlayButton() == 30){
    gameState = 1;
  }
  // gameState = 1;
  pop();
}

module.exports = StartScreen
