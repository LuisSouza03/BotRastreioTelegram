require('dotenv').config();

import TelegramBot from 'node-telegram-bot-api';
import moment from 'moment';
import createTrackingMessage from './models/TrackOrders.models';
import trackOrder from './controllers/TrackOrders.controller';

moment.locale('pt-br');

const token = '5537259503:AAEhz1eBUA2cL4GpounNNf7Dkz_Eb2vRqyo';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageCode = msg.text;

    await trackOrder([messageCode]).then(async (trackingData: any) => {
        if (trackingData[0].mensagem !== 'SRO-019: Objeto inválido') {
            const trackingMessage = await createTrackingMessage(trackingData[0].eventos);
            bot.sendMessage(chatId, trackingMessage);
        } else {
            const msgError = 'Oopps... \n Não conseguimos achar este código de rastreio. \n Confira se ele ja foi postado ou se o código digitado está correto.';
            bot.sendMessage(chatId, msgError);
        }
    });
});
