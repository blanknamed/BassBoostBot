// var sox = require('sox.js');

var exec = require("child_process").exec;
var sox = require("sox.js");
module.exports = function(audioFile, outputFileName, settings = "bass +15") {
  var resolve = null;

  var promise = new Promise(r => {
    resolve = r;
  });

  var defaultSettings = "bass +15 speed 0.95";
  settings = settings || defaultSettings;

  exec(
    `sox -G ${audioFile} ${outputFileName} ${settings}`,
    { maxBuffer: 1024 * 200 },
    function(err) {
      if (err) {
        return console.log(err);
      }
      resolve();
    }
  );

  return promise;
};
