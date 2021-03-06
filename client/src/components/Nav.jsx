import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logo from '../assets/mealm.png'

const Nav = (props) => {
  return (
    <header>
      <nav id="nav-bar">
        <img className="logo" src={logo} alt="logo" />
        <Link to="/home">Shuffler</Link>
        <Link to="/combo">History</Link>
        <Link to="/favorites">Favorites</Link>
        <Button className="logout" onClick={props.handleLogout}>Log Out</Button>
      </nav>
    </header>
  )
}


export default Nav;