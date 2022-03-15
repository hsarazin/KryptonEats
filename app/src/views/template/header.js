import React from 'react'
import './header.css'

export default function Header() {
  return (
    <div className='header'>
        <a href='/'>
            <h1 className='title'><span role='img' aria-label='hamburger-emoji'>🍔</span><span>Krypton</span>Eats</h1>
        </a>
        <div className='log'>
            <a href='/register' style={{backgroundColor: 'black'}}>S'inscrire</a>
            <a href='/login'>Se connecter</a>
        </div>
    </div>
  )
}