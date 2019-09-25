'use strict';

const expect = require('chai').expect;
const mock = require('./mock-localstorage')

const GameScreen = require('../gameScreen/gameScreen.js')
const GameLogic = require('../gameScreen/gameLogic.js')

var sentRes = "Map1 25 4x4 [[0 0] [0 0.5] [0 2.2] [0 3.7] [0 4] [1.2 0] [1 0.8] [1 1.6] [1 2.7] [2.5 4] [1.6 0] [2 1] [2.5 2.5] [2 3] [2.8 4] [3.4 0] [3 0.4] [3 2.3] [3 3] [3.3 4] [4 0] [4 1] [4 2] [4 3.4] [4 4]] 1,5-2,6-3,7-4,8-9-6,10-7,11-8,12-9,13-14-11,15-12,16-13,17-14,18-19-16,20-17,21-18,22-19,23-24-21-22-23-24"
var res;
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

    it('check player make move', function (done) {
        gameScreen.mouseClicked();
        done()
    })
})
