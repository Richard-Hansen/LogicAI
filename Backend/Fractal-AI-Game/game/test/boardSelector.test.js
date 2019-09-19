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
        boardSelector = new BoardSelector();
    })

    it('should be an object', function (done) {
        expect(boardSelector).to.be.a('object');
        done()
    })

    it('should change the board', function (done) {
        boardSelector.changeBoard(4)()
        expect(board).to.equal(4);
        done();
    })

    it('should save the board', function (done) {
        let oldBoard = window.localStorage.getItem("board")
        boardSelector.changeBoard(20)()
        let newBoard = window.localStorage.getItem("board")
        expect(oldBoard).to.not.equal(newBoard)
        done();
    })
})