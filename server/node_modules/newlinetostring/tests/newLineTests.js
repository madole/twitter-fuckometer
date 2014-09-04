/**
 * Created by Madole on 24/07/2014.
 */
var nl = require('./../newLine.js');
var assert = require('assert');

describe( "happy paths", function() {
    var str = 'new string';

    it('should add new line to the string', function(){
        assert.notEqual(nl(str).indexOf('\n'),-1);
    });
    it('should add a new line to the end of the string', function(){
        assert.equal(nl(str).indexOf('\n'),str.length);
    });
    it('should add a new line to the start of the string', function() {
        assert.equal(nl(str, true).indexOf('\n'),0);
    });
});