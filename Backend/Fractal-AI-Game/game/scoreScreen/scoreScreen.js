class ScoreScreen {
  constructor() {
    this.callScoresRoute()
    this.scores = []
    this.inputsCreated = false;
  }

  buildScreen() {

  }

  createInputs() {
    this.scoreContainer = createDiv();
    this.scoreContainer.style('position', 'absolute')
    this.scoreContainer.style('top', '0')
    this.scoreContainer.style('width', '100vw')
    this.scoreContainer.style('height', '100vh')
    this.scoreContainer.style('background-color', 'white')
    this.scoreContainer.style('display', 'flex')
    this.scoreContainer.style('justify-content', 'center')
    this.scoreList = createElement('table')
    this.scoreList.parent(this.scoreContainer)
    this.scoreHeader = createElement('tr')
    this.scoreHeader.parent(this.scoreList)
    createElement('td', 'No.').parent(this.scoreList)
    createElement('td', 'User').parent(this.scoreList)
    createElement('td', 'Score').parent(this.scoreList)
    createElement('td', 'Difficulty').parent(this.scoreList)
    createElement('td', 'Board').parent(this.scoreList)
  }

  callScoresRoute() {
    var that = this;
    httpPost("http://localhost:8088/hiscores", { user: userID }, function (res) {
      that.scores = JSON.parse(res)
      console.log(that.scores)
      for (var i = 0; i < 10; i += 1) {
        var tElement = createElement('tr')
        var score = that.scores[i]
        var bgColor = '#e8edff'
        if (score.UserID.toString() === userID.toString()) {
          bgColor = '#e876ff'
        }
        createElement('td', (i + 1).toString()).style('background-color', bgColor).parent(tElement)
        createElement('td', score.Name.toString()).style('background-color', bgColor).parent(tElement)
        createElement('td', score.Score.toString()).style('background-color', bgColor).parent(tElement)
        createElement('td', score.Difficulty.toString()).style('background-color', bgColor).parent(tElement)
        createElement('td', score.Board.toString()).style('background-color', bgColor).parent(tElement)
        tElement.parent(that.scoreList)
      }
      var yourResults = that.getUserAndNearbyScores(that.scores)
      if (yourResults != 'NONE') {
        var tElement = createElement('tr')
        //<th class="tg-c3ow" colspan="6">Results</th>
        var tHeader = createElement('th', "Your Results")
        tHeader.attribute('colspan', '6')
        tHeader.parent(tElement)
        tElement.parent(that.scoreList)
        for (var i = 0; i < yourResults.length; i++) {
          var tElement = createElement('tr')
          var score = yourResults[i]
          var bgColor = '#e8edff'
          if (score.UserID.toString() === userID.toString()) {
            bgColor = '#e876ff'
          }
          createElement('td', score.Index.toString()).style('background-color', bgColor).parent(tElement)
          createElement('td', score.Name.toString()).style('background-color', bgColor).parent(tElement)
          createElement('td', score.Score.toString()).style('background-color', bgColor).parent(tElement)
          createElement('td', score.Difficulty.toString()).style('background-color', bgColor).parent(tElement)
          createElement('td', score.Board.toString()).style('background-color', bgColor).parent(tElement)
          tElement.parent(that.scoreList)
        }
      }
    })
  }

  getUserAndNearbyScores(scores) {
    if (!userID)
      return "NONE"
    var closeScores = []
    for (var i = 10; i < scores.length; i++) {
      scores[i].Index = i + 1
      if (scores[i].UserID == userID) {
        if (i > 10) {
          closeScores.push(scores[i - 1])
        }
        closeScores.push(scores[i])
        if (scores[i + 1]) {
          scores[i + 1].Index = i + 2
          closeScores.push(scores[i + 1])
        }
        return closeScores
      }
    }
    return "NONE"
  }

  draw() {
    // no
    if (!this.inputsCreated) {
      this.inputsCreated = true;
      this.createInputs()
    }
  }
}