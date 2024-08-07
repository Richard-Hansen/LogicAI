/**
 * 8.
 * 9.
 * 10.
 * 11.
 * 13.
 * 14.
 * 15.
 * 17.
 */

/* The MapName found in the JSON */
var mapName;
/* The size found in the JSON */
var size;
/* The sizeName found in the JSON */
var sizeName;
/* Array that contains all the vertices for our game */
var vertices = [];

/* Create the gameLogic varible */
var mgameLogic;
/* ? */
var WHoTheFuckMoves;
/* Player Taken edges */
var takenEdges = [];
/* Array of taken sqaures */
var takenSquare = [];

var squares = [];
var squaresAreas = [];

var playerTimer;

var currentMapSelected = 1;

var difficulty = 0;

/**
 * This function is going to check if any squares have been completed by either
 * the AI or the player.
 */
class GameLogic {
  /* Constructor that will send the HTTP request to get the square data */
  constructor() {
    /* Make my HTTP request to squareData with the current map */
    this.fillQuads = [];
    /* Who took the square */
    this.whoTookQuad = [];
    /* Sending HTTP request to the squareData route. Need to populate the squares/squaresArea array */
    httpPost("http://localhost:8088/squareData", { Mapname: "Map" + currentMapSelected }, this.httpPostSquareData)
  }

  httpPostSquareData(res) {
    /* Splits the response by spaces and places it back into res */
    res = res.split(" ");
    /* Iterate through all indices */
    for (let i = 0; i < res.length - 1; i++) {
      squares.push(res[i].split(","));
    }
    squaresAreas = res[res.length - 1].split(",")

    if(squares[0] == ""){
      squares.splice(0,1)
    }
    return [squares, squaresAreas]
  }

  draw() {
    try {
      push();
      translate(windowWidth / 2, windowHeight / 2)
      for (var i = 0; i < this.fillQuads.length; i++) {
        fill(this.whoTookQuad[i][0],this.whoTookQuad[i][1],this.whoTookQuad[i][2], this.whoTookQuad[i][3]);
        quad(vertices[this.fillQuads[i][0]].screenX, vertices[this.fillQuads[i][0]].screenY, vertices[this.fillQuads[i][2]].screenX, vertices[this.fillQuads[i][2]].screenY, vertices[this.fillQuads[i][3]].screenX, vertices[this.fillQuads[i][3]].screenY, vertices[this.fillQuads[i][1]].screenX, vertices[this.fillQuads[i][1]].screenY);
      }
      pop();
    } catch(error) {
      console.log("LOL");
      pop();
    }
  }

  /* this.checkSquareTaken will check if a square has been taken.
     I really do not like the way this is coded and I would love to
     go back and fix this if I have time @TODO */
  checkSquareTaken(vert, msquares) {
    // var whatSquaresHaveThreeEdges = [];
    // let trashValue = [];
    for (var i = 0; i < msquares.length; i++) {
      var tempValue = 0;
      // trashValue = [];
      for (var j = 0; j < msquares[i].length; j++) {
        var shouldBeTwo = 0;
        if(msquares[i][j] != -1) {
          if(vert[msquares[i][j]].clickedConnections.includes(parseInt(msquares[i][0]))){
            // trashValue.push(1)
            shouldBeTwo++
            tempValue++
          }
          if(vert[msquares[i][j]].clickedConnections.includes(parseInt(msquares[i][1]))){
            // trashValue.push(2)
            shouldBeTwo++
            tempValue++
          }
          if(vert[msquares[i][j]].clickedConnections.includes(parseInt(msquares[i][2]))){
            // trashValue.push(3)
            shouldBeTwo++
            tempValue++
          }
          if(vert[msquares[i][j]].clickedConnections.includes(parseInt(msquares[i][3]))){
            // trashValue.push(4)
            shouldBeTwo++
            tempValue++
          }
        }
      }
      // if(tempValue == 3 && WHoTheFuckMoves == 2) {
      //   whatSquaresHaveThreeEdges.push([i, j], trashValue);
      // }
      if (tempValue == 4) {
        this.fillQuads.push([msquares[i][0], msquares[i][1], msquares[i][2], msquares[i][3]]);
        if(WHoTheFuckMoves == 1) {
          this.whoTookQuad.push([197,255,158,100])
        }else {
          this.whoTookQuad.push([216,158,255,100])
        }
        msquares[i][0] = -1;
        msquares[i][1] = -1;
        msquares[i][2] = -1;
        msquares[i][3] = -1;
        var ret = squaresAreas[i]
        // WHoTheFuckMoves = 1;
        return [ret, i]
      }
    }
    // if(whatSquaresHaveThreeEdges.length != 0){
    //   console.log("AI PLAYED");
    //   console.log(whatSquaresHaveThreeEdges[1]);
    //   console.log(takenEdges[takenEdges.length - 1]);
    //   console.log("BUT SHOULD HAVE PLAYED");
    //   var vertexWithConnection = Math.min(takenEdges[takenEdges.length - 1][0], takenEdges[takenEdges.length - 1][1]);
    //   var vertexWithoutConnection = Math.max(takenEdges[takenEdges.length - 1][0], takenEdges[takenEdges.length - 1][1]);
    //   // console.log(vertexWithConnection + ":" + vertexWithoutConnection);
    //   console.log(vertices[vertexWithConnection]);
    //   vertices[vertexWithConnection].connections.push(parseInt(vertices[vertexWithConnection].clickedConnections[vertices[vertexWithConnection].clickedConnections.length - 1]));
    //   vertices[vertexWithConnection].clickedConnections.splice(vertices[vertexWithConnection].clickedConnections.length-1, 1)
    //   // takenEdges.splice(takenEdges.length - 1, 1);
    //   console.log(vertices[vertexWithConnection]);
    //   console.log(msquares[whatSquaresHaveThreeEdges[0][0]]);
    // }
    return [undefined, undefined]
  }
}



/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


/**
 * This class will contain all the relevant game code for LogicalAI.
 * When we have entered gameState 1 the draw function found in this class will
 * start being called at 60 fps. Please place NO logic inside the draw function,
 * keep it as simple as possible.
 */
class gameScreen {
  /* ctor, does not require any params. Asks the backend for all mapdata */
  constructor() {
    /* Make my HTTP request to squareData with the current map */
    this.fillQuads = [];
    /* Who took the square */
    this.whoTookQuad = [];
    this.scoreAI = 0;
    this.scorePlayer = 0;
    mgameLogic = new GameLogic();
    this.mmgameLogic = mgameLogic;
    WHoTheFuckMoves = 1;
    /* Sending HTTP request to the squareData route. Need to populate the squares/squaresArea array */
    // httpPost("http://localhost:8088/squareData", { Mapname: "Map" + currentMapSelected }, this.httpPostSquareData)

    playerTimer = -1;

    setInterval(function(){ playerTimer++ }, 1000);
  }

  init(test){
    /* Set player move */
    if(test) {
      return;
    }
    WHoTheFuckMoves = 1;
    playerTimer = 0;
    squares = [];
    squaresAreas = [];
    takenSquare = [];
    takenEdges = [];
    vertices = [];
    this.scoreAI = 0;
    this.scorePlayer = 0;
    mgameLogic = new GameLogic();
    this.mmgameLogic = mgameLogic;
    httpPost("http://localhost:8088/map", { map: "Map" + currentMapSelected }, this.callMapRoute)
    /* Sending HTTP request to the squareData route. Need to populate the squares/squaresArea array */
    httpPost("http://localhost:8088/squareData", { Mapname: "Map" + currentMapSelected }, this.httpPostSquareData)
  }

  /* draw function that will be called at 60fps once gameState has been moved to 1. */
  draw() {
    /* Setting background to white */
    background(255);
    /* Draws the title onto the screen */
    this.drawTitle();
    /* Show the score of the player and AI */
    this.drawScoreBoard(int(this.scoreAI), int(this.scorePlayer));
    /* Need to draw the quads that are filled */
    this.mmgameLogic.draw();
    /* Draws the vertices onto the screen */
    this.drawVertices();
    /* Draws the backbutton onto the screen */
    this.drawBackbutton();
    /* This will display the current timer */
    this.drawTimer();
  }

  drawTimer() {
    /* push all my settings */
    push();
    /* Setting fontSize to windowHeight/13 */
    textSize(windowHeight / 13);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Translate back to 0,0 (so the top left corner is the (0,0) coordinate) */
    translate(0, 0);
    /* Set my textAlign to the left so they get lined up correctly */
    textAlign(LEFT);
    /* Drawing 'AI' in the left top corner of the screen */
    text('Timer', windowWidth / 1.2, windowHeight / 9);
    fill(255, 0, 0);
    textAlign(CENTER);

    text(playerTimer, windowWidth / 1.14, windowHeight / 5.5);

    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  drawBackbutton() {
    /* push all my settings */
    push();
    /* Translate back to 0,0 (so the top left corner is the (0,0) coordinate) */
    translate(0, 0);
    /* Set my textAlign to the left so they get lined up correctly */
    textAlign(CENTER);
    /* Fill with black for now */
    fill(0,0,0,this.checkBackButton());
    /* Dawing the box */
    rect(windowWidth/10/2, windowHeight/1.1, windowWidth/10,windowHeight/15);
    if(this.checkBackButton() == 30) {
      fill(0);
    }else {
      fill(255);
    }
    /* Setting fontSize to 40 */
    textSize(windowWidth/50);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Write the back onto the box */
    text("back", windowWidth/10/2, windowHeight/1.085);
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  checkBackButton(mousex = -1, mousey = -1, windowwidth = -1, windowheight = -1) {
    if(mousex == -1){
      mousex = mouseX;
      mousey = mouseY;
      windowwidth = windowWidth;
      windowheight = windowHeight;
    }
    let x1 = 0;
    let y1 = windowheight/1.1 - windowheight/20;
    let x2 = windowwidth/10;
    let y2 = windowheight/1.1 + windowheight/30;
    if (((mousex > x1) && (mousex < x2)) && ((mousey > y1) && (mousey < y2))) {
      return 30;
    }
    return 255;
  }

  /**
   * drawScoreBoard - This function will show the score of the AI and of the player
   */
  drawScoreBoard(ai, player) {
    /* push all my settings */
    push();
    /* Setting fontSize to windowHeight/13 */
    textSize(windowHeight / 13);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Translate back to 0,0 (so the top left corner is the (0,0) coordinate) */
    translate(0, 0);
    /* Set my textAlign to the left so they get lined up correctly */
    textAlign(LEFT);
    /* Drawing 'AI' in the left top corner of the screen */
    text('AI: ' + ai + '\nYou: ' + player, windowWidth / 40, windowHeight / 9);
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  /**
   * drawVertices - This function will draw all the vertices give to us by the backend
   *                onto the screen. It will also invoke the functions that draw the lines
   *                connecting said vertices.
   */
  drawVertices() {
    /* push all my settings */
    push();
    /* set fill to black */
    fill(0);
    /* translateing my coordinate plane to the center of the screen, this will help
       when we start drawing our circles. The center of the screen will be (0,0) */
    translate(windowWidth / 2, windowHeight / 2);
    /* Runs through every index of vertices, this function will draw the circles, and
       draw the lines that connect them */
    for (let i = 0; i < vertices.length; i++) {
      /* Draws all the dotted lines */
      this.drawDottedLines(vertices[i]);
      /* Draws all the lines that either the AI or the person have clicked on */
      this.drawClickedLines(vertices[i]);
      /* Set my screenX and screenY for each vertice. Note: This prob does not need
         to be recalculated everytime... could be moved to callMapRoute or in the ctor  */
      vertices[i].screenX = (vertices[i].x * 2) * windowWidth / 20 - 4 * windowWidth / 20;
      vertices[i].screenY = (vertices[i].y * 2) * windowWidth / 20 - 3.5 * windowWidth / 20;
      /* Draw my circle!!!! */
      circle(vertices[i].screenX, vertices[i].screenY, windowWidth / 80);
    }
    /* Check the mouse location for each edge */
    this.checkMouse();
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  /**
   * checkMouse - This function checks the current location of the mouse to see
   *              if it is hovering over a dotted line. If the mouse is over a dotted
   *              line it will make that dotted line a solid line.
   */
  checkMouse(mousex = -1, mousey = -1, windowwidth = -1, windowheight = -1) {
    if(mousex == -1){
      mousex = mouseX;
      mousey = mouseY;
      windowwidth = windowWidth;
      windowheight = windowHeight;
    }
    /* Loop through each vertex in the vertices array */
    for (var i = 0; i < vertices.length; i++) {
      /* Set a vertex varible, makes things look a little bit nicer */
      var vertex = vertices[i];
      /* Loop through all the connections this vertex has */
      for (var j = 0; j < vertex.connections.length; j++) {
        /* Set x0 and y0 to the mouse location. I had to offset this location to make sure
           the translated position and the mouse position are on the same coordinate plane */
        var x0 = mousex - (windowwidth / 2);
        var y0 = mousey - (windowheight / 2);
        /* Setting x1 and y1 to the screen locations of the vertex */
        var x1 = vertex.screenX;
        var y1 = vertex.screenY;
        /* Setting x2 and y2 to the point that the vertex is connecting to */
        var x2 = vertices[vertex.connections[j]].screenX;
        var y2 = vertices[vertex.connections[j]].screenY;

        /* Setting A, B, C, D given by our equation */
        var A = x0 - x1;
        var B = y0 - y1;
        var C = x2 - x1;
        var D = y2 - y1;

        /* Finding the dot product */
        var dot = A * C + B * D;
        /* finding the length */
        var len_sq = C * C + D * D;
        /* init my param varible */
        var param = -1;
        /* Making sure the length is not 0, this should never happen */
        if (len_sq != 0) {
          /* Setting my param variables if the length is NOT 0 */
          param = dot / len_sq;
        }
        /* Delcaring two new temp variables I will use */
        var xx, yy;

        /* If param is less then 0 we have to set xx and yy to x1 and y1 */
        if (param < 0) {
          xx = x1;
          yy = y1;
        }
        /* If param is greater then 0 we have to set xx and yy to x1 and y1 */
        else if (param > 1) {
          xx = x2;
          yy = y2;
        }
        /* If param is 0 we have to set xx and yy to x1+param*C and y1+param*C */
        else {
          xx = x1 + param * C;
          yy = y1 + param * D;
        }

        /* Finding my dx and dy */
        var dx = x0 - xx;
        var dy = y0 - yy;
        /* Sqrt'ing it to find the distance from my line segment */
        if (Math.sqrt(dx * dx + dy * dy) < 10) {
          /* Set the dashedline to a solid line */
          drawingContext.setLineDash([]);
          /* Set strokeWeight to 2 */
          strokeWeight(2);
          /* Draw the line */
          line(vertex.screenX, vertex.screenY, vertices[vertex.connections[j]].screenX, vertices[vertex.connections[j]].screenY)
          /* Return the vertex and the connection that the mouse if over */
          return [i, j];
        }
      }
    }
    /* Return (-1,-1) if the distance between the mouse and the line segment is too large */
    return [-1, -1];
  }

  /**
   * drawClickedLines - This function takes in a vertex of type Vertice and will draw
   *                    all the lines that have already been clicked on by the player or
   *                    the AI. This function loops through clickedConnections of each vertex.
   */
  drawClickedLines(vertex) {
    /* push all my settings */
    push();
    /* Setting my stroke to a solid black with full opacity */
    stroke(0, 0, 0, 255)
    /* Set a strokeWeight of 3 */
    strokeWeight(3);
    /* Setting my dotted line to a solid line */
    drawingContext.setLineDash([]);
    /* Looping through all the clickedConnections for the current vertex */
    for (var i = 0; i < vertex.clickedConnections.length; i++) {
      /* Draws a solid line from vertex, to the connected vertex */
      line(vertex.screenX, vertex.screenY, vertices[vertex.clickedConnections[i]].screenX, vertices[vertex.clickedConnections[i]].screenY)
    }
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  /**
   * drawDottedLines - This function takes in a vertex of type Vertice and will draw
   *                   all the lines that have not been clicked on by the player or
   *                   the AI. This function loops through connections of each vertex.
   */
  drawDottedLines(vertex) {
    /* push all my settings */
    push();
    /* Setting my dashed line to dashed (instead of solid) */
    drawingContext.setLineDash([10, 24]);
    /* Setting strokeWeight to 2 so you can see the dotted lines */
    strokeWeight(2);
    /* Setting the line color to black and the opacity to 100/255 */
    stroke(0, 0, 0, 100);
    /* Loops through all the vertices connected to our vertex by a dotted line */
    for (var i = 0; i < vertex.connections.length; i++) {
      /* Draws the dotted line */
      line(vertex.screenX, vertex.screenY, vertices[vertex.connections[i]].screenX, vertices[vertex.connections[i]].screenY)
    }
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  /**
   * drawTitle - This function draws the title of our game onto the screen.
   */
  drawTitle() {
    /* push all my settings */
    push();
    /* Setting fontSize to 70 */
    textSize(70);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Drawing 'LogicAI' in the middle of the screen at the top */
    text('LogicAI', windowWidth / 2, windowHeight / 9);
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  /**
   * callMapRoute - This functions posts a request to the backend for all the map data.
   *                once the data has been received it will parse the response and place
   *                all the usefull data in the correct structures.
   */
  callMapRoute(res) {
    /* A post method to the map route with a json containing the map name */
      /* Splits the response by spaces and places it back into res */
      res = res.split(" ");

      /* Iterate through all indices, except for the last one, and removed '[' and ']' */
      for (let i = 0; i < res.length - 1; i++) {
        /* Regex to globally replace the two chars talked about above */
        res[i] = res[i].replace(/\[/g, "");
        res[i] = res[i].replace(/\]/g, "");
      }
      /* Setting mapName */
      mapName = res[0]
      /* Setting size */
      size = res[1]
      /* Setting sizeName */
      sizeName = res[2]
      /* splitting the last array element by '-' dashes */
      let temp = res[res.length - 1].split("-");
      /* Iterates through res from [4, (res.length-1)] */

      for (let i = 4; i < res.length - 1; i++) {
        /* So we can place both x and y into the new vertice */
        if (i % 2 == 0) {
          /* Pushes the new coordinates onto our vertices array */
          vertices.push(new vertice(res[i - 1], res[i]));
        }
      }
      /* Loops through all the elements in Temp, this data contains all the connections */
      for (var i = 0; i < temp.length; i++) {
        /* Splits each temp[i] by ',' commas and places them into the vertice data structure */
        vertices[i].connections = temp[i].split(",");
      }
      /* Returning all the values that I set */
      return [mapName, size, sizeName, vertices];
  }
  /* Nothing to see here */
  checkOptMove(){
    let howManyWeGot = [];
    var randomDiff = Math.floor(Math.random() * 11);
    console.log("RAND: " + difficulty);
    if(difficulty == "easy") {
      console.log("YES");
      if(randomDiff < 7) {
        return [-1,-1];
      }
    }else if(difficulty == "medium") {
      if(randomDiff < 5) {
        return [-1,-1];
      }
    }else if(difficulty == "hard") {
      if(randomDiff < 2) {
        return [-1,-1];
      }
    }
    // console.log(squares);
    for (var i = 0; i < squares.length; i++) {
      if(squares[i][0] != -1) {
        // console.log("i:" + i);
        howManyWeGot = [];

        if(vertices[squares[i][0]].clickedConnections.includes(parseInt(squares[i][1]))){
          howManyWeGot.push(1)
        }
        if(vertices[squares[i][0]].clickedConnections.includes(parseInt(squares[i][2]))){
          howManyWeGot.push(2)
        }
        if(vertices[squares[i][1]].clickedConnections.includes(parseInt(squares[i][3]))){
          howManyWeGot.push(3)
        }
        if(vertices[squares[i][2]].clickedConnections.includes(parseInt(squares[i][3]))){
          howManyWeGot.push(4)
        }
        if(howManyWeGot.length == 3){
          if(!howManyWeGot.includes(1)) {
            return[squares[i][0], squares[i][1]]
          }
          if(!howManyWeGot.includes(2)) {
            return[squares[i][0], squares[i][2]]
          }
          if(!howManyWeGot.includes(3)) {
            return[squares[i][1], squares[i][3]]
          }
          if(!howManyWeGot.includes(4)) {
            return[squares[i][2], squares[i][3]]
          }
        }
      }
    }
    return [-1,-1]
  }

  checkAIMove(res, fgameScreen) {
    console.log("RES AI: " + res);
    /* How would this ever happen, good question */
    // if(WHoTheFuckMoves == 1){
    //   return;
    // }
    var move = res.split(" ");
    let optMove = this.checkOptMove();
    if(optMove[0] != -1){
      if(optMove[0] != move[0] || optMove[1] != move[1]) {
        move[0] = optMove[0]
        move[1] = optMove[1]
      }
    }

    var vertexWithConnection = Math.min(move[0], move[1]);
    var vertexWithoutConnection = Math.max(move[0], move[1]);
    for (var i = 0; i < vertices[vertexWithConnection].connections.length; i++) {
      if (vertices[vertexWithConnection].connections[i] == vertexWithoutConnection) {
        vertices[vertexWithConnection].clickedConnections.push(parseInt(vertexWithoutConnection));
        vertices[vertexWithConnection].connections.splice(i, 1);
        takenEdges.push([parseInt(move[0]), parseInt(move[1]), WHoTheFuckMoves])
        do {
          var addAndMore = this.mmgameLogic.checkSquareTaken(vertices, squares)
          if (addAndMore[0] != undefined) {
            takenSquare.push([addAndMore[1], WHoTheFuckMoves])
            if(takenSquare.length == 16){
              this.scorePlayer = int(this.scorePlayer)
              this.scoreAI = 100 - this.scorePlayer;
            }else {
              this.scoreAI += (100 * addAndMore[0]);
            }
            let difficultyInt;
            switch(difficulty) {
              case "easy": difficultyInt = 0; break;
              case "medium": difficultyInt = 1; break;
              case "hard": difficultyInt = 2; break;
              case "impossible": difficultyInt = 3; break;
            }
            if(takenSquare.length == 16){
              httpPost("http://localhost:8088/score", { "time": playerTimer, "scorePlayer": mgameScreen.scorePlayer, "scoreAI": mgameScreen.scoreAI, "difficulty": difficultyInt, "mapname": currentMapSelected, "userID": parseInt(userID)}, function(res) {
                mgameScreen.endGameSender(res, mgameScreen);
                setTimeout(function(){ gameState = 2; }, 3000);
              })
            }
            // this.scoreAI += (100 * addAndMore[0]);
          }
        } while(addAndMore[0] != undefined)
        /* Change player turn */
        WHoTheFuckMoves = 1;
        return true;
      }
    }
    return false;
  }

  checkPlayerMove(res, fgameScreen = mgameScreen) {
    console.log("RES PLAYER: " + res);
    var move = res.split(" ");
    var vertexWithConnection = Math.min(move[0], move[1]);
    var vertexWithoutConnection = Math.max(move[0], move[1]);
    for (var i = 0; i < vertices[vertexWithConnection].connections.length; i++) {
      if (vertices[vertexWithConnection].connections[i] == vertexWithoutConnection) {
        vertices[vertexWithConnection].clickedConnections.push((vertexWithoutConnection));
        vertices[vertexWithConnection].connections.splice(i, 1);
        takenEdges.push([parseInt(move[0]), parseInt(move[1]), WHoTheFuckMoves])
        do {
          var addAndMore = fgameScreen.mmgameLogic.checkSquareTaken(vertices, squares)
          if (addAndMore[0] != undefined) {
            // if(takenSquare)
            this.scorePlayer += (100 * addAndMore[0]);
            takenSquare.push([addAndMore[1], WHoTheFuckMoves])
          }
        } while(addAndMore[0] != undefined)
        /* Change player turn */
        if (WHoTheFuckMoves == 1) { WHoTheFuckMoves = 2 } else { WHoTheFuckMoves = 1 }
        return true;
      }
    }
    return false;
  }

  mouseClickedInClass(){
    mouseClickedd();
  }

  endGameSender(res) {
    console.log("RESSSSS: " + res);
  }
}

/**
 * mouseClicked - This function is called whenever the player clicks their mouse button.
 *                It will check where the mouse is and if it happens to be over a line
 *                it put that line into clickConnections for that vertex
 */
function mouseClickedd() {
  if(mgameScreen.checkBackButton() != 255){
    mgameScreen.init()
    mstartScreen.show()
    WHoTheFuckMoves = 2;
    Gamebackground = new gamebackground();
    gameState = 0;
  }
  if(WHoTheFuckMoves == 2){
    return;
  }
  if(gameState == 0){
    return;
  }

  /* Checks to see if the mouse is over a dotted line */
  var res = mgameScreen.checkMouse();
  /* If we get a -1, we know it was not over a dotted line and nothing should happen, if
     we get a number that is not equal to -1 we know that they clicked on a line */
  if (res[0] != -1) {
    takenEdges.push([res[0], int(vertices[res[0]].connections[res[1]]), WHoTheFuckMoves])
    /* Pushes the dotted line clicked into clickConnections so we can display it as clicked */
    vertices[res[0]].clickedConnections.push(int(vertices[res[0]].connections[res[1]]));
    /* Splices the dotted line from the connections array for the vertex, this will make sure
       we no longer check that line when clicking */
    vertices[res[0]].connections.splice(res[1], 1);
    /* We now need to check if the square has been taken by the person that clicked */
    do {
      addAndMore = mgameScreen.mmgameLogic.checkSquareTaken(vertices, squares)
      if (addAndMore[0] != undefined) {
        takenSquare.push([addAndMore[1], WHoTheFuckMoves])
        if(takenSquare.length == 16){
          mgameScreen.scorePlayer = 100 - mgameScreen.scoreAI;
        }else {
          mgameScreen.scorePlayer += (100 * addAndMore[0]);
        }

        if(takenSquare.length == 16){
          httpPost("http://localhost:8088/score", { "time": playerTimer, "scorePlayer": mgameScreen.scorePlayer, "scoreAI": mgameScreen.scoreAI, "difficulty": difficultyInt, "mapname": currentMapSelected, "userID": parseInt(userID) }, function(res) {
            mgameScreen.endGameSender(res, mgameScreen);
            setTimeout(function(){ gameState = 2; }, 3000);
          })
        }
        // if(takenSquare.length == 16){
        //   console.log("FEAWFGEWGFDSAFEWAFDWEAFSD");
        //   httpPost("http://localhost:8088/score", { "time": playerTimer, "scorePlayer": mgameScreen.scorePlayer, "scoreAI": mgameScreen.scoreAI }, function(res) {
        //     mgameScreen.endGameSender(res, mgameScreen);
        //   })
        // }
      }
    } while(addAndMore[0] != undefined)
    /* Change player turn */
    if (WHoTheFuckMoves == 1) { WHoTheFuckMoves = 2 } else { WHoTheFuckMoves = 1 }
    let difficultyInt;
    switch(difficulty) {
      case "easy": difficultyInt = 0; break;
      case "medium": difficultyInt = 1; break;
      case "hard": difficultyInt = 2; break;
      case "impossible": difficultyInt = 3; break;
    }
    httpPost("http://localhost:8088/move", { "edgesSquare": takenEdges, "ownerSquare": takenSquare, "difficulty": difficultyInt, "mapNumber": currentMapSelected }, function(res) {
      mgameScreen.checkAIMove(res, mgameScreen);
    })
  }
}
module.exports = [gameScreen, vertices, squares];







/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


/* This will contain ALL metadata of a single vertice. */
function vertice(x, y) {
  /* These are the values stored in the json. all values will be between [0,5] in
     both this.x and this.y */
  this.x = x;
  this.y = y;
  /* Screen X cord. i.e 154.5 or some pixel value */
  this.screenX;
  /* Screen Y cord. i.e 254.6 or some pixel value */
  this.screenY;
  /* Contains all the connections that have no been clicked yet. This is stored
     as the index of the connection. i.e if you see '0' in this.connections, it means
     this vertice is connected to the 0 vertex */
  this.connections = [];
  /* Same format as this.connections but instead contains all the connections that HAVE
     been clicked */
  this.clickedConnections = [];
}


/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
