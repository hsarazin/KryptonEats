import { submitRegisterFormApi, submitLoginFormApi, getUserInfo } from "./fetchApi"

export const register = (formData) => {
    return new Promise((resolve, reject) => {
        const [firstName, lastName, email, , addressNumber, addressStreet, city, zipCode] = [...formData]
        submitRegisterFormApi(...formData)
        .then(result => {
            localStorage.setItem('token', result)
            localStorage.setItem('email', email)
            localStorage.setItem('user', JSON.stringify({
                'email': email,
                'nom': lastName,
                'prenom': firstName,
                'adresse_numero': addressNumber,
                'adresse_rue': addressStreet,
                'ville': city,
                'code_postal': zipCode
            }))
            resolve()
        })
        .catch(error => {
            reject(error.toString())
            
        })
    })
}

export const login = (formData) => {
    return new Promise((resolve, reject) =>{
        const email = formData[0]
        submitLoginFormApi(...formData)
        .then(result => {
            // Login, then store token & email for further authentification
            const token = result
            localStorage.setItem('token', token)
            localStorage.setItem('email', email)
            return getUserInfo()
        })
        .then(result => {
            // Retrieve user's information (address, name...)
            const user = JSON.stringify(result)
            localStorage.setItem('user', user)
            resolve()
        })
        .catch(error => {
            reject(error.toString())
        })
    })
}


export const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
}