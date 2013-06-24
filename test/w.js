var test = require('tape');
var decode = require('../');

test('directory codes', function (t) {
    t.equal(
        decode('\\w', { cwd: '/foo/bar/baz/quux' }),
        '/foo/bar/baz/quux'
    );
    t.equal(
        decode('\\W', { cwd: '/foo/bar/baz/quux' }),
        'quux'
    );
    t.equal(
        decode('\\w', {
            cwd: '/home/substack',
            env: { HOME: '/home/substack' }
        }),
        '~'
    );
    t.equal(
        decode('\\W', {
            cwd: '/home/substack',
            env: { HOME: '/home/substack' }
        }),
        '~'
    );
    t.equal(
        decode('\\w', {
            cwd: '/home/substack/beep/boop',
            env: { HOME: '/home/substack' }
        }),
        '~/beep/boop'
    );
    t.equal(
        decode('\\W', {
            cwd: '/home/substack/beep/boop',
            env: { HOME: '/home/substack' }
        }),
        'boop'
    );
    t.end();
});
