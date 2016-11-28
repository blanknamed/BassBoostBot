var Route = require('./route');
var getStorage = require('../storage').getStorage;

function SettingsRoute () {
    Route.apply(this, arguments);

    this.condition = function() {
        return this.message.text && this.message.text.startsWith('set');
    }
}

SettingsRoute.prototype = Object.create(Route.prototype);

SettingsRoute.prototype.call = async function() {
    var from = this.message.from.id;
    getStorage('settings').set(from, this.message.text.slice(4));
}

module.exports = SettingsRoute;