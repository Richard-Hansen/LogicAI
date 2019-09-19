var squares = [];
/**
 * This function is going to check if any squares have been completed by either
 * the AI or the player.
 */
function gameLogic() {
  this.fillQuads = [];
  /* Constructor that will send the HTTP request to get the square data */
  this.constructor = function() {
    /* Make my HTTP request to squareData with the current map */
    httpPost("http://localhost:8080/squareData", {map: "Map1"}, function(res) {
      /* Splits the response by spaces and places it back into res */
      res = res.split(" ");

      /* Iterate through all indices */
      for(let i = 0; i < res.length; i++) {
        squares.push(res[i].split(","));
      }
    });
  }

  this.draw = function(){
    push();
    fill(0,0,0,80);
    translate(windowWidth/2,windowHeight/2)
    for (var i = 0; i < this.fillQuads.length; i++) {
      quad(vertices[this.fillQuads[i][0]].screenX,vertices[this.fillQuads[i][0]].screenY, vertices[this.fillQuads[i][2]].screenX, vertices[this.fillQuads[i][2]].screenY, vertices[this.fillQuads[i][3]].screenX, vertices[this.fillQuads[i][3]].screenY, vertices[this.fillQuads[i][1]].screenX, vertices[this.fillQuads[i][1]].screenY);
    }
    pop();
  }

  /* this.checkSquareTaken will check if a square has been taken.
     I really do not like the way this is coded and I would love to
     go back and fix this if I have time @TODO */
  this.checkSquareTaken = function(vert) {
    for(var i = 0; i < squares.length; i++) {
      var tempValue = 0;
      for (var j = 0; j < squares[i].length - 1; j++) {
        var shouldBeTwo = 0;
        if(vert[squares[i][j]].clickedConnections.includes(squares[i][0])){
          shouldBeTwo++
          tempValue++
        }
        if(vert[squares[i][j]].clickedConnections.includes(squares[i][1])){
          shouldBeTwo++
          tempValue++
        }
        if(vert[squares[i][j]].clickedConnections.includes(squares[i][2])){
          shouldBeTwo++
          tempValue++
        }
        if(vert[squares[i][j]].clickedConnections.includes(squares[i][3])){
          shouldBeTwo++
          tempValue++
        }
        if(shouldBeTwo == 0){
          break;
        }
      }
      if(tempValue == 4){
        this.fillQuads.push([squares[i][0], squares[i][1], squares[i][2], squares[i][3]]);
        squares.splice(i,1);
      }
    }
  }
}
