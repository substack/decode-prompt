var path = require('path');
var re = RegExp(
    '\\\\[adehHjlnrstT@AuvVwW!#$\\\\[\\]]|\\\\[0-7]{3}'
        + '|\\${[^}]*}',
    'g'
);

module.exports = function (str, opts) {
    if (!opts) opts = {};
    if (!opts.env) opts.env = {};
    
    return str.replace(re, replacer);
    
    function replacer (s) {
        var m;
        if (m = /^\${/.exec(s)) {
            return opts.env[m[1]] || '';
        }
        var x = s.slice(1);
        if (/^[0-7]{1,3}$/.test(x)) {
            return String.fromCharCode(parseInt(x, 8));
        }
        if (x === 'w') return process.cwd();
        if (x === 'W') return path.basename(process.cwd());
        
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
