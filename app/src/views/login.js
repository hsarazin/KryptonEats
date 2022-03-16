import React from 'react'

import Header from './template/header'
import { submitLoginFormApi } from '../tools/fetchApi'

export default function Login() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [isSumbitVisible, setIsSubmitVisible] = React.useState(true)

    const submitLoginForm = () => {
        if (!email || !password) {
            setError("Veuillez taper une adresse mail et un mot de passe !")
            return
        }
        setIsSubmitVisible(false)
        submitLoginFormApi(email, password)
        .then(result => {
            const token = result
            localStorage.setItem('token', token)
            window.location.href = "/"
        })
        .catch(error => {
            setError(error.toString())
        })
        setIsSubmitVisible(true)
    }

  return (
    <div style={styles.container}>
        <Header/>
        <h2 style={{color: 'red'}}>{error}</h2>
        <form style={styles.form}>
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
        </form>
        <button style={{...styles.submit, visibility: (isSumbitVisible ? 'visible':'hidden')}} onClick={submitLoginForm}>Se connecter</button>
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

    },
    submit: {
        backgroundColor: 'green',
        color: 'white',
        padding: 10,
        marginTop: 10,
        width: '25%',
    }
}
