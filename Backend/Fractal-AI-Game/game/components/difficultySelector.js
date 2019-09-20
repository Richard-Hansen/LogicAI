class DifficultySelector {
    constructor() {
        // Retrieve difficulty from local storage
        difficulty = window.localStorage.getItem("difficulty") || 'easy'
    }

    createInputs() {
        this.difficultyContainer = createDiv()
        this.difficultyContainer.style('position', 'absolute')
        this.difficultyContainer.style('width', '400px')
        this.difficultyContainer.style('border', '4px solid black')
        this.difficultyContainer.style('display', 'flex')
        this.difficultyContainer.style('flex-direction', 'column')
        this.difficultyContainer.style('justify-content', 'space-between')
        this.difficultyContainer.style('top', '30%')
        this.difficultyContainer.style('left', '35%')
        this.difficultyContainer.style('margin-left', -1 * 400 / 2 + 'px')
        this.easyButton = createButton('Very Easy')
        this.easyButton.parent(this.difficultyContainer)
        this.easyButton.style('width', '100%')
        this.easyButton.style('height', '90px')
        this.mediumButton = createButton('Easy')
        this.mediumButton.parent(this.difficultyContainer)
        this.mediumButton.style('width', '100%')
        this.mediumButton.style('height', '90px')
        this.hardButton = createButton('Medium')
        this.hardButton.parent(this.difficultyContainer)
        this.hardButton.style('width', '100%')
        this.hardButton.style('height', '90px')
        this.extremeButton = createButton('Hard')
        this.extremeButton.parent(this.difficultyContainer)
        this.extremeButton.style('width', '100%')
        this.extremeButton.style('height', '90px')
        this.easyButton.style('background-color', 'rgba(255,0,0,0.1)')
        this.mediumButton.style('background-color', 'rgba(255,0,0,0.1)')
        this.hardButton.style('background-color', 'rgba(255,0,0,0.1)')
        this.extremeButton.style('background-color', 'rgba(255,0,0,0.1)')
        this.easyButton.mousePressed(this.changeDifficulty('easy'))
        this.mediumButton.mousePressed(this.changeDifficulty('medium'))
        this.hardButton.mousePressed(this.changeDifficulty('hard'))
        this.extremeButton.mousePressed(this.changeDifficulty('impossible'))
        // Calling curried functions requires calling the second function hence ()()
        this.changeDifficulty(difficulty)()
    }

    changeDifficulty(e) {
        var that = this
        return function () {
            if (e === undefined)
                return
            difficulty = e
            window.localStorage.setItem("difficulty", e)
            try {
                switch (e) {
                    case 'easy':
                        that.easyButton.style('background-color', 'rgba(255,0,0,0.6)')
                        that.mediumButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.hardButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.extremeButton.style('background-color', 'rgba(255,0,0,0.1)')
                        break;
                    case 'medium':
                        that.easyButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.mediumButton.style('background-color', 'rgba(255,0,0,0.6)')
                        that.hardButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.extremeButton.style('background-color', 'rgba(255,0,0,0.1)')
                        break;
                    case 'hard':
                        that.easyButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.mediumButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.hardButton.style('background-color', 'rgba(255,0,0,0.6)')
                        that.extremeButton.style('background-color', 'rgba(255,0,0,0.1)')
                        break;
                    case 'impossible':
                        that.easyButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.mediumButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.hardButton.style('background-color', 'rgba(255,0,0,0.1)')
                        that.extremeButton.style('background-color', 'rgba(255,0,0,0.6)')
                        break;
                    default:
                        break;
                }
            } catch (err) { /* probably testing */ }
        }
    }

    hide() {
        this.difficultyContainer.hide()
    }

    show() {
        this.difficultyContainer.show()
    }
}

module.exports = DifficultySelector;
