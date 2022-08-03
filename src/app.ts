require('dotenv').config();

import TelegramBot from 'node-telegram-bot-api';
import moment from 'moment';
import { removeAllListeners } from 'process';
import createTrackingMessage from './models/TrackOrders.models';
import trackOrder from './controllers/TrackOrders.controller';
import consultCEP from './controllers/ConsultCEP.controller';
import createConsultMessage from './models/ConsultCEP.models';

moment.locale('pt-br');

const token = '5357767207:AAHYIfU13RTYBb4YP7GLWw_SqvMU0jjy4fM';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    let messageCode = msg.text;
    console.log(messageCode);

    if (messageCode === '/start') {
        bot.sendMessage(msg.chat.id, 'Olá, bem-vindo 😄 \n\n 📦 Caso queira rastrear uma encomenda, digite !rastrear e o código de rastreio \n Por exemplo: "!rastrear LB1234567BR" \n\n 🛣️ Para consultar um CEP digite !cep e o número do CEP \n Por exemplo, "!cep 01234567"');
        return;
    }

    if (messageCode?.toString().toLowerCase().indexOf('!rastrear') === 0) {
        messageCode = messageCode.slice(9).trim();
        await trackOrder([messageCode]).then(async (trackingData: any) => {
            if (trackingData[0].mensagem !== 'SRO-019: Objeto inválido') {
                const trackingMessage = await createTrackingMessage(trackingData[0].eventos);
                bot.sendMessage(chatId, trackingMessage);
            } else {
                const msgError = 'Oopps... \n Não conseguimos achar este código de rastreio. \n Confira se ele ja foi postado ou se o código digitado está correto.';
                bot.sendMessage(chatId, msgError);
            }
        });
    } else if (messageCode?.toString().toLowerCase().indexOf('!cep') === 0) {
        messageCode = messageCode.slice(4);
        await consultCEP(messageCode).then(async (cepData: any) => {
            if (cepData) {
                const messageCep = await createConsultMessage(cepData);
                bot.sendMessage(chatId, messageCep);
            } else {
                const msgError = 'Oopps... \n Não conseguimos achar este CEP. \n Confira se ele está correto';
                bot.sendMessage(chatId, msgError);
            }
        }).catch((err) => {
            const msgError = 'Oopps... \n Não conseguimos achar este CEP. \n Confira se ele está correto';
            bot.sendMessage(chatId, err);
        });
    } else {
        bot.sendMessage(chatId, 'Opps... parece que você digitou errado! \n Tente digitar novamente !cep ou !rastrear');
    }
});
