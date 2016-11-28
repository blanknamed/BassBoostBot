function Router(bot, message, routes) {
    this.bot = bot;
    this.message = message;
    this.routes = routes.map(function(childRoute) {
        return new childRoute(bot, message);
    });
}

Array.prototype.findAsync = Array.prototype.findAsync || async function (fn) {
    
    for (var i = 0; i < this.length; i++) {
        var result = await fn(this[i]);

        if (result) return this[i]; 
    }

    return null;
}

Router.prototype.start = async function() {
    await this.routes.findAsync(async function(child) {
        if(child.on()) {
            await child.call();
            return true;
        }
        return false;
    }) || this.defaultRoute();
}

Router.prototype.defaultRoute = function() {
    this.bot.sendMessage(this.message.chat.id, 'Please send audio file');
}

module.exports = Router;