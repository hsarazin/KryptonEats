import React from 'react'
import { Bounce } from 'react-activity'
import "react-activity/dist/library.css"

import Product from '../components/product'
import { getAllProducts } from '../tools/fetchApi'


export default function NewOrder() {

    const [products, setProducts] = React.useState([])
    const [error, setError] = React.useState("")
    const [cart, setCart] = React.useState([])
    const [cartPrice, setCartPrice] = React.useState(0)

    React.useEffect(() => {
        // Load cart from localStorage
        setCart(JSON.parse(localStorage.getItem('cart')))
        setTimeout(() => {
            // Add delay to show the beautiful loading animation...
            getAllProducts()
            .then(result => { setProducts(result) })
            .catch(err => { setError(err) })
        }, 1000)
    }, [])

    React.useEffect(() => {
        // Update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart))
        let price = 0
        cart.forEach(_product => {
            price += _product.prix * _product.quantite
        })
        setCartPrice(price.toFixed(2))
    }, [cart])

    const addToCart = (product) => {
        let doesExist = false
        let tmpCart = [...cart]
        tmpCart.forEach(_product => {
            if (_product.reference === product.reference) {
                doesExist = true
                _product.quantite += 1
            }
        })
        if (!doesExist) {
            tmpCart.push(product)
        }
        setCart(tmpCart)
    }

    const removeFromCart = (reference) => {
        // let tmpCart = [...cart]
        // tmpCart.forEach(_product => {
        //     if (_product.reference === reference) {
        //         _product.quantite--
        //         if (_product.quantite <= 0) {
        //             tmpCart.pop(_product)
        //         }
        //     }
        // })
        // setCart(tmpCart)
    }

    const displayError = () => {
        if (error !== "")
            return <p>Une erreur est apparue :{error.toString()}</p>
    }

    const activityIndicator = () => {
        if (products.length === 0)
            return <Bounce color={'green'} size={50}/>
    }


    return (
        <div style={styles.container}>
            <div style={styles.main}>
                <h1 style={styles.title}>🍔 <span style={{color: 'green'}}>Krypton</span>Eats 🍔</h1>
                <h2>Nouvelle commande</h2>
                {displayError()}
                {activityIndicator()}
                <div style={styles.productContainer}>
                    {products.map(product => {
                        return <Product data={product} addToCart={addToCart} key={product.reference}/>
                    })}
                </div>
            </div>
            <div style={styles.cart}>
                <h2 style={{alignSelf: 'center', textAlign: 'center'}}>Panier<br></br>Total: {cartPrice}€</h2>
                <div style={styles.productContainer}>
                    {cart.map(product => {
                        return <Product data={product} isCart={true} addToCart={addToCart} removeFromCart={removeFromCart} key={product.reference}/>
                    })}
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'lightGrey',
        justifyContent: 'space-between',
    },
    main: {
        flex: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    productContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    cart: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        flex: 3,
        justifySelf: 'end',
        height: '20vh',
        overflowY: 'scroll',
    }
}