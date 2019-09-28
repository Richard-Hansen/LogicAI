class BoardSelector {
    constructor() {
        // Retrieve board from local storage
        board = window.localStorage.getItem("board") || 0
        this.buttons = []
    }

    createInputs() {
        this.boardContainer = createDiv()
        this.boardContainer.style('position', 'absolute')
        this.boardContainer.style('width', '400px')
        this.boardContainer.style('height', '360px')
        this.boardContainer.style('border', '4px solid black')
        this.boardContainer.style('display', 'flex')
        this.boardContainer.style('flex-direction', 'row')
        this.boardContainer.style('justify-content', 'space-between')
        // only need this if you have more than 10 boards
        // this.boardContainer.style('overflow', 'scroll')
        this.boardContainer.style('top', '30%')
        this.boardContainer.style('left', '65%')
        this.boardContainer.style('margin-left', -1 * 400 / 2 + 'px')
        this.boardText = createDiv()
        this.boardText.parent(this.boardContainer)
        var that = this
        var prev = createButton("<")
        prev.parent(that.boardContainer)
        prev.style('width', '50%')
        prev.mousePressed(that.decrBoard(that))
        var next = createButton(">")
        next.parent(that.boardContainer)
        next.style('width', '50%')
        next.mousePressed(that.incrBoard(that))
        // call this to load cached board
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
                    console.log("error board val", e)
                    break
            }
            try {
                var newstr = "Selected Board: " + board.toString()
                that.boardText.html(newstr)
            } catch (err) { /* testing */ }
            window.localStorage.setItem("board", e)
        }
    }

    decrBoard() {
        var that = this
        return function () {
            var newval = parseInt(board) - 1
            if (newval < 0)
                newval = 2
            that.changeBoard(newval)()
            return newval
        }
    }

    incrBoard() {
        var that = this
        return function () {
            var newval = parseInt(board) + 1
            if (newval > 2)
                newval = 0
            that.changeBoard(newval)()
            return newval
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
