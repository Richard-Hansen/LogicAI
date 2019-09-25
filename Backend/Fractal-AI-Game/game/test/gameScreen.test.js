'use strict';

const expect = require('chai').expect;
const mock = require('./mock-localstorage')

const GameScreen = require('../gameScreen/gameScreen.js')
const GameLogic = require('../gameScreen/gameLogic.js')

var sentRes = "Map1 25 4x4 [[0 0] [0 0.5] [0 2.2] [0 3.7] [0 4] [1.2 0] [1 0.8] [1 1.6] [1 2.7] [2.5 4] [1.6 0] [2 1] [2.5 2.5] [2 3] [2.8 4] [3.4 0] [3 0.4] [3 2.3] [3 3] [3.3 4] [4 0] [4 1] [4 2] [4 3.4] [4 4]] 1,5-2,6-3,7-4,8-9-6,10-7,11-8,12-9,13-14-11,15-12,16-13,17-14,18-19-16,20-17,21-18,22-19,23-24-21-22-23-24"
var sentSquareRes = "0,1,5,6 1,2,6,7 2,3,7,8 3,4,8,9 5,6,10,11 6,7,11,12 7,8,12,13 8,9,13,14 10,11,15,16 11,12,16,17 12,13,17,18 13,14,18,19 15,16,20,21 16,17,21,22 17,18,22,23 18,19,23,24 0.045625,0.078125,0.081250,0.110938,0.038750,0.081250,0.071875,0.035938,0.061250,0.085937,0.026562,0.046875,0.038750,0.090625,0.065625,0.040625"
var res;
var resHttpPostSquareData;
/* p5js functions and certain DOM functions don't work with mocha
 * resulting in a lot of weird code
 */
describe('GameScreen tests', function () {
    let gameScreen;

    beforeEach(function () {
        // alert not defined for chai so pass it trash
        global.alert = function (val) { }
        global.httpPost = function (val) { }
        // what in tarnation
        global.GameLogic = GameLogic.constructor
        gameScreen = new GameScreen();
    })

    it('should be an object', function (done) {
        res = gameScreen.callMapRoute(sentRes);
        expect(gameScreen).to.be.a('object');
        done()
    })

    it('should be mapname Map1', function (done) {
        expect(res[0]).to.equal("Map1");
        done()
    })

    it('should be squarenum 25', function (done) {
        expect(res[1]).to.equal("25");
        done()
    })

    it('should be board size 4x4', function (done) {
        expect(res[2]).to.equal("4x4");
        done()
    })

    it('check 25 Vertices', function (done) {
        expect(res[3].length).to.equal(25);
        done()
    })

    it('check Vertices x axis', function (done) {
        expect(res[3][0].x).to.equal("0");
        expect(res[3][0].y).to.equal("0");

        expect(res[3][1].x).to.equal("0");
        expect(res[3][1].y).to.equal("0.5");

        expect(res[3][2].x).to.equal("0");
        expect(res[3][2].y).to.equal("2.2");

        expect(res[3][3].x).to.equal("0");
        expect(res[3][3].y).to.equal("3.7");

        expect(res[3][4].x).to.equal("0");
        expect(res[3][4].y).to.equal("4");
        done()
    })

    it('check last vertex', function (done) {
        expect(res[3][24].x).to.equal("4");
        expect(res[3][24].y).to.equal("4");
        done()
    })

    it('check area is zero at start', function (done) {
        expect(gameScreen.scoreAI).to.equal(0)
        expect(gameScreen.scorePlayer).to.equal(0)
        done()
    })

    it('Check First Square', function (done) {
        resHttpPostSquareData = gameScreen.mgameLogic.httpPostSquareData(sentSquareRes);
        expect(resHttpPostSquareData[0][0][0]).to.equal("0")
        expect(resHttpPostSquareData[0][0][1]).to.equal("1")
        expect(resHttpPostSquareData[0][0][2]).to.equal("5")
        expect(resHttpPostSquareData[0][0][3]).to.equal("6")
        done()
    })

    it('Check Second Square', function (done) {
        expect(resHttpPostSquareData[0][1][0]).to.equal("1")
        expect(resHttpPostSquareData[0][1][1]).to.equal("2")
        expect(resHttpPostSquareData[0][1][2]).to.equal("6")
        expect(resHttpPostSquareData[0][1][3]).to.equal("7")
        done()
    })

    it('Check Last Square', function (done) {
        expect(resHttpPostSquareData[0][15][0]).to.equal("18")
        expect(resHttpPostSquareData[0][15][1]).to.equal("19")
        expect(resHttpPostSquareData[0][15][2]).to.equal("23")
        expect(resHttpPostSquareData[0][15][3]).to.equal("24")
        done()
    })

    it('Check Area Square One', function (done) {
        expect(resHttpPostSquareData[1][0]).to.equal("0.045625")
        done()
    })

    it('Check other area Square', function (done) {
        expect(resHttpPostSquareData[1][0]).to.equal("0.045625")
        expect(resHttpPostSquareData[1][1]).to.equal("0.078125")
        expect(resHttpPostSquareData[1][2]).to.equal("0.081250")
        expect(resHttpPostSquareData[1][3]).to.equal("0.110938")
        expect(resHttpPostSquareData[1][4]).to.equal("0.038750")
        done()
    })

    it('check player make move', function (done) {
        expect(gameScreen.checkPlayerMove(0,1)).to.equal(true)
        done()
    })

    it('check duplicate move', function (done) {
        expect(gameScreen.checkPlayerMove(0,1)).to.equal(false)
        done()
    })

    it('check player invalid move', function (done) {
        expect(gameScreen.checkPlayerMove(0,2)).to.equal(false)
        done()
    })

    it('check player takes square', function (done) {
        expect(gameScreen.checkPlayerMove(0,5)).to.equal(true)
        expect(gameScreen.checkPlayerMove(5,6)).to.equal(true)
        expect(gameScreen.checkPlayerMove(1,6)).to.equal(true)
        done()
    })
})
