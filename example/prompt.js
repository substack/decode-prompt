var decode = require('../');
var s = decode(process.argv[2], { env: process.env });
console.log(s);
