var squares = [];
var squaresAreas = [];
/**
 * This function is going to check if any squares have been completed by either
 * the AI or the player.
 */
class GameLogic {

  /* Constructor that will send the HTTP request to get the square data */
  constructor() {
    /* Make my HTTP request to squareData with the current map */
    this.fillQuads = [];
    httpPost("http://localhost:8080/squareData", { Mapname: "Map1" }, function (res) {
      httpPostSquareData(res);
    });
  }

  httpPostSquareData(res) {
    /* Splits the response by spaces and places it back into res */
    res = res.split(" ");
    /* Iterate through all indices */
    for (let i = 0; i < res.length - 1; i++) {
      squares.push(res[i].split(","));
    }
    squaresAreas = res[res.length - 1].split(",")
  }

  draw() {
    push();
    fill(0, 0, 0, 80);
    translate(windowWidth / 2, windowHeight / 2)
    for (var i = 0; i < this.fillQuads.length; i++) {
      quad(vertices[this.fillQuads[i][0]].screenX, vertices[this.fillQuads[i][0]].screenY, vertices[this.fillQuads[i][2]].screenX, vertices[this.fillQuads[i][2]].screenY, vertices[this.fillQuads[i][3]].screenX, vertices[this.fillQuads[i][3]].screenY, vertices[this.fillQuads[i][1]].screenX, vertices[this.fillQuads[i][1]].screenY);
    }
    pop();
  }

  /* this.checkSquareTaken will check if a square has been taken.
     I really do not like the way this is coded and I would love to
     go back and fix this if I have time @TODO */
  checkSquareTaken(vert) {
    if (this.playerTurn == 1) { this.playerTurn = 2 } else { this.playerTurn = 1 }
    for (var i = 0; i < squares.length; i++) {
      var tempValue = 0;
      for (var j = 0; j < squares[i].length - 1; j++) {
        var shouldBeTwo = 0;
        if(squares[i][j] != -1) {
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
      }
      if (tempValue == 4) {
        this.fillQuads.push([squares[i][0], squares[i][1], squares[i][2], squares[i][3]]);
        squares[i][0] = -1;
        squares[i][1] = -1;
        squares[i][2] = -1;
        squares[i][3] = -1;
        var ret = squaresAreas[i]
        return [ret, i]
      }
    }
    return [undefined, undefined]
  }
}

module.exports = GameLogic;
