import React from 'react'


const Spells = ({ name, image, description }) => {

  const image2 = { ...image }

  return (<>
    <h4 style={{color: '#c39837'}}>{name}</h4>
    <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px'}}>
      <img src={`http://ddragon.leagueoflegends.com/cdn/11.18.1/img/spell/${image2.full}`} alt={name} style={{border: '3px  solid #c39837', borderRadius: '5px', marginBottom: '5px'}}></img>
      <p style={{marginLeft: '10px'}}>{description}</p>
    </div>
  </>)
}

export default Spells