import React from 'react'

import './register.css'
import Header from './template/header'
import { register } from '../tools/authentication'
import config from '../config'

export default function Login() {

    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [addressNumber, setAddressNumber] = React.useState("")
    const [addressStreet, setAddressStreet] = React.useState("")
    const [city, setCity] = React.useState("")
    const [zipCode, setZipCode] = React.useState("")

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [error, setError] = React.useState("")

    const passwordErrorColor = (confirmPassword.length > 0 && password.length > 0 && password !== confirmPassword) ? 'rgba(255,0,0,0.2)' : 'white'
    const mandatoryFields = [firstName, lastName, addressNumber, addressStreet, city, zipCode, email, password, confirmPassword]
    let areAllFieldsFilled = true
    mandatoryFields.forEach(field => {
        if (field.length <= 0) 
            areAllFieldsFilled = false
    })

    const submitRegisterForm = async () => {
        if (password !== confirmPassword) {
            setError("Les deux mots de passe ne coïncident pas.")
            return
        }
        const formData = [firstName, lastName, email, password, addressNumber, addressStreet, city, zipCode]
        if ([...formData].join('').match(config.ALLOWED_INPUT_CHARACTERS)) {
            setError("Seuls les caractères suivants sont autorisés: " + config.ALLOWED_INPUT_CHARACTERS)
            return
        }
        try {
            await register(formData)
            window.location.href = "/"
        } 
        catch(error) {
            setError(error)
        }
    }

  return (
    <div style={styles.container} className="formContainer">
        <Header/>
        <h2 style={{color: 'red'}}>{error}</h2>
        <form>
            <div>
                <h2>Qui êtes-vous ?</h2>
                <h3>Prénom</h3>
                <input type="text" value={firstName} onChange={(v) => { setFirstName(v.target.value) }}></input>
                <h3>Nom</h3>
                <input type="text" value={lastName} onChange={(v) => { setLastName(v.target.value) }}></input>
            </div>

            <div>
                <h2>Nouveau compte</h2>
                <h3>Adresse e-mail</h3>
                <input type="text" value={email} onChange={(v) => { setEmail(v.target.value) }}></input>
                <h3>Mot de passe</h3>
                <input style={{backgroundColor: passwordErrorColor}} type="password" value={password} onChange={(v) => { setPassword(v.target.value) }}></input>
                <h3>Confirmer le mot de passe</h3>
                <input style={{backgroundColor: passwordErrorColor}} type="password" value={confirmPassword} onChange={(v) => { setConfirmPassword(v.target.value) }}></input>
            </div>

            <div>
                <h2>Où vous retrouver ?</h2>
                <h3>N°</h3>
                <input type="text" value={addressNumber} onChange={(v) => { setAddressNumber(v.target.value) }}></input>
                <h3>Rue/Voie</h3>
                <input type="text" value={addressStreet} onChange={(v) => { setAddressStreet(v.target.value) }}></input>
                <h3>Ville</h3>
                <input type="text" value={city} onChange={(v) => { setCity(v.target.value) }}></input>
                <h3>Code postal</h3>
                <input type="text" value={zipCode} onChange={(v) => { setZipCode(v.target.value) }}></input>
            </div>
        </form>
        <button disabled={!(areAllFieldsFilled)}
                style={areAllFieldsFilled ? {} : {backgroundColor:'grey', cursor: 'not-allowed'}}
                onClick={submitRegisterForm}>
            {areAllFieldsFilled ? "S'enregistrer" : "Veuillez remplir tous les champs"}
        </button>
    </div>
  )
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}
