# node-exec

Execute shell commands from NodeJS

## How to use?

Simple, just install it, require it and use it

- Install it:

`npm install --save node-exec`

- Require it:

```javascript
    var shell = require('node-exec');
```
- Usage:

```javascript
      let cmd = "pwd";
      /**
      * @params {string} cmd (required)
      */
      shell.run(cmd).then(function(res){
        // res: object with keys {code,result} or {code,error}
        console.dir(res);
      });
```
