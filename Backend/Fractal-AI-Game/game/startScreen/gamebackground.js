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
var takenEdges = []
/* Array of taken sqaures */
var takenSquare = [];

var squares = [];
var squaresAreas = [];
/**
 * This function is going to check if any squares have been completed by either
 * the AI or the player.
 */

/**
 * This class will contain all the relevant game code for LogicalAI.
 * When we have entered gameState 1 the draw function found in this class will
 * start being called at 60 fps. Please place NO logic inside the draw function,
 * keep it as simple as possible.
 */
class gamebackground {
  /* ctor, does not require any params. Asks the backend for all mapdata */
  constructor() {
    // this.mgameLogic = new GameLogic()
    mgameLogic = new GameLogic();
    this.mmgameLogic = mgameLogic;
    httpPost("http://localhost:8088/map", { map: "Map" + currentMapSelected }, this.callMapRoute)
    /* Set player move */
    WHoTheFuckMoves = 1;
    this.scoreAI = 0;
    this.scorePlayer = 0;

    httpPost("http://localhost:8088/move", { "edgesSquare": takenEdges, "ownerSquare": takenSquare, "difficulty": 0 }, function(res) {
      Gamebackground.checkAIMove(res, Gamebackground);
    })
  }

  /* draw function that will be called at 60fps once gameState has been moved to 1. */
  draw() {
    /* Setting background to white */
    background(255);
    /* Need to draw the quads that are filled */
    this.mmgameLogic.draw();
    /* Draws the vertices onto the screen */
    this.drawVertices();
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
      vertices[i].screenX = (vertices[i].x * .75) * windowWidth / 20 - 1.5 * windowWidth / 20;
      vertices[i].screenY = (vertices[i].y * .75) * windowWidth / 20 - 3.5 * windowWidth / 20 + windowWidth/7;
      /* Draw my circle!!!! */
      circle(vertices[i].screenX, vertices[i].screenY, windowWidth / 150);
    }
    /* popping all my settings so other functions dont have to deal with them */
    pop();
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

  checkAIMove(res, fgameScreen) {
    // console.log("RES AI: " + res);
    if(gameState == 1) {
      return false;
    }
    var move = res.split(" ");
    var vertexWithConnection = Math.min(move[0], move[1]);
    var vertexWithoutConnection = Math.max(move[0], move[1]);
    for (var i = 0; i < vertices[vertexWithConnection].connections.length; i++) {
      if (vertices[vertexWithConnection].connections[i] == vertexWithoutConnection) {
        vertices[vertexWithConnection].clickedConnections.push(parseInt(vertexWithoutConnection));
        vertices[vertexWithConnection].connections.splice(i, 1);
        takenEdges.push([parseInt(move[0]), parseInt(move[1]), WHoTheFuckMoves])
        do {
          var addAndMore = this.mmgameLogic.checkSquareTaken(vertices, squares)
          // console.log(addAndMore);
          if (addAndMore[0] != undefined) {
            takenSquare.push([addAndMore[1], WHoTheFuckMoves])
            if(takenSquare.length == 16){
              this.scorePlayer = int(this.scorePlayer)
              this.scoreAI = 100 - this.scorePlayer;
            }else {
              this.scoreAI += (100 * addAndMore[0]);
            }
          }
        } while(addAndMore[0] != undefined)
        /* Change player turn */
        if (WHoTheFuckMoves == 1) { WHoTheFuckMoves = 2 } else { WHoTheFuckMoves = 1 }
        httpPost("http://localhost:8088/move", { "edgesSquare": takenEdges, "ownerSquare": takenSquare, "difficulty": 3 }, function(res) {
          Gamebackground.checkAIMove(res, Gamebackground);
        })
        return true;
      }
    }
    return false;
  }
}
