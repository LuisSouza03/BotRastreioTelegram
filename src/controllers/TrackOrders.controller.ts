import { rastrearEncomendas } from 'correios-brasil';

async function trackOrder(codRastreio: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        rastrearEncomendas(codRastreio).then((trackingData: string[]) => {
            const orderData = trackingData;
            if (orderData) {
                resolve(orderData);
            }
            return orderData;
        }).catch((error) => {
            console.log(error);
        });
    });
}

export default trackOrder;
