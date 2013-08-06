var path = require('path');
var os = require('os');
var strftime = require('strftime');
var re = RegExp(
    '\\\\[adehHjlnrstT@AuvVwW!#$\\\\[\\]]|\\\\[0-7]{3}'
        + '|(\\$|\\\\D){[^}]*}',
    'g'
);

module.exports = function (str, opts) {
    if (!opts) opts = {};
    if (!opts.env) opts.env = {};
    
    return str.replace(re, replacer);
    
    function replacer (s) {
        var m;
        
        var x = s.charAt(1);
        if (x === 'a') return '\x07';
        if (x === 'e') return '\x1b';
        if (x === 'd') return strftime('%a %b %d', opts.now);
        if (x === 'D') {
            m = /^\\D{([^}]*)}/.exec(s);
            return strftime(m[1], opts.now);
        }
        if (x === 'h') return (opts.hostname || os.hostname()).split('.')[0];
        if (x === 'H') return (opts.hostname || os.hostname());
        if (x === 'j') return opts.jobs || 0; // number of jobs
        if (x === 'l') return path.basename(opts.tty || '-1'); // basename `tty`
        if (x === 'n') return '\n';
        if (x === 'r') return '\r';
        if (x === 's') return path.basename(opts.shell || opts.env.SHELL);
        if (x === 't') return strftime('%T', opts.now);
        if (x === 'T') return strftime('%I:%M:%S', opts.now);
        if (x === '@') return strftime('%r', opts.now);
        if (x === 'A') return strftime('%H:%M', opts.now);
        if (x === 'u') return opts.user || opts.env.USER;
        if (x === 'v') {
            return (opts.version || '0.0.0').replace(/^(\d+\.\d+).*/, '$1');
        }
        if (x === 'V') return opts.version || '0.0.0';
        if (x === 'w') {
            var dir = opts.cwd || opts.env.PWD || process.cwd();
            var home = opts.env.HOME + '/';
            if (dir + '/' === home) return '~';
            if (dir.slice(0, home.length) === home) {
                dir = '~/' + dir.slice(home.length);
            }
            var dirtrim = parseInt(opts.dirtrim || opts.env.PROMPT_DIRTRIM, 10);
            if (!(dirtrim > 0)) return dir;
            var parts = dir.split('/');
            if (parts.length <= dirtrim + 1) return dir;
            return (/^~/.test(dir) ? '~/' : '')
                + '.../' + parts.slice(- dirtrim).join('/')
            ;
        }
        if (x === 'W') {
            var dir = opts.cwd || opts.env.PWD || process.cwd();
            if (dir === opts.env.HOME) return '~';
            return path.basename(dir) || '/';
        }
        if (x === '!') return opts.history === undefined ? 0 : opts.history;
        if (x === '#') return opts.command === undefined ? 0 : opts.command;
        if (x === '$') {
            var uid = opts.uid || opts.env.UID || process.getuid();
            return uid === 0 ? '#' : '$';
        }
        
        if (m = /^\${([^}]+)}/.exec(s)) {
            return opts.env[m[1]] || '';
        }
        if (m = /^\$(\w+)/.exec(s)) {
            return opts.env[m[1]] || '';
        }
        
        if (x === '[') return '';
        if (x === ']') return '';
        
        if (/^\\[0-7]{1,3}$/.test(s)) {
            return String.fromCharCode(parseInt(s.slice(1), 8));
        }
        return x;
    }
};
