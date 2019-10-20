class ScreenButton {
    constructor(x, y, length, width, text) {
        this.x = x;
        this.y = y;
        this.height = length;
        this.width = width;
        this.text = text;
        console.log({ x: this.x, y: this.y, length: this.length, width: this.width })
        // this.y = windowHeight / 2.3
        // this.width = windowWidth / 15;
        // this.x = -1 * this.width * 2
        // this.height = windowHeight / 15;
        console.log({ x: this.x, y: this.y, length: this.length, width: this.width })
    }

    getScreenCords() {
        return { x: this.x + windowWidth / 2, y: this.y + windowHeight / 2 }
    }

    checkMouse() {
        var sCords = this.getScreenCords()
        if (mouseX > (sCords.x - this.width / 2) && mouseX < (sCords.x + this.width / 2)
            && mouseY > (sCords.y - this.height / 2) && mouseY < (sCords.y + this.height / 2)) {
            return 30;
        }
        return 0;
    }

    draw() {
        this.checkMouse()
        push();
        translate(windowWidth / 2, windowHeight / 2);
        strokeWeight(4);
        stroke(0, 0, 0, this.checkMouse());
        /* Drawing my rectangle */
        strokeWeight(0);
        textSize(windowHeight / 30);
        /* Setting style to Georgia because it looks good */
        textFont('Georgia');
        /* Write the back onto the box */
        /* popping all my settings so other functions dont have to deal with them */
        stroke(0, 0, 0, 255);
        strokeWeight(1);
        fill(0, 0, 0, this.checkMouse())
        //rect(0, windowHeight / 2.3, windowWidth / 16, windowHeight / 15, 20);
        rect(this.x, this.y, this.width, this.height, 20);
        text(this.text, this.x, this.y + (windowHeight / 30 / 3));
        pop();
    }
}