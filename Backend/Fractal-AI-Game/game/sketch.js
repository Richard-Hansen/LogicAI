function setup() {
  // put setup code here
  createCanvas(500,500)
  rectMode(CENTER);
  textAlign(CENTER);
  background(0)
}

function draw() {
  fill(255,100,100)
  rect(250, 250, 155, 155, 20);

  fill(0,0,255);
  textSize(30);
  text('Move route', 250, 260);
}

function mouseClicked() {
  ellipse(mouseX, mouseY, 20, 20);
  callMoveRoute();
}

function callMoveRoute() {
  httpPost("http://localhost:8080/move", {XOne: 0, YOne:2, XTwo:4, YTwo:6}, function(res) {
    console.log(res);
  });

}
