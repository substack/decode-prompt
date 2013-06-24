var test = require('tape');
var decode = require('../');

test('basic codes', function (t) {
    t.equal(decode('\\a\\e\\n\\r'), '\007\033\n\r');
    t.end();
});
