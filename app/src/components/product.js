import React from 'react'

import './product.css'

export default function Product(props) {
    if (props.data === undefined) {
        return (
            <div className="productContainer">
                <p>Error: no data given as parameter for the Product component.</p>
            </div>
        )
    }

    const displayButton = () => {
        if (!props.isCart) {
            return (
                <div className="footer">
                    <button onClick={() => { props.addToCart(props.data) }} className="button">Ajouter au panier</button>
                    <h4>{props.data.prix.toFixed(2)}€</h4>
                </div>
            )
        }
    }

    const displayHeader = () => {
        if (!props.isCart) {
            return (
                <p className="field" style={{fontSize: 20, fontWeight: 'bold'}}>{props.data.titre}</p>
            )
        }
        else {
            return (
                <>
                    <p className="field" style={{fontSize: 20, fontWeight: 'bold'}}>
                        {props.data.titre} <span style={{color: 'green'}}>x {props.data.quantite}</span>
                    </p>
                    <button className="deleteButton" onClick={() => { props.removeFromCart(props.data.reference) }}>x</button>
                </>
            )
        }
    }

    return (
        <div className="productContainer">
            {displayHeader()}
            <p className="field">{props.data.description}</p>
            {displayButton()}
        </div>
    )
}