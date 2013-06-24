var test = require('tape');
var decode = require('../');
var strftime = require('strftime');

test('basic codes', function (t) {
    t.equal(decode('\\a'), '\007');
    t.equal(decode('\\e'), '\033');
    t.end();
});

test('time codes', function (t) {
    var t0 = new Date(1370000000000); // fri may 31 2013 04:33:20
    var t1 = new Date(1371000000000); // tue june 11 2013 18:20:00
    
    t.equal(decode('\\d'), strftime('%a %b %d'), "now o'clock");
    t.equal(decode('\\d', { now: t0 }), 'Fri May 31');
    t.equal(decode('\\d', { now: t1 }), 'Tue Jun 11');
    t.equal(decode('\\D{%T}', { now: t0 }), '04:33:20');
    t.equal(decode('\\D{%T <-> %Y}', { now: t1 }), '18:20:00 <-> 2013');
    
    t.end();
});
