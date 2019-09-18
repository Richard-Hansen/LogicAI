class difficultySelector {
    constructor() {
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
        this.easyButton = createButton('Easy')
        this.easyButton.parent(this.difficultyContainer)
        this.easyButton.style('width', '100%')
        this.easyButton.style('height', '90px')
        this.mediumButton = createButton('Medium')
        this.mediumButton.parent(this.difficultyContainer)
        this.mediumButton.style('width', '100%')
        this.mediumButton.style('height', '90px')
        this.hardButton = createButton('Hard')
        this.hardButton.parent(this.difficultyContainer)
        this.hardButton.style('width', '100%')
        this.hardButton.style('height', '90px')
        this.extremeButton = createButton('Impossible')
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
        // Retrieve difficulty from local storage
        difficulty = window.localStorage.getItem("difficulty")
        // Calling curried functions requires calling the second function hence ()()
        this.changeDifficulty(difficulty)()
    }

    changeDifficulty = e => () => {
        if (e === undefined)
            return
        difficulty = e
        window.localStorage.setItem("difficulty", e)
        switch (e) {
            case 'easy':
                this.easyButton.style('background-color', 'rgba(255,0,0,0.6)')
                this.mediumButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.hardButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.extremeButton.style('background-color', 'rgba(255,0,0,0.1)')
                break;
            case 'medium': ;
                this.easyButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.mediumButton.style('background-color', 'rgba(255,0,0,0.6)')
                this.hardButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.extremeButton.style('background-color', 'rgba(255,0,0,0.1)')
                break;
            case 'hard':
                this.easyButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.mediumButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.hardButton.style('background-color', 'rgba(255,0,0,0.6)')
                this.extremeButton.style('background-color', 'rgba(255,0,0,0.1)')
                break;
            case 'impossible':
                this.easyButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.mediumButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.hardButton.style('background-color', 'rgba(255,0,0,0.1)')
                this.extremeButton.style('background-color', 'rgba(255,0,0,0.6)')
                break;
            default:
                break;
        }
    }

    hide = () => {
        this.difficultyContainer.hide()
    }

    show = () => {
        this.difficultyContainer.show()
    }
}