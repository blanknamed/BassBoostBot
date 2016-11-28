var exec = require('child_process').exec;
var fs = require('fs');

var execProm = function(command) {
    return new Promise((r) => {
        exec(command, {maxBuffer: 1024 * 200}, function() {
            r();
        })
    })
}

module.exports.convert = async function(file1, file2, decode) {
    decode = decode && '--decode' || '';

    await execProm(`lame ${decode} ${file1} ${file2}`);
    return;
}

module.exports.get = function(link) {
    return fs.createReadStream(link);
}

module.exports.mkdir = function(path) {
    return new Promise((r) => {
        fs.mkdir(path, function() {
            r();
        })
    });
}

module.exports.convertParallel = async function(jobs, infile, outfile, id, songLength) {
    var pattern = `./files/${id}/parallel`;
    await splitFile(infile, pattern + '.wav', Math.ceil(songLength/jobs));
    await convertToMp3Parallel(pattern, jobs);
    await concatMp3Files(pattern, outfile);
    await fixMp3Errors(outfile);
}

async function splitFile (infile, outfiles, time) {
    await execProm(`sox ${infile} ${outfiles} trim 0 ${time} : newfile : restart`);
}

async function convertToMp3Parallel (file_pattern, jobs) {
    await execProm(`ls ${file_pattern}* | parallel -j${jobs} 'lame -V3 {.}.wav {.}.mp3'`);
}

async function concatMp3Files (file_pattern, output) {
    await execProm(`cat ${file_pattern}*.mp3 > ${output}`);
}

async function fixMp3Errors(file) {
    await execProm(`mp3val ${file} -f -nb`);
}