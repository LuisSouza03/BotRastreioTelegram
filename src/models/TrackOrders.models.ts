import moment from 'moment';

moment.locale('pt-br');

async function createTrackingMessage(trackingEvents: any) {
    let messageRastreamento = trackingEvents.reverse();
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
    return msgFinal;
}

export default createTrackingMessage;
