import React from 'react'

import Header from './template/header'
import burgerGif from './images/burger.gif'


export default function ConfirmOrder() {
    return (
        <div style={styles.container}>
            <Header />
            <img src={burgerGif} style={styles.gif} alt="Animinated Burger!" />
            <h1>Votre commande a bien été prise en compte.<br></br>
                Elle vous sera livrée dans les plus brefs délais !
            </h1>
            <p style={{fontStyle: 'italic', paddingTop: 50}}>Merci pour votre confiance. N'oubliez pas que même Superman ne peut qu'admirer la force et le goûts de nos gourmets...</p>

            <button style={styles.button} onClick={() => { window.location.href = "/" }}>Retour au menu principal</button>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: 150,
    },
    button: {
        border: 'none',
        backgroundColor: 'green',
        color: 'white',
        textDecoration: 'none',
        padding: '20px 50px',
        marginTop: '20px',
        width: 300,
        textAlign: 'center',
        fontSize: 24,
        cursor: 'pointer'
    },
}