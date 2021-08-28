function init() {

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // NOTES FOR MYSELF
  
  
  // *** REQUIRED FOR MVP ***  
  // *****DRAG AND DROP IN THE STRATEGY PHASE****
  // *** CREATE AI GUESSING CODE ***

  // WEDNESDAY
  // 4. AI levels of guessing loaded upon difficulty level
  //    i. advanced and random guessing ii. search and destroy after a hit
  //       BONUS   iii. re-evaluate andvanced guessing after destorying smallest ships
  
  //8. draggable ships?

  // 1. forEach loop on initialization
  // 2. turn all console logs into alerts/confirms
  // 3. reveal ships when they are destroyed for both teams 


  // THURSDAY
  // 5. Game Ending programming (quit resets this and normal states without reloading whole page?)
  // 6. Assets -> ship visuals, water, styling, explosion on hit, ship destroyed, miss splash etc
  // 7. Add sound effects, add music, add a mute button for effects and a mute for sound


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // ~~~~~~~~~~~~    CODING BEGINS HERE   ~~~~~~~~~~~~~~~~

  // const gridBoxes = document.querySelectorAll('.gridDiv')
  // const gridBoxesP = document.querySelectorAll('.gridPDiv')
  const startB = document.getElementById('start')
  const rotateB = document.getElementById('rotate')
  const difficultyLevels = document.querySelectorAll('#difficulty button')
  const disGssGrd = document.querySelector('.grid-wrapper')
  const fightB = document.getElementById('fight')
  const quitB = document.getElementById('quit')
  const shipSelector = document.getElementById('ship')
  let difficultyLevel = ''
  let scoreP = 0
  const shipClasses = ['carrierC','battleshipC','destroyerC','submarineC','patrolboatC', 'carrierP','battleshipP','destroyerP','submarineP','patrolboatP']
  const computerClasses = ['carrierC','battleshipC','destroyerC','submarineC','patrolboatC']
  const playerClasses = ['carrierP','battleshipP','destroyerP','submarineP','patrolboatP']
  let destroyedShipsP = []
  let destroyedShipsC = []
  let loadsOfNumbers = []
  for (let i = 0; i<100;i++){
    loadsOfNumbers.push(i)
  }
  
  // initialize buttons as disabled unless activated by phases
  rotateB.disabled = true
  shipSelector.disabled = true
  fightB.disabled = true
  quitB.disabled = true

  // ~~~~~~~~~~ COMPUTER SHIPS ~~~~~~~~~~~~
  const carrierC = {
    classS: 'carrierC',
    lengthS: 5,
    hitPoints: 5,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid01',
  }
  const battleshipC = {
    classS: 'battleshipC',
    lengthS: 4,
    hitPoints: 4,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid01',
  }
  const destroyerC = {
    classS: 'destroyerC',
    lengthS: 3,
    hitPoints: 3,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid01',
  }
  const submarineC = {
    classS: 'submarineC',
    lengthS: 3,
    hitPoints: 3,
    damage: 0,
    destroyed: false,
    orientation: 'horizontal',
    startLocation: 'grid53',
  }
  const patrolboatC = {
    classS: 'patrolboatC',
    lengthS: 2,
    hitPoints: 2,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid99',
  }

  // ~~~~~~~~~~ PLAYER SHIPS ~~~~~~~~~~~~
  const carrierP = {
    classS: 'carrierP',
    lengthS: 5,
    hitPoints: 5,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid01',
  }
  const battleshipP = {
    classS: 'battleshipP',
    lengthS: 4,
    hitPoints: 4,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid01',
  }
  const destroyerP = {
    classS: 'destroyerP',
    lengthS: 3,
    hitPoints: 3,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid01',
  }
  const submarineP = {
    classS: 'submarineP',
    lengthS: 3,
    hitPoints: 3,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid01',
  }
  const patrolboatP = {
    classS: 'patrolboatP',
    lengthS: 2,
    hitPoints: 2,
    damage: 0,
    destroyed: false,
    orientation: 'vertical',
    startLocation: 'grid01',
  }
  const allShips = [carrierC, battleshipC, destroyerC, submarineC, patrolboatC, carrierP, battleshipP, destroyerP, submarineP, patrolboatP]
  const playersShips = [carrierP,battleshipP,destroyerP,submarineP,patrolboatP]
  const computerShips = [carrierC, battleshipC, destroyerC, submarineC, patrolboatC]
  let currentShipIndex = 0
  let selectedShip = destroyerP
  let winner = ''

  // ~~~~~   GRID CONSTRUCTION AND UTILIZATION START ~~~~~~
  const grid = document.querySelector('.grid')
  const gridP = document.querySelector('.gridP')
  const width = 10 
  const cellCount = width * width
  const cells = []

  function doubleDigits(number){
    if (number < 10){
      return '0' + String(number)
    } else {
      return String(number)
    }
  }

  function createGrid(gridInput){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.id = gridInput.className
      cell.id += doubleDigits(i)
      gridInput.appendChild(cell)
      cells.push(cell)
    }
  }

  createGrid(grid)
  createGrid(gridP)
// ~~~~~   GRID CONSTRUCTION AND UTILIZATION END ~~~~~~

// ~~~~~   GAME PLAY SECTION    ~~~~~~
  
  // GRID BASED CONSTANTS

  const computerBoxes = document.querySelectorAll('.grid div')

  // FUNCTIONS

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  function parseShipL(ship, number){
    let slocN = ship.startLocation.slice(-2)
    if ((Number(slocN) + number) < 10){
      return '0'+ (Number(slocN) + number)
    } else {
      return Number(slocN) + number
    }
  }

  function unplaceShip(ship){
    const shipSquares = document.querySelectorAll(`.${ship.classS}`)
    shipSquares.forEach(sqr => sqr.classList.remove(ship.classS))
  }

  function placeShip(ship, letter){
    if (ship.orientation === 'vertical'){
      for (let i = 0; i < ship.lengthS;i++){
        document.getElementById(`grid${letter}${parseShipL(ship, i*10)}`).classList.add(ship.classS)
      }
    } else {
      for (let i = 0; i < ship.lengthS;i++){
        document.getElementById(`grid${letter}${parseShipL(ship, i)}`).classList.add(ship.classS)
      }
    }
  }

  function validateSpawn(ship, letter){
    if (ship.orientation === 'vertical'){
      let truArray = []
      // console.log(ship.classS, ship.orientation, ship.startLocation, 'from vertical validate spawn')
      for (let i = 1; i < ship.lengthS;i++){
        if (document.getElementById(`grid${letter}${parseShipL(ship, i*10)}`) === null){
            truArray.push(true)
        } else {
          let standIn = document.getElementById(`grid${letter}${parseShipL(ship, i*10)}`).className
          // console.log('grid' + parseShipL(ship, i*10), document.getElementById('grid' + parseShipL(ship, i*10)), 'middle standin', standIn)
          if (shipClasses.includes(standIn)){
            truArray.push(true)
          } else {
            truArray.push(false)
          }
        }
      }
      // if (truArray.includes(true)){
        // console.log('cannot spawn something below ' + ship.classS + ' ' + ship.startLocation)
        // continue
      // }
      return truArray
    } else {
      let truArray = []
      // console.log(ship.classS, ship.orientation, ship.startLocation, 'from horizontal validate spawn')
      for (let i = 1; i < ship.lengthS;i++){
        if (Math.floor(parseShipL(ship, i)/10) > Math.floor(parseShipL(ship, 0)/10)){
          truArray.push(true)
          } else {
            let standInVert = document.getElementById('grid'+ letter + parseShipL(ship, i)).className
            // console.log('grid' + parseShipL(ship, i), document.getElementById('grid' + parseShipL(ship, i)), 'middle standinvert', standInVert)
            if (shipClasses.includes(standInVert)){
              truArray.push(true)
            } else {
              truArray.push(false)
            }
        }
      }
      // if (truArray.includes(true)){
        // console.log('cannot spawn blocking on the right ' + ship.classS + ' ' +ship.startLocation)
        // continue
      // }
      return truArray
    }
  }

  function validateRotation(ship, letter){
    if (ship.orientation === 'vertical'){
      let truArray = []
      // console.log(ship.classS, ship.orientation, ship.startLocation, 'from vertical validateRotation')
      for (let i = 1; i < ship.lengthS;i++){
        if (Math.floor(parseShipL(ship, i)/10) > Math.floor(parseShipL(ship, 0)/10)){
          truArray.push(true)
          } else {
            let standInVert = document.getElementById('grid' + letter + parseShipL(ship, i)).className
            // console.log('grid' + letter + parseShipL(ship, i), document.getElementById('grid' + letter + parseShipL(ship, i)), 'middle', standInVert)
            if (shipClasses.includes(standInVert)){
              truArray.push(true)
            } else {
              truArray.push(false)
            }
        }
      }
      // if (truArray.includes(true)){
      //   console.log('cannot rotate right ' + ship.classS + ' ' +ship.startLocation)
      // }
      return truArray
      } else {
      let truArray = []
      // console.log(ship.classS, ship.orientation, ship.startLocation, 'from horizontal validateRotation')
      for (let i = 1; i < ship.lengthS;i++){
        if (document.getElementById(`grid${letter}${parseShipL(ship, i*10)}`) === null){
            truArray.push(true)
        } else {
          let standIn = document.getElementById(`grid${letter}${parseShipL(ship, i*10)}`).className
          // console.log('grid' + letter + parseShipL(ship, i), document.getElementById('grid' + letter + parseShipL(ship, i)), standIn)
          if (shipClasses.includes(standIn)){
            truArray.push(true)
          } else {
            truArray.push(false)
          }
        }
      }
      // if (truArray.includes(true)){
      //   console.log('cannot rotate down ' + ship.classS + ' ' +ship.startLocation)
      // }
      return truArray
    }
  }

  function rotateShip(ship, letter){
    if (ship.orientation === 'vertical'){
      if(validateRotation(ship, letter).includes(true)){
        console.log("Can't be rotated at this location")
      } else {
        ship.orientation = 'horizontal'
        unplaceShip(ship)
        placeShip(ship, letter)
      }
    } else {
      if(validateRotation(ship, letter).includes(true)){
        console.log("Can't be rotated at this location")
      } else{
        ship.orientation = 'vertical'
        unplaceShip(ship)
        placeShip(ship, letter)
    }
  }
  } 

  function parseDifficulty(){
    if (difficultyLevel === 'hard'){
      console.log('this does not exist yet')
    } else if (difficultyLevel === 'medium') {
      console.log('this does not exist yet')
    } else {
      console.log('computer easy guess')
      computerGuessEasy()
    }
  }


  // easy difficulty is simply random guess fed into computerGuess (easy??)
  // medium difficulty is random guess fed into computerguess + search and destroy functionality
  // hard difficulty is efficient random guessing + search and destroy functionality 
  function randomGuess(){

  }

  function advancedRandomGuess(){

  }

  function searchAndDestroy(){
    // need a function that tells the ai what its next guess will be

  }

  function computerGuessEasy(){
    // changes with difficulty levels
    let numGuess = doubleDigits(loadsOfNumbers[getRandomInt(loadsOfNumbers.length)])
    let indexGuess = loadsOfNumbers.indexOf(Number(numGuess))
    loadsOfNumbers.splice(indexGuess, 1)

    // does not need to change between difficulty levels
    let compGuessL = 'gridP' + numGuess
    const guessLocC = document.getElementById(compGuessL)
    const guessClass = guessLocC.className
    let validHit = false
    let warning = ''

    if (guessLocC.style.backgroundColor != 'red' && playerClasses.includes(guessClass) ){
        let damagedShip = playersShips[playerClasses.indexOf(guessClass)]
        damagedShip.damage++
        scoreP -= 100
        guessLocC.style.backgroundColor = 'red'
        if(damagedShip.damage === damagedShip.hitPoints){
          console.log(`They destroyed our ${guessClass.slice(0,-1)} Admiral!`)
          scoreP -= 100
          destroyedShipsP.push(guessClass)
          if (destroyedShipsP.length === 5){
            console.log("They have destroyed our fleet! The day is lost! Your score: "+ scoreP)
            winner = 'computer'
          }
        } else {
          if (damagedShip.damage === (damagedShip.length-1)){
            warning = " It is critically damaged!"
          } 
          console.log(`They hit our ${guessClass.slice(0,-1)} Admiral!${warning}`)
        }
      } else if (guessLocC.style.backgroundColor === ''){
        console.log('They missed us Admiral!')
        guessLocC.style.backgroundColor = 'grey'
        validHit = true
      }
  }

  function playerGuess(event) {
    // window.confirm("Confirm Firing Coordinates. Choose wisely, they will return fire.")
    const eT = event.target
    const guessClass = eT.className
    if (eT.style.backgroundColor != 'red' && computerClasses.includes(guessClass) ){
      let damagedShip = computerShips[computerClasses.indexOf(guessClass)]
      damagedShip.damage++
      scoreP += 100
      eT.style.backgroundColor = 'red'

      if(damagedShip.damage === damagedShip.hitPoints){
        console.log(`We destroyed their ${guessClass.slice(0,-1)} Admiral! One step closer to victory!`)
        destroyedShipsC.push(guessClass)
        scoreP += 100
        if (destroyedShipsC.length === 5){
          console.log(`We have destroyed their fleet! Victory is ours! Your score: ${scoreP}`)
          winner = 'player'
        } else {
          parseDifficulty()
        }
      } else {
        console.log(`We hit their ${guessClass.slice(0,-1)} Admiral! Excellent shot!`)
        parseDifficulty()
      }
    } else if (eT.style.backgroundColor === 'red'){
      console.log('We already hit here. Choose new coordinates Admiral...')
    } else if (eT.style.backgroundColor === ''){
      console.log('We missed Admiral!')
      eT.style.backgroundColor = 'grey'
      parseDifficulty()
    } else if (eT.style.backgroundColor === 'grey'){
      console.log('We already missed here. Choose new coordinates Admiral...')
    }
  }

  function rotateSelection(event){
    currentShipIndex++
    if (currentShipIndex > (playersShips.length-1)){
      currentShipIndex -= (playersShips.length)
    }
    let shipObjectClass = playersShips[currentShipIndex].classS
    let shipD = shipObjectClass.charAt(0).toUpperCase() + shipObjectClass.slice(1, -1)
    event.target.innerHTML = shipD
    selectedShip = playersShips[currentShipIndex]
  }



  function rndmInitializeShip(ship, letter){
    let validStart = false
    let orientNum = getRandomInt(2)
    if (orientNum === 0){
      ship.orientation = 'vertical'
    } else {
      ship.orientation = 'horizontal'
    }
    let pass = 0
    while (validStart === false && pass < 12){
      if (ship.orientation === 'vertical') {
        let gridLoc = 'grid' + letter + doubleDigits(getRandomInt(100-(((ship.lengthS-1)*10))))
        let getEl = document.getElementById(gridLoc)
        if (shipClasses.includes(getEl.className)){
          continue
        } else {
          ship.startLocation = gridLoc
          if(validateSpawn(ship, letter).includes(true)){
            ship.startLocation = ''
          } else {
            validStart = true
          }
        }
      } 
      else {
        let gridLoc = ('grid' + letter + String(getRandomInt(10)) + String(getRandomInt(10-(ship.lengthS-1))))
        let getEl = document.getElementById(gridLoc)
        
        if (shipClasses.includes(getEl.className)){
          continue
        } else {
          ship.startLocation = gridLoc
          if(validateSpawn(ship, letter).includes(true)){
            ship.startLocation = ''
          } else {
            validStart = true
          }
        }
      }
      pass += 1
    }
  }

  // ~~~~~   MENU BUTTON FUNCTIONS   ~~~~~~

  function fightButton(){
    disGssGrd.style.display = 'flex'
    fightB.disabled = true
    shipSelector.disabled = true
    rotateB.disabled = true
    fightB.style.display = 'none'
    quitB.style.display = 'unset'
    quitB.disabled = false

    // GAME PLAY LOOP HERE FOR NOW
    // not sure if there will be another gameplay loop after this
  }

  function rotateButton(){
    rotateShip(selectedShip, 'P')
  }

  function setDifficulty(event){
    difficultyLevel = event.target.id
    console.log(`Difficulty level set to: ${difficultyLevel}`)
    if (event.target.id === 'hard'){
      document.getElementById('easy').disabled = true
      document.getElementById('medium').disabled = true
    } else if (event.target.id === 'medium'){
      document.getElementById('easy').disabled = true
      document.getElementById('hard').disabled = true      
    } else {
      document.getElementById('medium').disabled = true
      document.getElementById('hard').disabled = true
    }
  }
  
  function startButton(){
    if (difficultyLevel.length > 0){
      startB.disabled = true
      rotateB.disabled = false
      shipSelector.disabled = false
      fightB.disabled = false

      console.log('Begin Placement Phase')

      // INITIALIZATION BLOCK HERE FOR NOW
      // summarize into a forEach for expediency and accuracy
      rndmInitializeShip(carrierC,'')
      placeShip(carrierC, '')
    
      rndmInitializeShip(battleshipC, '')
      placeShip(battleshipC, '')
    
      rndmInitializeShip(destroyerC, '')
      placeShip(destroyerC, '')
    
      rndmInitializeShip(submarineC, '')
      placeShip(submarineC, '')
    
      rndmInitializeShip(patrolboatC, '')
      placeShip(patrolboatC, '')
    
      rndmInitializeShip(carrierP,'P')
      placeShip(carrierP, 'P')
    
      rndmInitializeShip(battleshipP, 'P')
      placeShip(battleshipP, 'P')
    
      rndmInitializeShip(destroyerP, 'P')
      placeShip(destroyerP, 'P')
    
      rndmInitializeShip(submarineP, 'P')
      placeShip(submarineP, 'P')
    
      rndmInitializeShip(patrolboatP, 'P')
      placeShip(patrolboatP, 'P')

    } else {
      console.log('choose a difficulty level first')
    }
  }



  function fakeQuit(){
    location.reload()
  }

// ~~~~~   EVENT LISTENERS   ~~~~~~
  shipSelector.addEventListener('click', rotateSelection)
  rotateB.addEventListener('click', rotateButton)
  startB.addEventListener('click', startButton)
  computerBoxes.forEach(bx => bx.addEventListener('click', playerGuess))
  difficultyLevels.forEach(btn => btn.addEventListener('click', setDifficulty))
  fightB.addEventListener('click', fightButton)
  quitB.addEventListener('click', fakeQuit)
// ~~~~~   FINAL INITIALIZAIONS FOR TESTING STAGES    ~~~~~~





  // for (let i = 0; i<allShips.length; i++){
  //   if (allShips[i].slice(-1) === 'C'){
  //     rndmInitializeShip(allShips[i], '')
  //     placeShip(allShips[i], '')
  //   } else {
  //     rndmInitializeShip(allShips[i], 'P')
  //     placeShip(allShips[i], 'P')
  //   }

  // }

}

window.addEventListener('DOMContentLoaded', init)
