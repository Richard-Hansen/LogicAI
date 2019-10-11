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
    })

    it('should be an object', function (done) {
        expect(scoreScreen).to.be.a('object');
        done()
    })
})