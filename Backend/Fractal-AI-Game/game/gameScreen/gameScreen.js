/* The MapName found in the JSON */
var mapName;
/* The size found in the JSON */
var size;
/* The sizeName found in the JSON */
var sizeName;
/* Array that contains all the vertices for our game */
var vertices = [];

/**
 * This class will contain all the relevant game code for LogicalAI.
 * When we have entered gameState 1 the draw function found in this class will
 * start being called at 60 fps. Please place NO logic inside the draw function,
 * keep it as simple as possible.
 */
class gameScreen {
  /* ctor, does not require any params. Asks the backend for all mapdata */
  constructor() {
    this.callMapRoute();
  }
  /* draw function that will be called at 60fps once gameState has been moved to 1. */
  draw() {
    /* Setting background to white */
    background(255);
    /* Draws the vertices onto the screen */
    this.drawVertices();
    /* Draws the title onto the screen */
    this.drawTitle();
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
    translate(windowWidth/2, windowHeight/2);
    /* Runs through every index of vertices, this function will draw the circles, and
       draw the lines that connect them */
    for(let i = 0; i < vertices.length; i++){
      /* Draws all the dotted lines */
      this.drawDottedLines(vertices[i]);
      /* Draws all the lines that either the AI or the person have clicked on */
      this.drawClickedLines(vertices[i]);
      /* Set my screenX and screenY for each vertice. Note: This prob does not need
         to be recalculated everytime... could be moved to callMapRoute or in the ctor  */
      vertices[i].screenX = (vertices[i].x*2)*windowWidth/20 - 4*windowWidth/20;
      vertices[i].screenY = (vertices[i].y*2)*windowWidth/20 - 3.5*windowWidth/20;
      /* Draw my circle!!!! */
      circle(vertices[i].screenX, vertices[i].screenY, windowWidth/80);
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
  checkMouse() {
    /* Loop through each vertex in the vertices array */
    for(var i = 0; i < vertices.length; i++) {
      /* Set a vertex varible, makes things look a little bit nicer */
      var vertex = vertices[i];
      /* Loop through all the connections this vertex has */
      for (var j = 0; j < vertex.connections.length; j++) {
        /* Set x0 and y0 to the mouse location. I had to offset this location to make sure
           the translated position and the mouse position are on the same coordinate plane */
        var x0 = mouseX - (windowWidth/2);
        var y0 = mouseY - (windowHeight/2);
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
        if(Math.sqrt(dx * dx + dy * dy) < 10){
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
  drawClickedLines(vertex){
    /* push all my settings */
    push();
    /* Setting my stroke to a solid black with full opacity */
    stroke(0,0,0,255)
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
    stroke(0,0,0,100);
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
  drawTitle(){
    /* push all my settings */
    push();
    /* Setting fontSize to 70 */
    textSize(70);
    /* Setting style to Georgia because it looks good */
    textFont('Georgia');
    /* Drawing 'LogicAI' in the middle of the screen at the top */
    text('LogicAI', windowWidth/2, windowHeight/9);
    /* popping all my settings so other functions dont have to deal with them */
    pop();
  }

  /**
   * callMapRoute - This functions posts a request to the backend for all the map data.
   *                once the data has been received it will parse the response and place
   *                all the usefull data in the correct structures.
   */
  callMapRoute() {
    /* A post method to the map route with a json containing the map name */
    httpPost("http://localhost:8080/map", {map: "Map1"}, function(res) {
      /* Splits the response by spaces and places it back into res */
      res = res.split(" ");
      /* Iterate through all indices, except for the last one, and removed '[' and ']' */
      for(let i = 0; i < res.length-1; i++){
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
      let temp = res[res.length-1].split("-");
      /* Iterates through res from [4, (res.length-1)] */
      for(let i = 4; i < res.length-1; i++){
        /* So we can place both x and y into the new vertice */
        if(i % 2 == 0){
          /* Pushes the new coordinates onto our vertices array */
          vertices.push(new vertice(res[i-1], res[i]));
        }
      }
      /* Loops through all the elements in Temp, this data contains all the connections */
      for (var i = 0; i < temp.length; i++) {
        /* Splits each temp[i] by ',' commas and places them into the vertice data structure */
        vertices[i].connections = temp[i].split(",");
      }
      /* Prints the metadata obtained from this post request */
      console.log(mapName);
      console.log(size);
      console.log(sizeName);
      console.log(vertices);
    });
  }
}

/**
 * mouseClicked - This function is called whenever the player clicks their mouse button.
 *                It will check where the mouse is and if it happens to be over a line
 *                it put that line into clickConnections for that vertex
 */
function mouseClicked() {
  /* Checks to see if the mouse is over a dotted line */
  var res = mgameScreen.checkMouse();
  /* If we get a -1, we know it was not over a dotted line and nothing should happen, if
     we get a number that is not equal to -1 we know that they clicked on a line */
  if(res[0] != -1){
    /* Helpfull print statement */
    console.log(res[0] + ":" + res[1]);
    /* Pushes the dotted line clicked into clickConnections so we can display it as clicked */
    vertices[res[0]].clickedConnections.push(vertices[res[0]].connections[res[1]]);
    /* Splices the dotted line from the connections array for the vertex, this will make sure
       we no longer check that line when clicking */
    vertices[res[0]].connections.splice(res[1], 1);
  }
}
