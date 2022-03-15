import React from 'react'
import Header from './template/header'

export default function MyOrders() {
    return (
        <div style={styles.container}>
            <Header />
            <h2>Voir mes commandes</h2>
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