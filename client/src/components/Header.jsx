import React from 'react'
import logo from '../assets/mealm.jpg'

function Header() {
  return (
    <div className="nav-login">
      <img className="logo-image" src={logo} alt="logo" />
      <h1>Crave</h1>
    </div>
  )
}

export default Header; 