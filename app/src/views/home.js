import React from 'react'

import './home.css'
import Header from './template/header'
import burgerGif from './images/burger.gif'


export default function Home() {

    const onNewOrder = () => {
        window.location.href = "/newOrder"
    }

    const onMyOrders = () => {
        window.location.href = localStorage.getItem('user') ? "/myOrders" : "/login"
    }

    return (
        <div style={styles.container} className="home">
            <Header />
            <img src={burgerGif} style={styles.gif} alt="Animinated Burger!" />
            <button href="/newOrder" onClick={onNewOrder} style={styles.button}>Commander</button>
            <button href="/myOrders" 
                    onClick={onMyOrders} 
                    style={{...styles.button, backgroundColor: localStorage.getItem('user') ? 'green' : 'grey'}}
                    className={localStorage.getItem('user') ? '' : 'hoverText'}>Voir mes commandes</button>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: 300,
    },
    button: {
        border: 'none',
        backgroundColor: 'green',
        color: 'white',
        textDecoration: 'none',
        padding: '20px 50px',
        marginTop: '20px',
        width: 400,
        textAlign: 'center',
        fontSize: 28,
        cursor: 'pointer',
        position: 'relative',
    },
}