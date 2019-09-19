var squares = [];
/**
 * This function is going to check if any squares have been completed by either
 * the AI or the player.
 */
function gameLogic() {
  this.fillQuads = [];
  /* Constructor that will send the HTTP request to get the square data */
  this.constructor = function() {
    httpPost("http://localhost:8080/squareData", {map: "Map1"}, function(res) {
      /* Splits the response by spaces and places it back into res */
      res = res.split(" ");

      /* Iterate through all indices */
      for(let i = 0; i < res.length; i++){
        squares.push(res[i].split(","));
      }
      console.log(squares);
    });
  }

  this.draw = function(){
    console.log(this.fillQuads.length);
    push();
    fill(0);
    for (var i = 0; i < this.fillQuads.length; i++) {
      console.log(vertices[this.fillQuads[i][0]]);
      // quad(this.fillQuads[i][0].screenX,this.fillQuads[i][0].screenY,100,100,100,100,100,100);
    }
    pop();
  }

  /* this.checkSquareTaken will check if a square has been taken */
  this.checkSquareTaken = function(vert) {
    for(var i = 0; i < squares.length; i++) {
      var tempValue = false;
      // console.log(squares[i]);
      for (var j = 0; j < squares[i].length - 1; j++) {
        var shouldBeTwo = 0;
        // console.log(vert[squares[i][j]].clickedConnections);
        if(vert[squares[i][j]].clickedConnections.includes(squares[i][0])){
          // console.log("0");
          shouldBeTwo++
        }
        if(vert[squares[i][j]].clickedConnections.includes(squares[i][1])){
          // console.log("1");
          shouldBeTwo++
        }
        if(vert[squares[i][j]].clickedConnections.includes(squares[i][2])){
          // console.log("2");
          shouldBeTwo++
        }
        if(vert[squares[i][j]].clickedConnections.includes(squares[i][3])){
          // console.log("3");
          shouldBeTwo++
        }
        // console.log("shouldBeTwo: " + shouldBeTwo);
        if(shouldBeTwo == 0){
          // console.log("Breaking: " + j);
          break;
        } else if(j == 2){
          // console.log("TAKEN");
          this.fillQuads.push([squares[i][0], squares[i][1], squares[i][2], squares[i][3]]);
          tempValue == true
        }
      }
    }
  }
}
