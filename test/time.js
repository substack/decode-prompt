var test = require('tape');
var decode = require('../');
var strftime = require('strftime');

test('time codes', function (t) {
    var t0 = new Date("Fri May 31 2013 04:33:20");
    var t1 = new Date("Tue June 11 2013 18:20:00");
    
    t.equal(decode('\\d'), strftime('%a %b %d'), "now o'clock");
    t.equal(decode('\\d', { now: t0 }), 'Fri May 31');
    t.equal(decode('\\d', { now: t1 }), 'Tue Jun 11');
    t.equal(decode('\\D{%T}', { now: t0 }), '04:33:20');
    t.equal(decode('\\D{%T <-> %Y}', { now: t1 }), '18:20:00 <-> 2013');
    t.equal(decode('\\t', { now: t0 }), '04:33:20');
    t.equal(decode('\\t', { now: t1 }), '18:20:00');
    t.equal(decode('\\T', { now: t0 }), '04:33:20');
    t.equal(decode('\\T', { now: t1 }), '06:20:00');
    t.equal(decode('\\@', { now: t0 }), '04:33:20 AM');
    t.equal(decode('\\@', { now: t1 }), '06:20:00 PM');
    t.equal(decode('\\A', { now: t0 }), '04:33');
    t.equal(decode('\\A', { now: t1 }), '18:20');
    
    t.end();
});
