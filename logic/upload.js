var Route = require('./route');
var getStorage = require('../storage').getStorage;
var manager = require('../manage-audio-files');
var path = require('path');
var bb = require('../bass-boost');

function UploadRoute () {
    Route.apply(this, arguments);

    this.condition = function() {
        return this.message.audio;
    }
}

UploadRoute.prototype = Object.create(Route.prototype);

UploadRoute.prototype.init = async function() {
    this.performer = this.message.audio.performer;
    this.title = this.message.audio.title;

    this.getOperationId();
    this.getSettings();

    this.input_file = await this.getAudio();
    this.wav_file = getAbsolutePath(`./files/${this.id}/pre-bassboost.wav`)
    this.processed_file = getAbsolutePath(`./files/${this.id}/post-bassboost.wav`);
    this.final_file = getAbsolutePath(`./files/${this.id}/final.mp3`);
}

UploadRoute.prototype.call = async function() {
    this.log('Downloading');
    await this.init();

    this.log('Processing');
    await bb(this.input_file, this.processed_file, this.settings);
    await manager.convertParallel(4, this.processed_file, this.final_file, this.id, this.message.audio.duration);
    
    this.log('Sending Result');
    this.sendResult();
}

UploadRoute.prototype.getSettings = function() {
    var from = this.message.from.id;
    this.settings = getStorage('settings').get(from);
}

UploadRoute.prototype.log = function(message) {
    this.bot.sendMessage(this.message.chat.id, message);
}

UploadRoute.prototype.getOperationId = function() {
    var id = getRandomInt(65000);
    if (getStorage('operation').get(id)) return this.getOperationId();

    getStorage('operation').set(id, 1);

    this.id = id;
    return id;
}

UploadRoute.prototype.freeOperationId = function() {
    getStorage('operation').delete(this.operationId);
}

UploadRoute.prototype.getAudio = async function() {
    await manager.mkdir(getAbsolutePath(`./files/${this.id}/`));

    var result = await this.bot.downloadFile(this.message.audio.file_id, `./files/${this.id}/`);

    return getAbsolutePath(result);
}

UploadRoute.prototype.sendResult = function() {
    this.bot.sendAudio(this.message.chat.id, manager.get(this.final_file), {
        title :this.title + ' (Bass Boosted)',
        performer: this.performer 
    });
}

function getAbsolutePath (filename) {
    var rootPath = path.dirname(require.main.filename);

    return path.resolve(rootPath, filename);
}

function getRandomInt(range) {
    return Math.floor(Math.random() * range) + 1;
}

module.exports = UploadRoute;