# decode-prompt

parse bash 
[$PS1 escape characters](https://www.gnu.org/software/bash/manual/bash.html#Printing-a-Prompt)

[![browser support](https://ci.testling.com/substack/decode-prompt.png)](http://ci.testling.com/substack/decode-prompt)

[![build status](https://secure.travis-ci.org/substack/decode-prompt.png)](http://travis-ci.org/substack/decode-prompt)

# example

``` js
var decode = require('../');
var s = decode(process.argv[2], { env: process.env });
console.log(s);
```

```
$ node example/prompt.js '\w \$ '
~/projects/decode-prompt $
$ 
```

```
substack : decode-prompt $ node example/prompt.js "<$PS1>"
<substack : decode-prompt $ >
substack : decode-prompt $ 
```

# methods

``` js
var decode = require('decode-prompt')
```

## decode(str, opts)

Return the decoded bash `$PS1` string `str`.

* `opts.env` - environment variables to use. `$NAME` and `${NAME}` are decoded and
some options use `opts.env` as a fallback default value.
* `opts.now` - date for all the time functions to use, default: `new Date`
* `opts.hostname` - the `os.hostname()` value to use, otherwise `os.hostname()`
* `opts.jobs` - number of jobs currently managed by the shell, default: 0
* `opts.tty` - the shell's tty name (like the `tty` command gives), default: -1
* `opts.shell` - the current $SHELL, default: `opts.env.SHELL`.
* `opts.user` - username to use, default: `opts.env.USER`.
* `opts.version` - version of the shell (bash), default: `'0.0.0'`
* `opts.cwd` - current working directory,
default: `opts.env.PWD || process.cwd()`
* `opts.dirtrim` - number of directories to trim output at with an ellipsis,
default: `opts.env.DIRTRIM || 0`
* `opts.history` - history number, default: `0`
* `opts.command` - command number, default: `0`
* `opts.uid` - uid, default: `opts.env.UID || process.getuid()`

# install

With [npm](https://npmjs.org) do:

```
npm install decode-prompt
```

# license

MIT
