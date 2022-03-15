import React from 'react'

export default function NotFound() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🍔 <span style={{color: 'green'}}>Krypton</span>Eats 🍔</h1>
            <h2>Error 404</h2>
            <h2>Page non trouvée :(</h2>
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
}