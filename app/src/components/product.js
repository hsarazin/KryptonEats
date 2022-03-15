import React from 'react'

export default function Product(props) {
    if (props.data === undefined) {
        return (
            <div style={styles.container}>
                <p>Error: no data given as parameter for the Product component.</p>
            </div>
        )
    }

    const displayButton = () => {
        if (!props.isCart) {
            return (
                <button onClick={() => { props.addToCart(props.data) }} style={styles.button}>Ajouter au panier {props.data.prix.toFixed(2) }€</button>
                )
            }
    }

    const displayHeader = () => {
        if (!props.isCart) {
            return (
                <p style={{...styles.field, fontSize: 20, fontWeight: 'bold'}}>{props.data.titre}</p>
            )
        }
        else {
            return (
                <>
                    <p style={{...styles.field, fontSize: 20, fontWeight: 'bold'}}>{props.data.titre} <span style={{color: 'green'}}>x {props.data.quantite}</span></p>
                    <button onClick={() => { props.removeFromCart(props.data.reference) }} style={styles.deleteButton}>x</button>
                </>
            )
        }
    }

    return (
        <div style={styles.container}>
            {displayHeader()}
            <p style={styles.field}>{props.data.description}</p>
            {displayButton()}
        </div>
    )
}

const styles = {
    container: {
        position: 'relative',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        boxShadow: 'grey 2px 2px 10px',
    },
    field: {
        padding: '5px 40px',
        margin: 0,
    },
    button: {
        margin: 0,
        width: '100%',
        border: 'none',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'green',
        textAlign: 'right',
        color: 'white',
        padding: '6px 0px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: 'darkred',
        position: 'absolute',
        top: 0,
        right: 0,
        border: 'none',
        fontSize: 20,
        color: 'white',
        borderTopRightRadius: 10,
        height: 30,
        width: 30,
    },
}