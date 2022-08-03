async function createConsultMessage(cepData: any) {
    const cep = cepData;

    const msgFinal = `Segue os dados do CEP ${cep.cep}: \n\n 🏘️ Bairro: ${cep.bairro} \n\n 🏙️ Cidade: ${cep.localidade} - ${cep.uf} \n\n 🛣️ Logradouro: ${cep.logradouro}`;
    return msgFinal;
}

export default createConsultMessage;
