var test = require('tape');
var decode = require('../');

test(function (t) {
    t.equal(decode('<\\a>'), '<\007>');
    t.end();
});
