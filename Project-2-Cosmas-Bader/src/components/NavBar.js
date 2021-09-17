import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const NavBar = () => {
  return (
    <div className="container pt-3">
      <header className="d-flex justify-content-between">
        <Link to='/'>
          <img src={logo} alt="League of Legends Logo" style={{backgroundColor: 'rgb(29, 29, 29)', height: '50px'}}></img>
        </Link>
        <Link to="/champions" className="btn btn-lg" style={{fontWeight: 'bold', textShadow: '1px 1px #8080806b', backgroundColor: '#c39837', border: '1px solid rgba(0,0,0,.4)'}}>CHAMPIONS</Link>
      </header>
    </div>  
  )
}

export default NavBar
