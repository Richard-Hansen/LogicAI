'use strict';

const expect = require('chai').expect;
const mock = require('./mock-localstorage')

const StartScreen = require('../startScreen/startScreen.js')
/* p5js functions and certain DOM functions don't work with mocha
 * resulting in a lot of weird code
 */
describe('StartScreen tests', function () {
    let startScreen;

    beforeEach(function () {
        // alert not defined for chai so pass it trash
        global.alert = function (val) { }
        global.gameState = 0
        global.this = {}
	global.isokay = true
        startScreen = new StartScreen();
    })

    it('should be an object', function (done) {
        expect(startScreen).to.be.a('object');
        done()
    })

    it('should require a username', function (done) {
        let trash = { nameInput: { elt: { value: '' } } }
        expect(startScreen.playGame(trash, true)()).to.equal('NOUSERNAME')
        done()
    })

    it('should not allow long usernames', function (done) {
        let trash = { nameInput: { elt: { value: 'verylongusernamethatisverylongandstuffyeah' } } }
        expect(startScreen.playGame(trash)()).to.equal('LONGUSERNAME')
        done()
    })

    it('should cache correct usernames', function (done) {
        window.localStorage.setItem("userName", "notbillbert")
        let trash = { nameInput: { elt: { value: 'billbert' } }, callAuthRoute: function () { return true }, switchState: function () { } }
        startScreen.playGame(trash, true)()
        let username = window.localStorage.getItem("userName")
        expect(username).to.equal('billbert')
        done()
    })

    it('should not allow mean characters', function (done) {
        let trash = { nameInput: { elt: { value: 'bad$$name' } } }
        expect(startScreen.playGame(trash)()).to.equal('BADCHARS')
        done()        
    })

    it('should not cache incorrect usernames', function (done) {
        window.localStorage.setItem("userName", "billbert")
        let trash = { nameInput: { elt: { value: 'verylongusernamethatisverylongandstuffyeah' } }, callAuthRoute: function () { return true }, switchState: function () { } }
        let username = window.localStorage.getItem("userName")
        startScreen.playGame(trash, true)()
        expect(username).to.not.equal('verylongusernamethatisverylongandstuffyeah')
        done()
    })

    it('should allow numbered usernames', function (done) {
        let trash = { nameInput: { elt: { value: '123' } }, callAuthRoute: function () { return true }, switchState: function () { } }
        expect(startScreen.playGame(trash, true)()).to.equal('OK')
        done()
    })

    it('should accept valid usernames', function (done) {
        let trash = { nameInput: { elt: { value: 'timmytwoboots' } }, callAuthRoute: function () { return true }, switchState: function () { } }
        expect(startScreen.playGame(trash, true)()).to.equal('OK')
        done()
    })

    it('should accept 30 character usernames', function (done) {
        let trash = { nameInput: { elt: { value: 'abcdefghijklmnopqrstuvwxyz1234' } }, callAuthRoute: function () { return true }, switchState: function () { } }
        expect(startScreen.playGame(trash, true)()).to.equal('OK')
        done()
    })

    it('should start the game upon press', function (done) {
        startScreen.switchState(true)
        expect(gameState).to.equal(1)
        done()
    })
})
