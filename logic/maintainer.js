var Route = require('./route');

function MaintainerRoute () {

    Route.apply(this, arguments);

    this.condition = function() {
        return this.message.text && this.message.text.startsWith('/maintainer');
    }
}

MaintainerRoute.prototype = Object.create(Route.prototype);

MaintainerRoute.prototype.call = async function() {
    return this.bot.sendMessage(this.message.chat.id, 'telegram.me/dvnil');
}

module.exports = MaintainerRoute;