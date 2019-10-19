class ScoreScreen {
  constructor() {
    // this.callScoresRoute()
    this.scores = []
    this.inputsCreated = false;
    this.shownInputs = false;
    this.eleList = []
  }

  buildScreen() {

  }

  createInputs() {
    this.scoreContainer = createDiv();
    this.eleList.push(this.scoreContainer);
    this.scoreContainer.style('position', 'absolute')
    this.scoreContainer.style('top', '0')
    this.scoreContainer.style('width', '100vw')
    this.scoreContainer.style('height', '100vh')
    this.scoreContainer.style('background-color', 'white')
    this.scoreContainer.style('display', 'flex')
    this.scoreContainer.style('flex-direction', 'column')
    this.scoreContainer.style('align-items', 'center')
    this.createSubElements()
  }

  createSubElements() {
    this.scoreList = createElement('table')
    this.eleList.push(this.scoreList);
    this.scoreList.parent(this.scoreContainer)
    this.scoreHeader = createElement('tr')
    this.eleList.push(this.scoreHeader);
    this.scoreHeader.parent(this.scoreList)
    this.head01 = createElement('td', 'No.').parent(this.scoreList)
    this.head02 = createElement('td', 'User').parent(this.scoreList)
    this.head03 = createElement('td', 'Score').parent(this.scoreList)
    this.head04 = createElement('td', 'Difficulty').parent(this.scoreList)
    this.head05 = createElement('td', 'Board').parent(this.scoreList)
    this.eleList.push(this.head01);
    this.eleList.push(this.head02);
    this.eleList.push(this.head03);
    this.eleList.push(this.head04);
    this.eleList.push(this.head05);
    this.backButton = createButton("BACK")
    this.eleList.push(this.backButton);
    this.backButton.style('height', '30px')
    this.backButton.style('width', '100px')
    this.backButton.parent(this.scoreContainer)
    this.backButton.mousePressed(this.goBack(this))
  }

  removeSubElements() {
    this.eleList.forEach(element => {
      try {
        element.remove()
      } catch (e) {
      }
    });
  }

  hide() {
    this.scoreContainer.hide()
  }

  show() {
    this.scoreContainer.style('display', 'flex')
  }

  goBack(that) {
    return function () {
      that.scoreContainer.hide()
      mgameScreen.init()
      that.inputsCreated = false;
      that.removeSubElements()
      gameState = 0
    }
  }

  callScoresRoute() {
    var that = this;
    try {
      httpPost("http://localhost:8088/hiscores", { user: userID }, function (res) {
        that.scores = JSON.parse(res)
        // that.scores = [{ Index: 1, UserID: 1, Name: "name", Score: 10, Difficulty: 2, Board: 5 }]
        // that.scores = that.parseScores(that)
        console.log("call scores route")
        that.validateScores(that)
        that.parseScores(that)
      })
    } catch (ReferenceError) {
      // testing
      // that.scores = [{ Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 }]
      // userID = 42
      // that.validateScores(that)
      // that.scores = that.parseScores(that)
    }
  }

  validateScores(that) {
    that.scores = that.scores.filter(e => e.Score > 0 && e.Score < 100)
  }

  getScoreHighlight(score) {
    if (score.UserID.toString() === userID.toString()) {
      return 'rgba(255, 159, 0, 0.8)'
    }
    return 'white'
  }

  getLastScore(scores) {
    var lastScore = { GameID: -1 }
    for (var i = 0; i < scores.length; i += 1) {
      if (scores[i].GameID > lastScore.GameID && scores[i].UserID.toString() === userID.toString()) {
        lastScore = scores[i]
      }
    }
    if (lastScore.GameID !== -1) {
      return lastScore
    }
    return "NONE"
  }

  userIsInTopTen(scores) {
    return scores.slice(0, 10).filter(e => e.UserID.toString() === userID.toString()).length > 0
  }

  parseScores(that) {
    for (var i = 0; i < 10 && i < that.scores.length; i += 1) {
      var score = that.scores[i]
      score.Index = i + 1
      var bgColor = that.getScoreHighlight(score)
      that.createTableElement(score, bgColor)
    }
    that.addUserResults()
    that.addLastResult()
  }

  addUserResults(that = this) {
    var yourResults = that.getUserAndNearbyScores(that.scores)
    console.log("user in top 10? ", that.userIsInTopTen(that.scores))
    if (yourResults != 'NONE' && !that.userIsInTopTen(that.scores)) {
      that.createTableHeader("Your Results")
      for (var i = 0; i < yourResults.length; i++) {
        var score = yourResults[i]
        // score.Index = i + 1 this was an error
        var bgColor = that.getScoreHighlight(score)
        that.createTableElement(score, bgColor)
      }
      return 'OK'
    }
    return 'NONE'
  }

  addLastResult(that = this) {
    var lastGame = that.getLastScore(that.scores)
    if (lastGame != 'NONE') {
      that.createTableHeader("Your Last Game")
      var score = lastGame
      score.Index = that.getScoreIndex(score)
      var bgColor = that.getScoreHighlight(score)
      that.createTableElement(score, bgColor)
      return 'OK'
    }
    return 'NONE'
  }

  createTableHeader(title) {
    try {
      var tElement = createElement('tr')
      this.eleList.push(this.tElement);
      //<th class="tg-c3ow" colspan="6">Results</th>
      var tHeader = createElement('th', title)
      this.eleList.push(this.tHeader);
      tHeader.attribute('colspan', '6')
      tHeader.parent(tElement)
      tElement.parent(this.scoreList)
    } catch (e) {
      // testing
    }
  }

  createTableElement(score, bgColor) {
    try {
      var tElement = createElement('tr')
      this.eleList.push(this.tElement);
      this.eleList.push(createElement('td', score.Index.toString()).style('background-color', bgColor).parent(tElement))
      this.eleList.push(createElement('td', score.Name.toString()).style('background-color', bgColor).parent(tElement))
      this.eleList.push(createElement('td', score.Score.toString()).style('background-color', bgColor).parent(tElement))
      this.eleList.push(createElement('td', score.Difficulty.toString()).style('background-color', bgColor).parent(tElement))
      this.eleList.push(createElement('td', score.Board.toString()).style('background-color', bgColor).parent(tElement))
      tElement.parent(this.scoreList)
    } catch (e) {
      // testing
    }
  }

  getScoreIndex(score) {
    for (var i = 0; i < this.scores.length; i += 1) {
      if (score.GameID === this.scores[i].GameID)
        return i + 1
    }
  }

  getUserAndNearbyScores(scores) {
    if (!userID)
      return "NONE"
    var closeScores = []
    for (var i = 10; i < scores.length; i++) {
      scores[i].Index = i + 1
      if (scores[i].UserID.toString() === userID.toString()) {
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
    // this.hide()

    if (!this.inputsCreated) {
      console.log("calling scores route")
      this.createInputs()
      this.scoreContainer.style('display', 'flex')
      this.callScoresRoute()
      this.inputsCreated = true
      // if (!this.inputsCreated) {
      //   this.inputsCreated = true;
      //   this.createInputs()
      //   // this.hide()
      // } else {
      //   this.shownInputs = true
      //   this.scoreContainer.style('display', 'flex')
      //   this.createSubElements()
      // }
    }
  }
}

module.exports = ScoreScreen
