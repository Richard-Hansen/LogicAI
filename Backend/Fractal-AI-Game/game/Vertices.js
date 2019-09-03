

class Vertices {
  constructor() {
    this.verticesNum = 0;
    this.randomVert = [];
    this.randomVertSortedX = this.getRandomVertices(32);
    this.randomVertSortedY = this.randomVertSortedX.sort(function (a, b) {
      return a.y < b.y;
    });
    this.circleSize = 10;
    this.spredX = (windowWidth - windowWidth/20) - windowWidth/20;
    this.spredY = (windowHeight - windowHeight/15) - windowHeight/15;
  }

  drawGrid(size) {
    push();
    fill(0,0,255,255);
    for(let i = 0; i < 25; i++){
      noStroke();
      circle((this.randomVertSortedX[i].x) * this.spredX + windowWidth/20, (this.randomVertSortedX[i].y) * this.spredY + windowHeight/15, this.circleSize);
      // if(i % 2 == 1){
      //   push();
      //   stroke(255, 255, 255,100);
      //   drawingContext.setLineDash([20, 50]);
      //   line((this.randomVert[i].x) * this.spredX + windowWidth/20, (this.randomVert[i].y) * this.spredY + windowHeight/15, (this.randomVert[i-1].x) * this.spredX + windowWidth/20, (this.randomVert[i-1].y) * this.spredY + windowHeight/15)
      //   pop();
      // }
    }
    pop();
  }

  getRandomVertices(n) {
    let arr = [];
    // let sum1 = 0;
    // let sum2 = 0;
    // for(let i = 0; i < n; i++){
    //   let rand1 = (Math.random() * 1);
    //   let rand2 = (Math.random() * 1);
    //   arr.push(createVector(rand1, rand2));
    // }
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++){
        arr.push(createVector(.25*i, .25*j));
      }
    }
    console.log(arr);
    return arr;
  }
}
