import config from '../config.js'

export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        fetch(`${config.API_ADDRESS}/products/all`, { 
            method: 'GET',
            headers: { 'Access-Control-Allow-Origin': '*' }
        })
        .then(async response => {
            try {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    reject(error);
                }
                resolve(data.products)
            }
            catch(error) {
                reject(error)
            }
        })
        .catch(error => {
            reject(error)
            console.error('There was an error!', error);
        })
    })
}

