'use strict';

const expect = require('chai').expect;
const mock = require('./mock-localstorage')

const DifficultySelector = require('../components/difficultySelector')
/* p5js functions and certain DOM functions don't work with mocha
 * resulting in a lot of weird code
 */
describe('DifficultySelector tests', function () {
    let difficultySelector;

    beforeEach(function () {
        global.difficulty = 'hard'
        difficultySelector = new DifficultySelector();
    })

    it('should be an object', function (done) {
        expect(difficultySelector).to.be.a('object');
        done()
    })

    it('should change the board', function (done) {
        difficultySelector.changeDifficulty('easy')()
        difficultySelector.changeDifficulty('medium')()
        expect(difficulty).to.equal('medium');
        done();
    })

    it('should save the difficulty', function (done) {
        difficultySelector.changeDifficulty('medium')()
        let oldDifficulty = window.localStorage.getItem("difficulty")
        difficultySelector.changeDifficulty('easy')()
        let newDifficulty = window.localStorage.getItem("difficulty")
        expect(oldDifficulty).to.not.equal(newDifficulty)
        done();
    })
})