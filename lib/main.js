// MAIN.js
// Module main file
// node-exec by Jmlevick <http://jmlevick.me>
// License: GNU Lesser General Public License v3.0 <https://www.gnu.org/licenses/lgpl-3.0.txt>

(function () {
  "use strict";
  // Dependencies
  var exec = require("child_process").exec;
  // Variables
  var returnObj = {};
  // Helpers
  /**
   * Callback for exec
   *
   * @param {any} error
   * @param {any} stdout
   * @param {any} stderr
   */
  function puts(error, stdout, stderr) {
    if (error || stderr) {
      let err = null;
      if (error) {
        err = `${error}`;
      } else if (stderr) {
        err = `${stderr}`;
      }
      returnObj.code = 1;
      returnObj.error = err;
    }
    else if (stdout) {
      returnObj.code = 0;
      returnObj.result = `${stdout}`;
    }
    else {
      returnObj.code = null;
      returnObj.result = "Unknown stdout";
    }
  }

  class Shell {
    /**
     * Creates an instance of Shell.
     *
     */
    constructor() {
      return {
        run: this.run
      };
    }
    /**
     * run
     *
     * @param {any} cmd
     * @returns promise
     */
    run(cmd) {
      let promise = new Promise(function(resolve, reject){
        exec(`${cmd}`, puts);
        let i = setInterval(function () {
          returnObj = JSON.parse(JSON.stringify(returnObj));
          if (returnObj.code !== null && typeof(returnObj.code === "number") && !returnObj.code) {
            setTimeout(function() {
              resolve(returnObj);
              returnObj = {};
              clearInterval(i);
            }, 200);

          } else {
            setTimeout(function() {
              reject(returnObj);
              returnObj = {};
              clearInterval(i);
            }, 200);
          }
        }, 0);
      });
      return promise;
    }

  }
  module.exports = new Shell();
}).call(this);
