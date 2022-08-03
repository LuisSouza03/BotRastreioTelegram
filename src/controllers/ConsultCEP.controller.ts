import { consultarCep } from 'correios-brasil';

async function consultCEP(cep:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        consultarCep(cep).then((cepData: any) => {
            if (cepData) {
                resolve(cepData);
            }
            return cepData;
        });
    });
}

export default consultCEP;
