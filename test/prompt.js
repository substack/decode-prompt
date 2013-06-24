var test = require('tape');
var decode = require('../');

test('basic codes', function (t) {
    t.equal(decode('\\a'), '\007');
    t.equal(decode('\\e'), '\033');
    t.end();
});
