import React from 'react'
import { Bounce } from 'react-activity'
import 'react-activity/dist/library.css'

import Header from './template/header'
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
                _product.quantite ++
            }
        })
        if (!doesExist) {
            tmpCart.push(product)
        }
        setCart(tmpCart)
    }

    const removeFromCart = (reference) => {
        let tmpCart = [...cart]

        tmpCart.forEach(_product => {
            if (_product.reference === reference) {
                if (_product.quantite <= 1) {
                    tmpCart = tmpCart.filter(element => { return element.reference !== reference})
                    return
                }
                _product.quantite--
            }
        })
        setCart(tmpCart)
    }

    const submitOrder = () => {
        console.log("commander")
    }

    const displayError = () => {
        if (error !== "")
            return <p className="error">Une erreur est apparue : {error.toString()}</p>
    }

    const activityIndicator = () => {
        if (products.length === 0 && error === "")
            return <Bounce color={'green'} size={50}/>
    }


    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.main}>
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
                <div style={{...styles.productContainer, flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <h2 style={{...styles.cartText, color: 'green', fontSize: 32}}>Panier</h2>
                    <h2 style={styles.cartText}>Total: {cartPrice}€</h2>
                    <button style={{...styles.orderButton, backgroundColor: (cartPrice>0 ? 'green':'grey'), cursor: (cartPrice>0 ? 'pointer':'not-allowed')}} onClick={submitOrder}>Commander</button>
                </div>
                <div style={{...styles.productContainer, ...styles.cartContainer}}>
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
        paddingTop: 64,
    },
    productContainer: {
        display: 'flex',
        flex: 8,
        flexDirection: 'column',
        gap: 20,
    },
    cartContainer: {
        flexDirection: 'row',
        padding: '20px 20px',
        overflowX: 'scroll',
    },
    cart: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        flex: 3,
        justifySelf: 'end',
        height: '20vh',
        padding: '0px 20px',
    },
    cartText: {
        margin: 0,
        textAlign: 'center'
    },
    orderButton: {
        border: 'none',
        padding: '10px 30px',
        color: 'white',
        fontSize: 24,
        marginTop: 20,
        cursor: 'pointer',
    }
}