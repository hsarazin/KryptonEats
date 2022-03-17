import React from 'react'

import { logout } from '../../tools/authentication'
import './header.css'

export default function Header() {

  if (localStorage.getItem('user')) {
    // User logged in (display info)
    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <div className='header'>
        <a href='/'>
            <h1 className='title'><span role='img' aria-label='hamburger-emoji'>🍔</span><span>Krypton</span>Eats</h1>
        </a>
        <div className={['userInfo', 'log'].join(' ')}>
            <h2>Bonjour <span>{user.prenom}</span> !</h2>
            <a href='/' onClick={logout} style={{backgroundColor: 'black'}}>Déconnexion</a>
        </div>
      </div>
    )
  }
  else {
    // User not logged in
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

}