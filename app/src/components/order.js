import React from 'react'

import './order.css'

export default function Order(props) {
    if (props.data === undefined) {
        return (
            <div className="order">
                <p>Error: no data given as parameter for the Order component.</p>
            </div>
        )
    }
    const order = props.data
    const products = order.liste_produits
    let totalPrice = 0
    products.forEach(product => {
        totalPrice += product.prix * product.quantite
    })

    const displayButton = () => {
        return (
            <div className="footer">
                <h4>{totalPrice.toFixed(2)}€</h4>
                <button onClick={() => { props.delivered(order) }} className="button">{order.valide ? '✔ Livrée' : 'A livrer'}</button>
            </div>
        )
    }

    return (
        <div className="order">
            <p className="field" style={{fontSize: 24, fontWeight: 'bold'}}>Commande n°{order.id}</p>
            <p className="field">Client: {order.utilisateur}</p>
            <ul>
            {products.map(product => {
                return (<li key={product.reference}>
                    {product.titre} <span style={{color: 'green', fontWeight: 'bold'}}>x {product.quantite}</span>
                </li>)
            })}
            </ul>
            {displayButton()}
        </div>
    )
}