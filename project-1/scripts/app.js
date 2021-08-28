function init() {

  // score mechanic?
  // different levels of ai?
  // sounds and more complex animations?
  // multiple screens?

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // planning and placement phase with 'reset' button
  // box with start button -> takes  you difficulty level selection
  
  // first page planning 'strategy panel' reset all placements, randomly place, quit, drag and drop ships
  // ships can't be placed base to base, so need an extra width where you are denied.
  // rotation button, jumps ship back to start table if you rotate them into a position they can't be
  
  // Music in this section or from the start(?) Sound effect on button presses

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // fight phase: once player ACCEPTS strategy phase is over 'strategy button'
  //  randomize computer ships, and place them.
  //  enter a while loop where you can only leave by destroyed ships from one team or quit.
  // on end, show score. Score is hits scored minus enemy hits.
  // way to reset the game without browser refresh?

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // ~~~~~~~~~~~~    CODING BEGINS HERE   ~~~~~~~~~~~~~~~~

  // const gridBoxes = document.querySelectorAll('.gridDiv')
  // const gridBoxesP = document.querySelectorAll('.gridPDiv')
  const startB = document.getElementById('start')
  const rotateB = document.getElementById('rotate')
  const difficultyLevels = document.querySelectorAll('#difficulty button')
  const fightB = document.getElementById('fight')
  const quitB = document.getElementById('quit')
  const shipSelector = document.getElementById('ship')
  let difficultyLevel = ''
  const shipClasses = ['carrierC','battleshipC','destroyerC','submarineC','patrolboatC', 'carrierP','battleshipP','destroyerP','submarineP','patrolboatP']
  const computerClasses = ['carrierC','battleshipC','destroyerC','submarineC','patrolboatC']
  const playerClasses = ['carrierP','battleshipP','destroyerP','submarineP','patrolboatP']
  
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
  const computersShips = [carrierC, battleshipC, destroyerC, submarineC, patrolboatC]
  let currentShipIndex = 0
  let selectedShip = destroyerP

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

  // function computerGuess(){

  // }

  function playerGuess(event) {
    // window.confirm("Confirm Firing Coordinates")
    const eT = event.target
    const guessClass = event.target.className
    if (computerClasses.includes(guessClass)){
      // event.target.className
      // ship.damage += 1
      // figure out how to add damage here
      console.log(`We hit their ${guessClass.slice(0,-1)}!`)
      eT.style.backgroundColor = 'red'
    } else if (eT.style.backgroundColor === 'red'){
      console.log('already hit here')
    } else if (eT.style.backgroundColor === ''){
      console.log('Miss!')
      eT.style.backgroundColor = 'grey'
    } else if (event.target.style.backgroundColor === 'grey'){
      console.log('You already missed here.')
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

  function rotateButton(){
    // console.log('pushed rotate button', selectedShip, 'currently selected ship')
    rotateShip(selectedShip, 'P')
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
      // console.log('Pass -', pass)
      if (ship.orientation === 'vertical') {
        let gridLoc = 'grid' + letter + doubleDigits(getRandomInt(100-(((ship.lengthS-1)*10))))
        let getEl = document.getElementById(gridLoc)
        if (shipClasses.includes(getEl.className)){
          // console.log(`${document.getElementById(gridLoc).className} already there ${gridLoc}`)
          continue
        } else {
          ship.startLocation = gridLoc
          if(validateSpawn(ship, letter).includes(true)){
            // console.log("Can't Spawn Here - Retrying - FAILURE ZONE WITHOUT RELOOPING - VERTICAL")
            ship.startLocation = ''
          } else {
            // console.log('successful fresh placement at ' + gridLoc + ' from if')
            validStart = true
          }
        }
      } 
      else {
        let gridLoc = ('grid' + letter + String(getRandomInt(10)) + String(getRandomInt(10-(ship.lengthS-1))))
        let getEl = document.getElementById(gridLoc)
        
        if (shipClasses.includes(getEl.className)){
          // console.log(`${document.getElementById(gridLoc).className} already there ${gridLoc}`)
          continue
        } else {
          ship.startLocation = gridLoc
          if(validateSpawn(ship, letter).includes(true)){
            // console.log("Can't Spawn Here - Retrying - FAILURE ZONE WITHOUT RELOOPING - HORIZONTAL")
            ship.startLocation = ''
          } else {
            // console.log('successful fresh placement at ' + gridLoc +' from else')
            validStart = true
          }
        }
      }
      pass += 1
    }
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

  function fightButton(){
      const disGssGrd = document.querySelector('.grid-wrapper')
      disGssGrd.style.display = 'flex'
      fightB.disabled = true
      shipSelector.disabled = true
      rotateB.disabled = true
      fightB.style.display = 'none'
      quitB.style.display = 'unset'
      quitB.disabled = false

      // GAME PLAY LOOP HERE FOR NOW

      



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





  // NOTES FOR MYSELF

  // I have rotation selector and button
  // I have randomized ship locations on both grids
  // game Start should initialize ships
  // 
  // confirmation of strategy phase should display guess panel
  // and start gameplay loop
  // gameplay loop should have computer generated guesses after player confirms guess
  // guesses should add damage, enough damage triggers destruction confirmation

  // enough destroyed = gameplay loop end
  
  // end button = end -> reload to original conditions?

  // I need to build a game loop that ends when ships are destroyed
  // notification when a ship is destroyed
  // add damage to ships when hit

  // get phase 1 of randomized stuff, then drag and drop placement with rotation possible
  // then phase 2 hit start and start a while loop that involves guessing + computer guesses
  // go back and forth until every ship on one side is destroyed, or quit hit.
  // finish touches of buttons disabled or not.

// NEXT STEPS AFTER THAT ARE, DRAGGABLE PLAYER SHIPS, SELECT SHIP FOR ROTATION
// CREATE AI GUESSING CODE AND PLAYER GUESSING CODE THAT BEGINS ON START
// CREATE DAMAGE ETC SO THAT YOU CAN ENTER A GAME LOOP THAT SPAWNS SHIPS, CONFIRMS PLACEMENT, DESTROYS SHIPS, TRACKS SCORE, ENDS GAME

}

window.addEventListener('DOMContentLoaded', init)
