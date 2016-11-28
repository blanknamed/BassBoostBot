// var sox = require('sox.js');

var exec = require('child_process').exec;

module.exports = function (audiofile, outputfilename, settings) {
    var resolve = null;

    var promise = new Promise((r) => { resolve = r });

    var defaultSettings = 'bass +15 speed 0.95';
    settings = settings || defaultSettings;

    exec(`sox -G ${audiofile} ${outputfilename} ${settings}`, {maxBuffer: 1024 * 200}, function(err) {
        if (err) {
            return console.log(err);
        }

        resolve();
    })

    return promise;
}