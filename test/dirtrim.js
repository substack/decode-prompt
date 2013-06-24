var test = require('tape');
var decode = require('../');

test('dirtrim', function (t) {
    t.equal(
        decode('\\w', { cwd: '/foo/bar/baz/quux', dirtrim: 3 }),
        '.../bar/baz/quux'
    );
    t.equal(
        decode('\\w', { cwd: '/foo/bar/baz/quux', dirtrim: 4 }),
        '/foo/bar/baz/quux'
    );
    t.equal(
        decode('\\w', { cwd: '/foo/bar/baz/quux', dirtrim: 2 }),
        '.../baz/quux'
    );
    t.equal(
        decode('\\w', {
            cwd: '/home/substack',
            env: { HOME: '/home/substack' },
            dirtrim: 3
        }),
        '~'
    );
    t.equal(
        decode('\\w', {
            cwd: '/home/substack/beep/boop',
            env: { HOME: '/home/substack' },
            dirtrim: 3
        }),
        '~/beep/boop'
    );
    t.equal(
        decode('\\w', {
            cwd: '/home/substack/beep/boop/robots',
            env: { HOME: '/home/substack' },
            dirtrim: 3
        }),
        '~/beep/boop/robots'
    );
    t.equal(
        decode('\\w', {
            cwd: '/home/substack/beep/boop/robots/r/cool',
            env: { HOME: '/home/substack' },
            dirtrim: 3
        }),
        '~/.../robots/r/cool'
    );
    t.end();
});
