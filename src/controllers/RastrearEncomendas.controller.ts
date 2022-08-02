import { rastrearEncomendas } from 'correios-brasil';

async function rastreamento(codRastreio: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        rastrearEncomendas(codRastreio).then((dadosRastreio: string[]) => {
            const dadosEncomenda = dadosRastreio;
            if (dadosEncomenda) {
                resolve(dadosEncomenda);
            }
            return dadosEncomenda;
        }).catch((error) => {
            console.log(error);
        });
    });
}

export default rastreamento;
