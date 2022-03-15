import React from 'react'

export default function Home() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🍔 <span style={{color: 'green'}}>Krypton</span>Eats 🍔</h1>
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
        backgroundColor: 'lightGrey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'green',
        color: 'white',
        textDecoration: 'none',
        padding: '20px 50px',
        marginTop: '20px',
    },
}