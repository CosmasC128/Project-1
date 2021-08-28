function init() {

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // NOTES FOR MYSELF
  // *** REQUIRED FOR MVP ***  
  // *****DRAG AND DROP IN THE STRATEGY PHASE****
  // *** CREATE AI GUESSING CODE ***

  // WEDNESDAY:
  // 1. AI levels of guessing loaded upon difficulty level
  ////    i. random guessing
  ////    ii. advanced guessing
  //    iii. search and destroy after a hit
  //        a) hunting true/false variabel b) hit location stored c) to shoot at squares loaded d) end hunting if ship destroyed
  //    iV. re-evaluate andvanced guessing after destorying smallest ships / clear central limited area before chasing outer ships
  // 2. change hits and misses to add classes of hit and miss for assets and for detection
  // 3. draggable ships?

  // *** NOT REQUIRED FOR MVP BUT WILL ADD PROFESSIONALISM AT THE VERY LEAST*** 
  //// 4. forEach loop on initialization
  // 5. turn all console logs into alerts/confirms
  // 6. reveal ships when they are destroyed for both teams 

  // THURSDAY:
  // 7. Game Ending programming (quit resets this and normal states without reloading whole page?)
  // 8. Assets -> ship visuals, water, styling, explosion on hit, ship destroyed, miss splash etc
  // 9. Add sound effects, add music, add a mute button for effects and a mute for sound
  // 10. add coordinates around edges of computer board, confirm target selection with letter and a number

  // IF TIME REMAINS:
  // X. Commenting for intelligibility
  // Y. Code Dryness / Refactoring
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



    // ~~~~~~~~~~~~    CODING BEGINS HERE   ~~~~~~~~~~~~~~~~
  
  // BASIC GLOBAL GAME CONDITION VARIABLES
  let scoreP = 0
  let difficultyLevel = ''
  let winner = ''

  // HTML ELEMENT REFERENCES
  const startB = document.getElementById('start')
  const rotateB = document.getElementById('rotate')
  const difficultyLevels = document.querySelectorAll('#difficulty button')
  const disGssGrd = document.querySelector('.grid-wrapper')
  const fightB = document.getElementById('fight')
  const quitB = document.getElementById('quit')
  const shipSelector = document.getElementById('ship')

  // SHIP CLASSES AND DESTROYED SHIP ARRAYS
  const shipClasses = ['carrierC','battleshipC','destroyerC','submarineC','patrolboatC', 'carrierP','battleshipP','destroyerP','submarineP','patrolboatP']
  const computerClasses = ['carrierC','battleshipC','destroyerC','submarineC','patrolboatC']
  const playerClasses = ['carrierP','battleshipP','destroyerP','submarineP','patrolboatP']
  let destroyedShipsP = []
  let destroyedShipsC = []
  
  // FOR COMPUTER'S GUESSING
  
  // random / easy guess
  let loadsOfNumbers = []
  for (let i = 0; i<100;i++){
    loadsOfNumbers.push(i)
  }

  // advanced guess
  let lessNumbers = []
  let evens = [0, 2, 4, 6, 8]
  for (let i = 1; i<100;i+=2){
    if (evens.includes(Math.floor(i/10))){
      lessNumbers.push(i)
    } else {
      lessNumbers.push(i-1)
    }
  }
  let backUpNumbers = loadsOfNumbers.filter(num => !lessNumbers.includes(num))

  // INITIALIZE BUTTONS AS DISABLED UNTIL GAME STARTED
  rotateB.disabled = true
  shipSelector.disabled = true
  fightB.disabled = true
  quitB.disabled = true

  // ~~~~~~~~~~ COMPUTER AND PLAYER SHIPS ~~~~~~~~~~~~
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

  // PLAYER
  
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

  // SHIP OBJECT ARRAYS FOR REFERENCING
  const allShips = [carrierC, battleshipC, destroyerC, submarineC, patrolboatC, carrierP, battleshipP, destroyerP, submarineP, patrolboatP]
  const playersShips = [carrierP,battleshipP,destroyerP,submarineP,patrolboatP]
  const computerShips = [carrierC, battleshipC, destroyerC, submarineC, patrolboatC]
  
  // FOR THE SELECTION AND ROTATION BUTTONS
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

  // ~~~~~~~~   SHIP PLACEMENT AND VALIDATION SECTION ( INITIALIZATION / STRATEGY / PLACEMENT PHASE)   ~~~~~~~~

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

  // ~~~~~~~~   PLAYER GUESSING AND AI GUESSING SECTION (FIGHT PHASE / CORE GAMEPLAY / ENDGAME)   ~~~~~~~~

  // easy difficulty is simply random guess fed into computerGuess (easy??)
  // medium difficulty is random guess fed into computerguess + search and destroy functionality
  // hard difficulty is efficient random guessing + search and destroy functionality 

  // AI levels of guessing loaded upon difficulty level
  ////    i. random guessing
  ////    ii. advanced guessing
  // iii. search and destroy after a hit
  ////    a) hunting true/false variable 
  //    b) hit location stored 
  //    c) to shoot at squares loaded 
  //    d) end hunting if ship destroyed
  //    iV. re-evaluate andvanced guessing after destorying smallest ships / clear central limited area before chasing outer ships

  // *** need to change player and computer guessing to change targets class to hit or miss ***
  // *** need to make sure my computer guess function insertions are correct
  // then feedback and styling comes from those classes
  // so first I have to add those classes
  
  // SEARCH AND DESTROY --- THE CRUX FOR MVP AND ESSENTIALLY FOR MEDIUM AND HARD DIFFICULTIES
  //        a) hunting true/false variable b) hit location stored c) to shoot at squares loaded d) end hunting if ship destroyed
  // I need global variables outside all the functions so they can be updated and then reference again in a new loop through
  
  // SEARCH AND DESTROY GLOBAL CONSTANTS --- FEED INTO SEARCH AND DESTROY AND INTO COMPUTER GUESS
  let hunting = false
  let hitLocation = ''
  let huntingGuess = ''
  const huntingLocations = []

  function searchAndDestroy(hunting, guessStatus){
    // need a function that tells the ai what its next guess will be
    // if hunting is true get your guess from search and destroy, otherwise get a new random guess
    console.log(hunting)
    console.log(!hunting)
    console.log(guessStatus)
    if (hunting is false && guessStatus === 'hit'){ // exclamation point hunting
    } else if (hunting is true && guessStatus === 'hit'){

    } else if (hunting is false && guessStatus === 'miss') {

    } else if (hunting is true && guessStatus === 'miss') {

    } else if (hunting is false && guessStatus === 'clear') {}

    
    
    console.log('The last hunting guess was a ' + guessStatus)

    // if not hunting, and hit is passed in INITIALIZE, and go counter clockwise
    // if hunting miss REVOLVE
    // if hunting and hit, restart and go counter clockwise
    // if hunting and hit, double down (hard part)
    // if hunting, and hit again, 

    if(guessStatus === 'hit'){

    } else{

    }
    
    hitLocation -> feed 4 new locations into huntingLocations[] 
    then iterate through them based on a counter each time the function is running
    
    huntingGuess = results of this function's work
    //must reassign a new value to huntingGuess
  }

  function computerGuess(){
    // A FEW INITIALIZATIONS
    let guessLoc = ''
    let guessClass = ''
    let warning = ''
    
    // If the computer runs out of squares using the efficient 'advanced' guessing method, it will resort to guessing the rest of the squares
    // this may end up being completely unecessary
    if (lessNumbers.length === 0){
      lessNumbers = backUpNumbers
    }

    // I don't need this code for validation at the moment:
    // console.log('computer is attacking remaining squares')
    // else {
    //   console.log(`${lessNumbers.length} numbers left`)
    // }

    // ~~~~~~~~   MODULAR GUESS INFORMATION HERE   ~~~~~~~~
    //easy guess
    let numGuessEasy = doubleDigits(loadsOfNumbers[getRandomInt(loadsOfNumbers.length)])
    let indexGuessEasy = loadsOfNumbers.indexOf(Number(numGuessEasy))
    let compGuessLEasy = 'gridP' + numGuessEasy
    //advanced INITIAL guess
    let numGuessAdv = doubleDigits(lessNumbers[getRandomInt(lessNumbers.length)])
    let indexGuessAdv = lessNumbers.indexOf(Number(numGuessAdv))
    let compGuessLAdv = 'gridP' + numGuessAdv
    // hunting guess
    //re-assigned above by the search and destroy function
    // huntingGuess
    let indexHunting = lessNumbers.indexOf(Number(huntingGuess))
    let huntingId = 'gridP' + doubleDigits(huntingGuess)

    // SELECTION OF INITIAL GUESS BASED ON DIFFICULTY
    if (difficultyLevel === 'easy' || difficultyLevel === 'medium'){ // easy guess tree
      if (hunting){ // if hunting is true, the last guess was a hit, and we will hunt until we destroy the ship hit
        lessNumbers.splice(indexHunting, 1)
        guessLoc = document.getElementById(huntingId)
        guessClass = guessLoc.className
        console.log('running search and destroy easy')
      } else { // procure a new easy guess and eliminate it from the remaining guesses
        loadsOfNumbers.splice(indexGuessEasy, 1)
        guessLoc = document.getElementById(compGuessLEasy)
        guessClass = guessLoc.className
      }
    } else { // advancing guessing tree
      if (hunting){ // if hunting is true, the last guess was a hit, and we will hunt until we destroy the ship hit
        lessNumbers.splice(indexHunting, 1)
        guessLoc = document.getElementById(huntingId)
        guessClass = guessLoc.className
        console.log('running search and destroy advanced')
      } else { // procure a new advanced guess and eliminate it from the remaining guesses
        lessNumbers.splice(indexGuessAdv, 1)
        guessLoc = document.getElementById(compGuessLAdv)
        guessClass = guessLoc.className
      }

    }

    // PROCESSING THE GUESS SECTION (AS A HIT OR MISS OR A HIT THAT DESTROYS A SHIP)

    if (guessLoc.style.backgroundColor != 'red' && playerClasses.includes(guessClass) ){
        let damagedShip = playersShips[playerClasses.indexOf(guessClass)]
        damagedShip.damage++
        scoreP -= 100
        guessLoc.style.backgroundColor = 'red'
        if(difficultyLevel === 'medium' || difficultyLevel === 'hard'){
          if (hunting === false){
            console.log(guessLoc.id, 'should be the id of the guessed square')
            hitLocation = guessLoc.id
            console.log(hitLocation, 'should be the the same id stored in the hitLocation variable')
            console.log('hunting triggered!')
            hunting = true
          }
        
          searchAndDestroy(hunting, 'hit')
        }

        if(damagedShip.damage === damagedShip.hitPoints){
          console.log(`They destroyed our ${guessClass.slice(0,-1)} Admiral!`)
          scoreP -= 100
          damagedShip.destroyed = true
          //when a ship is destroyed: these changes allow the appropriate level of difficulty random guessing to occur again
          hunting = false // the hunting flag should be turned off
          hitLocation = '' //the hit location (original hit) should be wiped
          searchAndDestroy(hunting, 'clear') // and this may not be necessary, but should clear out the search and destroy for a new target
          destroyedShipsP.push(guessClass)
          if (destroyedShipsP.length === 5){
            console.log("They have destroyed our fleet! The day is lost! Your score: "+ scoreP)
            winner = 'computer'
          }
        } else {
          if (damagedShip.damage === (damagedShip.lengthS-1)){
            warning = " It is critically damaged!"
          }
          console.log(`They hit our ${guessClass.slice(0,-1)} Admiral!${warning}`)
        }
    } else if (guessLoc.style.backgroundColor === ''){
      console.log('They missed us Admiral!')
      searchAndDestroy('miss')
      guessLoc.style.backgroundColor = 'grey'
    }
  }

  // if (confirm("Confirm Firing Coordinates. Choose wisely, they will return fire.")){}

  function playerGuess(event) {
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
        damagedShip.destroyed = true
        if (destroyedShipsC.length === 5){
          console.log(`We have destroyed their fleet! Victory is ours! Your score: ${scoreP}`)
          winner = 'player'
        } else {
          computerGuess()
          computerGuess()
          computerGuess()
          computerGuess()
        }
      } else {
        console.log(`We hit their ${guessClass.slice(0,-1)} Admiral! Excellent shot!`)
        computerGuess()
        computerGuess()
        computerGuess()
        computerGuess()
      }
    } else if (eT.style.backgroundColor === 'red'){
      console.log('We already hit here. Choose new coordinates Admiral...')
    } else if (eT.style.backgroundColor === ''){
      console.log('We missed Admiral!')
      eT.style.backgroundColor = 'grey'
      computerGuess()
      computerGuess()
      computerGuess()
      computerGuess()
    } else if (eT.style.backgroundColor === 'grey'){
      console.log('We already missed here. Choose new coordinates Admiral...')
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

      allShips.forEach(ship => {
        if (ship.classS.split('').includes('P')){
          rndmInitializeShip(ship,'P')
          placeShip(ship, 'P')
        } else{
          rndmInitializeShip(ship,'')
          placeShip(ship, '')
        }
        })
      
    } else {
      console.log('choose a difficulty level first')
    }
  }

  function fakeQuit(){
    location.reload()
  }

  // ~~~~~   GAME PLAY SECTION END   ~~~~~~

  // ~~~~~   EVENT LISTENERS   ~~~~~~

  shipSelector.addEventListener('click', rotateSelection)
  rotateB.addEventListener('click', rotateButton)
  startB.addEventListener('click', startButton)
  computerBoxes.forEach(bx => bx.addEventListener('click', playerGuess))
  difficultyLevels.forEach(btn => btn.addEventListener('click', setDifficulty))
  fightB.addEventListener('click', fightButton)
  quitB.addEventListener('click', fakeQuit)

  // ~~~~~   FINAL INITIALIZAIONS FOR TESTING STAGES    ~~~~~~





}

window.addEventListener('DOMContentLoaded', init)
