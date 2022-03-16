import React from 'react'

import Header from './template/header'
import { submitLoginFormApi } from '../tools/fetchApi'

export default function Login(props) {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")

    const mandatoryFields = [email, password]
    let areAllFieldsFilled = true
    mandatoryFields.forEach(field => {
        if (field.length <= 0) 
            areAllFieldsFilled = false
    })

    const submitLoginForm = () => {
        if (!email || !password) {
            setError("Veuillez taper une adresse mail et un mot de passe !")
            return
        }
        submitLoginFormApi(email, password)
        .then(result => {
            const token = result
            localStorage.setItem('token', token)
            window.location.href = "/"
        })
        .catch(error => {
            setError(error.toString())
        })
    }

  return (
    <div style={styles.container}>
        <Header/>
        <h2 style={{color: 'red'}}>{error}</h2>
        <form style={styles.form}>
            <div>
                <h2>Me connecter</h2>
                <h3 style={styles.label}>Adresse e-mail</h3>
                <input type="text"
                    value={email}
                    onChange={(v) => { setEmail(v.target.value) }}>
                </input>
                <h3 style={styles.label}>Mot de passe</h3>
                <input type="password"
                    value={password}
                    onChange={(v) => { setPassword(v.target.value) }}>
                </input>
            </div>
        </form>
        <button style={areAllFieldsFilled ? {} : {backgroundColor: 'grey'}}
                disabled={!areAllFieldsFilled}
                onClick={submitLoginForm}>
            Se connecter
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
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: 0,
        margin: '10px 0px 5px 0px',

    }
}
