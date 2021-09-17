import React from 'react'
import { Link } from 'react-router-dom'

const ChampionCard = ({ name, image, tags, id }) => {
  const image2 = { ...image }

  return (
    <div className="col-2 col-md-2 mb-1" style={{cursor: 'pointer', padding: '3px', marginBottom: '5px'}}>
      <Link to={`/champions/${ id }`}>
      <div className="card text-center" style={{backgroundColor: '#c39837'}}>
        <div className="card-image">
          <img className="w-100" src={`http://ddragon.leagueoflegends.com/cdn/11.18.1/img/champion/${image2.full}`} alt={name} />
        </div>
        <div className="card-text" style={{color: 'black'}}>
          <h4>{name}</h4>
        </div>
        <div className="card-text" style={{color: 'black'}}>
          {tags.length === 2 ? <h6>{tags[0]} - {tags[1]}</h6> : <h6>{tags[0]}</h6>}
        </div>
      </div>
      </Link>  
    </div>
  )
}

export default ChampionCard