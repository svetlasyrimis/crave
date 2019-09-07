import React from 'react'
import logo from '../assets/mealm.jpg'

function Header() {
  return (
    <div className="header">
      <header>
        <img src={logo} alt="header" />
        <h1>Meal Match</h1>
      </header>
    </div>
  )
}

export default Header; 