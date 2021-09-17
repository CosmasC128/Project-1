import ChampionCard from './ChampionCard'
import Filters from './Filters'
import React, { useState, useEffect } from 'react'
import banner from '../images/banner.webp'

const Champions = ({ championsArray }) => {

  const [ filteredChampions, setFilteredChampions ] = useState([])
  const [ filters, setFilters ] = useState({ role: '', searchTerm: '' })

  // Handle updates to select and text input
  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }

  // Listening for updates on Champions and filters and updating filteredChampions
  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredChampions(championsArray.filter(champion => {
      return regexSearch.test(champion.name) && (filters.role === champion.tags[0] || filters.role === champion.tags[1] || filters.role === 'All')
    }))
  }, [filters, championsArray])

  return (
    <div className="container">
      <div style={{color: 'white', textAlign: 'center', backgroundImage: `url(${banner})`, backgroundSize: 'cover', height:'160px', padding: '20px', marginBottom: '25px', marginTop: '20px'}}>
        <h1 style={{marginBottom: '10px', textShadow: '2px 2px rgba(0,0,0,.6)'}}>League of Legends Champions!</h1>
        <Filters handleFilterChange={handleFilterChange} {...filters}/>
        <div className="row">
        {( filters.role !== '' || filters.searchTerm !== '' ? filteredChampions : championsArray ).map(champion => { 
              return <ChampionCard key={champion.id} { ...champion } />
            })}
        </div>
      </div>
    </div> 
  )
}

export default Champions