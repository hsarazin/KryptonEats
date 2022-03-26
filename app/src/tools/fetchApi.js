import config from '../config.js';

export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        fetch(`${config.API_ADDRESS}/products/all`, {
            method: 'GET',
            headers: { 'Access-Control-Allow-Origin': '*' } // plutôt à mettre côté serveur
        })
            .then(async response => {
                try {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        reject(error);
                    }
                    resolve(data.products);
                }
                catch (error) {
                    reject(error);
                }
            })
            .catch(error => {
                reject(error);
                console.error('There was an error!', error);
            });
    });
};

export const getAllToBeDeliveredOrders = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            reject("Erreur lors de la récupération de vos données: l'email ou le token n'a pas pu être recupéré correctement.");
        }
        fetch(`${config.API_ADDRESS}/order/tobedelivered`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'mail': email,
                'token': token,
            }
        })
            .then(async response => {
                try {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        reject(error);
                    }
                    resolve(data.products);
                }
                catch (error) {
                    reject(error);
                }
            })
            .catch(error => {
                reject(error);
                console.error('There was an error!', error);
            });
    });
};

export const submitLoginFormApi = (email, password) => {
    const _body = JSON.stringify({
        'email': email,
        'password': password
    });
    return new Promise((resolve, reject) => {
        fetch(`${config.API_ADDRESS}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: _body
        })
            .then(async response => {
                try {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        reject(error);
                    }
                    resolve(data.token);
                }
                catch (error) {
                    reject(error);
                }
            })
            .catch(error => {
                reject(error);
                console.error('There was an error!', error);
            });
    });
};


export const submitRegisterFormApi = (firstName, lastName, email, password, addressNumber, addressStreet, city, zipCode) => {
    const _body = JSON.stringify({
        'email': email,
        'password': password,
        'nom': lastName,
        'prenom': firstName,
        'adresse_numero': addressNumber,
        'adresse_rue': addressStreet,
        'ville': city,
        'code_postal': zipCode
    });
    return new Promise((resolve, reject) => {
        fetch(`${config.API_ADDRESS}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: _body
        })
            .then(async response => {
                try {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        reject(error);
                    }
                    resolve(data.token);
                }
                catch (error) {
                    reject(error);
                }
            })
            .catch(error => {
                reject(error);
                console.error('There was an error!', error);
            });
    });
};

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            reject("Erreur lors de la récupération de vos données: l'email ou le token n'a pas pu être recupéré correctement.");
        }
        fetch(`${config.API_ADDRESS}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mail': email,
                'token': token
            }
        })
            .then(async response => {
                try {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        reject(error);
                    }
                    resolve(data.user);
                }
                catch (error) {
                    reject(error);
                }
            })
            .catch(error => {
                reject(error);
                console.error('There was an error!', error);
            });
    });
};


export const submitOrder = (cart) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (!token || !email) {
            reject("Erreur lors de la récupération de vos données: l'email ou le token n'a pas pu être recupéré correctement.");
        }
        const _body = JSON.stringify(cart);
        fetch(`${config.API_ADDRESS}/order`, { // il faudrait utiliser le token dans les headers du coup
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: _body
        })
            .then(async response => {
                try {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        reject(error);
                    }
                    resolve(data.user);
                }
                catch (error) {
                    reject(error);
                }
            })
            .catch(error => {
                reject(error);
                console.error('There was an error!', error);
            });
    });
};


