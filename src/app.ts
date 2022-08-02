/* eslint-disable default-case */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
require('dotenv').config();
import TelegramBot from 'node-telegram-bot-api';
import moment from 'moment';
moment.locale('pt-br');
import rastreamento from './controllers/RastrearEncomendas.controller';

const token = '5537259503:AAEhz1eBUA2cL4GpounNNf7Dkz_Eb2vRqyo';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageCode = msg.text;

    await rastreamento([messageCode]).then((data: any) => {
        if (data[0].mensagem !== 'SRO-019: Objeto inválido') {
            let messageRastreamento = data[0].eventos.reverse();
            const msgSend = [];
            let cidadeRastreio;
            let ufRastreio;

            messageRastreamento = messageRastreamento
                .sort((a: any, b: any) => a.dtHrCriado > b.dtHrCriado);

            for (const i in messageRastreamento) {
                let infoDesc;

                const descTrackOrder = messageRastreamento[i].descricao;

                switch (descTrackOrder) {
                case 'Objeto entregue ao destinatário':
                    infoDesc = `✅ - ${descTrackOrder}`;
                    break;
                case 'Objeto postado':
                    infoDesc = `🟡 - ${descTrackOrder}`;
                    break;
                case 'Objeto não entregue - carteiro não atendido':
                    infoDesc = `🟡 - ${descTrackOrder}`;
                    break;
                case 'Objeto recebido pelos Correios do Brasil':
                    infoDesc = `🛬 - ${descTrackOrder}`;
                    break;
                default:
                    infoDesc = `🚐 - ${descTrackOrder}`;
                }

                const dateInfo = moment(messageRastreamento[i].dtHrCriado).format('L');
                const tipoRastreio = messageRastreamento[i].unidade.tipo;

                if (messageRastreamento[i].unidade.endereco.cidade) {
                    cidadeRastreio = messageRastreamento[i].unidade.endereco.cidade;
                    ufRastreio = messageRastreamento[i].unidade.endereco.uf;
                } else {
                    infoDesc = `🛫 - ${descTrackOrder}`;
                    cidadeRastreio = messageRastreamento[i]?.unidade.nome;
                    ufRastreio = '';
                }

                msgSend.push(`${infoDesc} \n\n 🗓️  - ${dateInfo} \n\n 📍- ${tipoRastreio} - ${cidadeRastreio}/${ufRastreio} \n =================================== \n\n`);
            }

            const msgFinal = msgSend.toString().replaceAll(',', '');
            bot.sendMessage(chatId, msgFinal);
        } else {
            bot.sendMessage(chatId, 'Oopps... \n Não conseguimos achar este código de rastreio. \n Confira se ele ja foi postado ou se o código digitado está correto.');
        }
    });
});
