'use strict';

const expect = require('chai').expect;

const ScoreScreen = require('../scoreScreen/scoreScreen')
/* p5js functions and certain DOM functions don't work with mocha
 * resulting in a lot of weird code
 */
describe('ScoreScreen tests', function () {
    let scoreScreen;

    beforeEach(function () {
        scoreScreen = new ScoreScreen();
        global.httpPost = function () { return true }
        global.userID = 13
    })

    it('should be an object', function (done) {
        expect(scoreScreen).to.be.a('object');
        done()
    })

    it('should not display scores if user has not played any games', function (done) {
        var scores = [{ Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 }]

        var res = scoreScreen.addUserResults({
            scores: scores,
            getUserAndNearbyScores: scoreScreen.getUserAndNearbyScores,
            userIsInTopTen: scoreScreen.userIsInTopTen,
            createTableHeader: scoreScreen.createTableHeader,
            getScoreHighlight: scoreScreen.getScoreHighlight,
            createTableElement: scoreScreen.createTableElement
        })
        var userInTopTen = scoreScreen.userIsInTopTen(scores)
        var userScores = scoreScreen.getUserAndNearbyScores(scores)
        expect(userInTopTen).to.equal(false)
        expect(userScores).to.equal('NONE')
        expect(res).to.equal('NONE')
        done()
    })

    it('should not display user results if user appears in top 10', function (done) {
        var scores = [{ Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 13, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 13, Name: "name", Score: 10, Difficulty: 2, Board: 5 }]

        var res = scoreScreen.addUserResults({
            scores: scores,
            getUserAndNearbyScores: scoreScreen.getUserAndNearbyScores,
            userIsInTopTen: scoreScreen.userIsInTopTen,
            createTableHeader: scoreScreen.createTableHeader,
            getScoreHighlight: scoreScreen.getScoreHighlight,
            createTableElement: scoreScreen.createTableElement
        })
        var userInTopTen = scoreScreen.userIsInTopTen(scores)
        var userScores = scoreScreen.getUserAndNearbyScores(scores)
        expect(userInTopTen).to.equal(true)
        expect(userScores).to.not.equal('NONE')
        expect(res).to.equal('NONE')
        done()
    })

    it('should not display last played game if there was no last played game', function (done) {
        var scores = [{ Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 }]

        var res = scoreScreen.addLastResult({
            scores: scores,
            getUserAndNearbyScores: scoreScreen.getUserAndNearbyScores,
            userIsInTopTen: scoreScreen.userIsInTopTen,
            createTableHeader: scoreScreen.createTableHeader,
            getScoreHighlight: scoreScreen.getScoreHighlight,
            createTableElement: scoreScreen.createTableElement,
            getLastScore: scoreScreen.getLastScore,
        })
        expect(res).to.equal('NONE')
        done()
    })

    it('should not display invalid scores', function (done) {
        var scores = [{ Index: 1, UserID: 42, Name: "name", Score: 100, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { Index: 1, UserID: 42, Name: "name", Score: 0, Difficulty: 2, Board: 5 }]
        var that = { scores: scores }
        scoreScreen.validateScores(that)
        expect(that.scores[0].Score).to.not.equal(100)
        expect(that.scores[that.scores.length - 1].Score).to.not.equal(0)
        done()
    })

    it('should set score indexes correctly', function (done) {
        var scores = [{ UserID: 42, Name: "name", Score: 100, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
        { UserID: 42, Name: "name", Score: 0, Difficulty: 2, Board: 5 }]

        var that = {
            scores: scores,
            getUserAndNearbyScores: scoreScreen.getUserAndNearbyScores,
            userIsInTopTen: scoreScreen.userIsInTopTen,
            createTableHeader: scoreScreen.createTableHeader,
            getScoreHighlight: scoreScreen.getScoreHighlight,
            createTableElement: scoreScreen.createTableElement,
            getLastScore: scoreScreen.getLastScore,
            addUserResults: scoreScreen.addUserResults,
            addLastResult: scoreScreen.addLastResult,
        }
        scoreScreen.parseScores(that)
        for (var i = 0; i < scores.length; i++) {
            expect(scores[i].Index).to.equal(i + 1)
        }
        done()
    })

    it('should highlight users games', function (done) {
        var usersScore = { UserID: 13, Name: "name", Score: 10, Difficulty: 2, Board: 5 }
        var notUsersScore = { UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 }
        var res = scoreScreen.getScoreHighlight(usersScore) // #e876ff or #e8edff
        var nonRes = scoreScreen.getScoreHighlight(notUsersScore)
        expect(res).to.equal('#e876ff')
        expect(nonRes).to.equal('#e8edff')
        done()
    })

    it('should display users last game', function (done) {
        var scores =
            [{GameID: 1,  Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 2, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 3, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 4, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 5, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 6, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 7, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 8, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 9, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 10, Index: 21, UserID: 13, Name: "name", Score: 10, Difficulty: 2, Board: 5 },
            { GameID: 11, Index: 1, UserID: 42, Name: "name", Score: 10, Difficulty: 2, Board: 5 }]

        var res = scoreScreen.addLastResult({
            scores: scores,
            getUserAndNearbyScores: scoreScreen.getUserAndNearbyScores,
            userIsInTopTen: scoreScreen.userIsInTopTen,
            createTableHeader: scoreScreen.createTableHeader,
            getScoreHighlight: scoreScreen.getScoreHighlight,
            createTableElement: scoreScreen.createTableElement,
            getLastScore: scoreScreen.getLastScore,
            getScoreIndex: scoreScreen.getScoreIndex,
        })
        expect(scoreScreen.getLastScore(scores)).to.equal(scores[9])
        expect(res).to.equal('OK')
        done()
    })
})