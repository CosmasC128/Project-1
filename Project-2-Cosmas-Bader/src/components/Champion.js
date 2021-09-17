import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spells from './Spells'

const Champion = () => {

  // State
  const [ champion, setChampion ] = useState([])
  
  
  // Params
  const { id } = useParams()  

  useEffect(() => {
    const getChampion = async () => {
      try {
        const { data } = await axios(`http://ddragon.leagueoflegends.com/cdn/11.18.1/data/en_US/champion/${id}.json`)
        setChampion(data)
      } catch (err) {
        console.log(err)
      }
    }
    getChampion()
  }, [id])

  const errChamp = {
    id: 'loading',
    name: 'loading',
    title: 'loading',
    tags: ['loading'],
  }

  const newData = { ...champion.data }
  const dataArr = Object.values({ ...newData } )
  const championRefObject = ( dataArr[0] ? dataArr[0] : errChamp)
  const spellArray = ( championRefObject.spells ? championRefObject.spells : [])
  
  let skinsArr = championRefObject.skins
  let num1, num2, rN1, rN2
  let emptyArr = []

  const randomSkinNumber = () => {
    try {
      let newArr = []
      for (let i=0;i<skinsArr.length;i++){
        newArr.push(skinsArr[i].num)
      }
      rN1 = Math.floor(Math.random() * skinsArr.length)
      num1 = newArr[rN1]
      emptyArr.push(newArr[rN1])
      let count = 0
      let ranNum = 0
      while (count < 10 && !rN2){
        ranNum = Math.floor(Math.random() * skinsArr.length)
        if (emptyArr.includes(ranNum)){
          continue
        } else {
          rN2 = ranNum
        }
        count++
      }
      
      num2 = newArr[rN2]
    } catch (error) {
      console.log('')
    } 
  }

  randomSkinNumber()
  

  return (
    <>
      <div className="container mt-4" style={{color: 'white'}}>
        <div className="row">
          <h2 className="text-white" style={{textAlign: 'center'}}>{championRefObject.name} - <span>{championRefObject.title}</span></h2>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-md-2">
            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championRefObject.id}_${num1}.jpg`} alt={championRefObject.name} />
          </div>
          <div className="col-12 col-md-5 offset-2">
            <p>{championRefObject.lore}</p>
            <div className="divider">
              {championRefObject.tags.length === 2 ? <p id="champTags"> <span className="tag">{championRefObject.tags[0]}</span> <span className="tag">{championRefObject.tags[1]}</span></p> : <p><span className="tag">{championRefObject.tags[0]}</span></p>}
            </div>
            <hr />
            <div>
            {spellArray.map(spell => { 
              return <Spells key={spell.name} { ...spell }/>
            })}
            </div>
            <hr />
          </div>
          <div className="col-12 col-md-2">
            <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championRefObject.id}_${num2}.jpg`} alt={championRefObject.name} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Champion