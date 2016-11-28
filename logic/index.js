
var MaintainerRoute = require('./maintainer');
var SettingsRoute = require('./settings');
var UploadRoute = require('./upload');
var Router = require('./router');

module.exports = async function(bot, message) {
    
    var router = new Router(bot, message, [
        MaintainerRoute,
        SettingsRoute,
        UploadRoute
    ]);

    await router.start();
    
}