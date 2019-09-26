class BoardSelector {
    constructor() {
        // Retrieve board from local storage
        board = window.localStorage.getItem("board") || 0
        // Calling curried functions requires calling the second function hence ()()
        this.buttons = []
    }

    createInputs() {
        this.boardContainer = createDiv()
        this.boardContainer.style('position', 'absolute')
        this.boardContainer.style('width', '400px')
        this.boardContainer.style('height', '360px')
        this.boardContainer.style('border', '4px solid black')
        this.boardContainer.style('display', 'flex')
        this.boardContainer.style('flex-direction', 'column')
        this.boardContainer.style('justify-content', 'space-between')
        // only need this if you have more than 10 boards
        // this.boardContainer.style('overflow', 'scroll')
        this.boardContainer.style('top', '30%')
        this.boardContainer.style('left', '65%')
        this.boardContainer.style('margin-left', -1 * 400 / 2 + 'px')
        var that = this
        for (var i = 0; i < 3; i += 1) {
            var c = createButton((i + 1).toString())
            c.parent(that.boardContainer)
            c.style('width', '100%')
            c.style('height', '40px')
            c.style('background-color', 'rgba(255,0,0,0.1)')
            c.attribute('name', i)
            c.mousePressed(that.changeBoard(i))
            that.buttons.push(c)

        }
        this.changeBoard(board)()
    }

    getBoardPos() {
        return this.boardContainer.elt.getBoundingClientRect()
    }

    changeBoard(e) {
        var that = this // store this for scope change
        return function () {
            if (e === undefined)
                return
            if (e > 2 || e < 0)
                return "NO"
            board = e
            switch (e) {
                case 0:
                    activeImage = boardOne
                    break
                case 1:
                    activeImage = boardTwo
                    break
                case 2:
                    activeImage = boardThree
                    break
                default:
                    console.log("error")
                    break
            }
            window.localStorage.setItem("board", e)
            try {
                that.buttons.forEach(element => {
                    element.style('background-color', 'rgba(255,0,0,0.1)')
                });
                that.buttons[e].style('background-color', 'rgba(255,0,0,0.6)')
            } catch (err) { console.log(err) }
        }
    }

    hide() {
        this.boardContainer.hide()
    }

    show() {
        this.boardContainer.show()
    }
}

module.exports = BoardSelector;
