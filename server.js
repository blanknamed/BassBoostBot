var TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
var token = require('./sensetive/bot_token');

var bot = new TelegramBot(token, { polling: true });

var logic = require('./logic');

bot.on('message', async function (msg) {
  try {
    await logic(bot, msg);
  } catch (e) {
      console.log(e);
    bot.sendMessage(msg.chat.id, 'Something Went Wrong((');
  }
});