import React from 'react'
import { Bounce } from 'react-activity'
import 'react-activity/dist/library.css'

import Header from './template/header'
import Order from '../components/order'
import { getAllToBeDeliveredOrders } from '../tools/fetchApi'

export default function MyOrders() {

    const [orders, setOrders] = React.useState([])
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        setTimeout(() => {
            // Add delay to show the beautiful loading animation...
            getAllToBeDeliveredOrders()
            .then(result => { setOrders(result) })
            .catch(err => { setError(err) })
        }, 1000)

        setOrders([...orders, {
            id: '48752',
            utilisateur: 'Oui Non',
            liste_produits: [
                {
                    id: 1,
                    reference: "IDE84YZ",
                    titre: "Burger Bacon cheese chicken",
                    description: "Un bon burger au poulet et bacon avec son cheddar fondu",
                    prix: 15.9,
                    quantite: 4,
                    created_at: "2022-03-16 20:10:02",
                    updated_at: "2022-03-16 20:10:02"
                },
                {
                    id: 2,
                    reference: "Z444Y160",
                    titre: "Wrap courgette",
                    description: "Parce que les vegans aussi on le droit de se faire plaisir !",
                    prix: 7.9,
                    quantite: 2,
                    created_at: "2022-03-16 20:10:02",
                    updated_at: "2022-03-16 20:10:02"
                }
            ],
            valide: false
        }])
    }, [])

    const delivered = (order) => {
        order.valide = true
        console.error("Non implémentée")
    }
    
    const displayError = () => {
        if (error !== "")
            return <h2 style={{color: 'red'}}>Une erreur est apparue : {error.toString()}</h2>
    }

    const activityIndicator = () => {
        if (orders.length === 0)
            return <Bounce color={'green'} size={50}/>
    }

    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.main}>
                <h2>Voir mes commandes</h2>
                {displayError()}
                {activityIndicator()}
                <div style={styles.orderContainer}>
                    {orders.map(order => {
                        return <Order data={order} delivered={delivered} key={order.id}/>
                    })}
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        marginTop: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    main: {
        flex: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 64,
    },
}