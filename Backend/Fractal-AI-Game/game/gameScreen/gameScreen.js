var mapName;
var size;
var sizeName;
var vertices = [];

class gameScreen {
  constructor() {
    this.boundingRectangle = new BoundingRectangle();
    this.callMapRoute();
  }
  draw() {
    background(255);
    this.drawVertices();
    this.drawTitle();
  }

  drawVertices() {
    push();
    let ratio = windowHeight/windowWidth;
    console.log(ratio);
    fill(0)
    strokeWeight(2);
    stroke(0);
    for(let i = 0; i < vertices.length; i++){
      circle(3*windowWidth/9 + (windowWidth/9)*vertices[i].x, windowWidth/20 + (windowWidth/8)*vertices[i].y, 20);
    }

    for(let i = 0; i < 8; i++){
      // line(i*windowWidth/9,0,i*windowWidth/9,windowHeight)
      line(0,i*windowHeight/8,windowWidth,i*windowHeight/8)
    }
    stroke(0);
    line(windowWidth/2,0,windowWidth/2,windowHeight)
    line(0,windowHeight/2,windowWidth,windowHeight/2)
    stroke(0,255,0);
    pop();
  }

  drawTitle(){
    push();
    textSize(70);
    textFont('Georgia');
    text('LogicAI', windowWidth/2, windowHeight/9);
    pop();
  }

  /* Ha ha ha. */
  callMapRoute() {
    httpPost("http://localhost:8080/map", {map: "TestMap"}, function(res) {
      var res = res.split(" ");
      for(let i = 0; i < res.length; i++){
        res[i] = res[i].replace(/\[/g, "");
        res[i] = res[i].replace(/\]/g, "");
      }
      mapName = res[0]
      size = res[1]
      sizeName = res[2]
      for(let i = 4; i < res.length; i++){
        if(i % 2 == 0){
          vertices.push(new vertice(res[i-1], res[i]));
        }
      }
      console.log(mapName);
      console.log(size);
      console.log(sizeName);
      console.log(vertices);
    });
  }
}
