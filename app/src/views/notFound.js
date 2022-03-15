import React from 'react'
import Header from './template/header'

export default function NotFound() {
    return (
        <div style={styles.container}>
            <Header />
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