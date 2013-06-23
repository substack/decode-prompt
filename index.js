var path = require('path');
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
        if (m = /^\${([^}]+)}/.exec(s)) {
            return opts.env[m[1]] || '';
        }
        else if (m = /^\$(\w+)/.exec(s)) {
            return opts.env[m[1]];
        }
        
        var x = s.slice(1);
        if (/^[0-7]{1,3}$/.test(x)) {
            return String.fromCharCode(parseInt(x, 8));
        }
        if (x === 'w') return process.cwd();
        if (x === 'W') return path.basename(process.cwd());
        if (x === 'd') return strftime('%a %b %d', opts.now);
        if (m = /^D{([^}]*)}/.exec(x)) {
            return strftime(m[1], opts.now);
        }
        
        var rep = {
            a: '\x07',
            e: '\x1b',
            u: opts.user || opts.env.USER,
            '[': '',
            ']': ''
        }[x];
        return rep === undefined ? x : rep;
    }
};
