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

export const submitLoginFormApi = (email, password) => {
    const _body = JSON.stringify({
        'email': email,
        'password': password 
    })
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
                resolve(data.token)
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

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        const email = localStorage.getItem('email')
        const token = localStorage.getItem('token')
        if (!token || !email) {
            reject("No token or email address stored. Please try to log or re-log.")
        }
        const _body = JSON.stringify({
            'email': email,
            'token': token, 
        })
        fetch(`${config.API_ADDRESS}/user`, { 
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
                resolve(data.token)
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


