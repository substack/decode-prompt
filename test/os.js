var test = require('tape');
var decode = require('../');

test('os codes', function (t) {
    t.equal(decode('\\h', { hostname: 'beep.boop' }), 'beep');
    t.equal(decode('\\H', { hostname: 'beep.boop' }), 'beep.boop');
    t.equal(decode('\\j', { jobs: 555 }), '555');
    t.equal(decode('\\j'), '0');
    t.equal(decode('\\l', { tty: '/dev/pts/5' }), '5');
    t.equal(decode('\\l'), '-1');
    t.equal(decode('\\s', { shell: '/bin/bash' }), 'bash');
    t.equal(decode('\\u', { user: 'xyz' }), 'xyz');
    t.equal(decode('\\u', { env: { USER: 'xxx' } }), 'xxx');
    t.equal(decode('\\v', { version: '1.2.3' }), '1.2');
    t.equal(decode('\\V', { version: '1.2.3' }), '1.2.3');
    t.equal(decode('\\!'), '0');
    t.equal(decode('\\!', { history: 345 }), '345');
    t.equal(decode('\\#'), '0');
    t.equal(decode('\\#', { command: 678 }), '678');
    t.equal(decode('\\123'), '\123');
    t.equal(decode('\\\\'), '\\');
    t.equal(decode('\\[\1\2\3\\]'), '\1\2\3');
    t.end();
});
