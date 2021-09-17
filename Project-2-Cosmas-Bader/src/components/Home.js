
import React from 'react'
import { Link } from 'react-router-dom'
import home from '../images/home.png'

const Home = () => {


  return (
    <div className="container">
      <h1 className="text-white" style={{textAlign: 'center'}}>Welcome to League of Legends: Champions</h1>
      <div style={{backgroundImage: `url(${home})`, backgroundSize: 'cover', height: '800px', backgroundRepeat: 'no-repeat', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Link to="/champions" className="btn btn-lg" style={{fontWeight: 'bold', textShadow: '1px 1px #8080806b', backgroundColor: '#c39837', border: '1px solid rgba(0,0,0,.4)'}}>Explore Champions</Link>
      </div>
    </div>
  )
}

export default Home