class boardSelector {
    constructor() {
        this.boardContainer = createDiv()
        this.boardContainer.style('position', 'absolute')
        this.boardContainer.style('width', '400px')
        this.boardContainer.style('height', '360px')
        this.boardContainer.style('border', '4px solid black')
        this.boardContainer.style('display', 'flex')
        this.boardContainer.style('flex-direction', 'column')
        this.boardContainer.style('justify-content', 'space-between')
        this.boardContainer.style('overflow', 'scroll')
        this.boardContainer.style('top', '30%')
        this.boardContainer.style('left', '60%')
        this.boardContainer.style('margin-left', -1 * 400 / 2 + 'px')
        this.buttons = []
        for (var i = 0; i < 20; i += 1) {
            var c = createButton((i + 1).toString())
            c.parent(this.boardContainer)
            c.style('width', '100%')
            c.style('height', '40px')
            c.style('background-color', 'rgba(255,0,0,0.1)')
            c.mousePressed(this.changeBoard(i))
            this.buttons.push(c)
        }
    }

    changeBoard = e => () => {
        board = e
        this.buttons.forEach(element => {
            element.style('background-color', 'rgba(255,0,0,0.1)')
        });
        this.buttons[e].style('background-color', 'rgba(255,0,0,0.6)')
    }

    hide = () => {
        this.boardContainer.hide()
    }

    show = () => {
        this.boardContainer.show()
    }
}