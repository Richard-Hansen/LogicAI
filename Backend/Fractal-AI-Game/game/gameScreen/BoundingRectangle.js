

class BoundingRectangle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.incX = windowWidth/50;
    this.incY = windowHeight/50;
  }
  drawBoundingRectangle() {
    fill(0,0,0,0)
    strokeWeight(4);
    stroke(255,0,0);
    rect(windowWidth/2, windowHeight/2, this.x, this.y);
    if(this.x < windowWidth-20){
      this.x += this.incX;
    }else {
      this.x = windowWidth;
    }
    if(this.y < windowHeight-20){
      this.y += this.incY;
    }else {
      this.y = windowHeight;
    }
  }
}
