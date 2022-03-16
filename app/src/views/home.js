import React from 'react'

import Header from './template/header'
import burgerGif from './images/burger.gif'


export default function Home() {
    return (
        <div style={styles.container}>
            <Header />
            <img src={burgerGif} style={styles.gif} alt="Animinated Burger!" />
            <a href="/newOrder" style={styles.button}>Commander</a>
            <a href="/myOrders" style={styles.button}>Voir mes commandes</a>
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
        width: 300,
    },
    button: {
        backgroundColor: 'green',
        color: 'white',
        textDecoration: 'none',
        padding: '20px 50px',
        marginTop: '20px',
        width: 300,
        textAlign: 'center',
    },
}