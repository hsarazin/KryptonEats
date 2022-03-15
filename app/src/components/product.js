import React from 'react'

export default function Product(props) {
    if (props.data === undefined) {
        return (
            <div style={styles.container}>
                <p>Error: no data given as parameter for the Product component.</p>
            </div>
        )
    }
    return (
        <div style={styles.container}>
            <p>{props.data.titre}</p>
            <p>{props.data.description}</p>
            <p>{props.data.prix}</p>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}