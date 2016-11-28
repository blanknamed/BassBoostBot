function Route(bot, message) {
    this.bot = bot;
    this.message = message;
}

Route.prototype.on = function() {
    return this.condition(this.message);
}

Route.prototype.call = function() {
    console.log('route not overriden');
}

module.exports = Route;