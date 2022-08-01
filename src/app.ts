/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
require('dotenv').config();
import TelegramBot from 'node-telegram-bot-api';

const token = '5537259503:AAEnf1255UuALfg2YxLWg3rZY_1quSjiJ7E';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Hello, Welcome!!!!');
});
