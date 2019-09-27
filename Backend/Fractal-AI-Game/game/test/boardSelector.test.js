'use strict';

const expect = require('chai').expect;
const mock = require('./mock-localstorage')

const BoardSelector = require('../components/boardSelector')
/* p5js functions and certain DOM functions don't work with mocha
 * resulting in a lot of weird code
 */
describe('BoardSelector tests', function () {
    let boardSelector;

    beforeEach(function () {
        global.board = 5
        global.boardOne = "test1"
        global.boardTwo = "test2"
        global.boardThree = "test3"
        global.activeImage = 0
        boardSelector = new BoardSelector();
    })

    it('should be an object', function (done) {
        expect(boardSelector).to.be.a('object');
        done()
    })

    it('should change the board to 2', function (done) {
        boardSelector.changeBoard(2)()
        expect(board).to.equal(2);
        done();
    })

    it('should change the board to 1', function (done) {
        boardSelector.changeBoard(1)()
        expect(board).to.equal(1);
        done();
    })

    it('should change the board to 0', function (done) {
        boardSelector.changeBoard(0)()
        expect(board).to.equal(0);
        done();
    })

    it('should change the active board image', function (done) {
        boardSelector.changeBoard(1)()
        expect(activeImage).to.equal("test2")
        done()
    })

    it('should not change the board to boards above 2', function (done) {
        var res = boardSelector.changeBoard(3)()
        expect(res).to.equal("NO");
        done();
    })

    it('should not change the board to boards below 0', function (done) {
        var res = boardSelector.changeBoard(-1)()
        expect(res).to.equal("NO");
        done();
    })

    it('should save the board', function (done) {
        let oldBoard = window.localStorage.getItem("board")
        boardSelector.changeBoard(2)()
        let newBoard = window.localStorage.getItem("board")
        expect(oldBoard).to.not.equal(newBoard)
        done();
    })
})