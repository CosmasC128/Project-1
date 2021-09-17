import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './components/NavBar.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home.js'
import Champions from './components/Champions.js'
import Champion from './components/Champion.js'


const  App = () => {
  const [champions, setChampions] = useState({})

  useEffect(() =>{
    const getChampions = async() => {
      const { data } = await axios('http://ddragon.leagueoflegends.com/cdn/11.18.1/data/en_US/champion.json')
      setChampions(data)
    }
    getChampions()
  },[])

  const championsData = { ...champions.data }
  const championsArray = Object.values({ ...championsData })
  
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/champions">
          <Champions championsArray={championsArray}/>
        </Route>
        <Route exact path="/champions/:id">
          <Champion />
        </Route>
      </Switch>
    </BrowserRouter>
  )
  
}

export default App