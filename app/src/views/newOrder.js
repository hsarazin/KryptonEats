import React from 'react'
import Product from '../components/product'
import config from '../config.js'

export default function NewOrder() {


    // const _products = [
    //     {
    //         reference: 'IDE84YZ',
    //         titre: 'Burger bacon cheese chicken',
    //         description: 'Miam miam un bon burger...',
    //         prix: 15.90,
    //         quantite: 1,
    //     },
    //     {
    //         reference: 'Z444Y16O',
    //         titre: 'Wrap courgettes',
    //         description: 'Miam miam un bon wrap...',
    //         prix: 7.90,
    //         quantite: 1,
    //     }
    // ]

    const [products, setProducts] = React.useState([])

    React.useEffect(() => {
        fetch(`${config.API_ADDRESS}/products`, { 
            method: 'GET',
            mode: 'no-cors', 
            headers: { 'Access-Control-Allow-Origin': '*' }
        })
        .then(async response => {
            console.log(response)
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            setProducts(data.products)
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() })
            console.error('There was an error!', error);
        })
    }, [])

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🍔 <span style={{color: 'green'}}>Krypton</span>Eats 🍔</h1>
            <h2>Nouvelle commande</h2>
            {products.map(product => {
                return <Product data={product} key={product.reference}/>
            })}
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