import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const Nav = (props) => {

  return (
    <header>
      <nav id="nav-bar">
        <Link to="/home">Shuffler</Link>
        <Link to="/combo">Combo Board</Link>
        <Link to="favorites">Favorites</Link>
        <Button className="logout" onClick={props.handleLogout}>Log Out</Button>
      </nav>
    </header>
  )
}


export default Nav;