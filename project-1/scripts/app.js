function init() {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // NOTES FOR MYSELF

  // THURSDAY:
  // 2. change hits and misses to add classes of hit and miss for assets and for detection
  // 3. draggable ships?
  // 5. turn all console logs into alerts/confirms
  // 6. reveal ships when they are destroyed for both teams 
  // 7. Game Ending programming (quit resets this and normal states without reloading whole page?)
  // 8. Assets -> ship visuals, water, styling, explosion on hit, ship destroyed, miss splash etc
  // 9. Add sound effects, add music, add a mute button for effects and a mute for sound
  // 10. add coordinates around edges of computer board, confirm target selection with letter and a number

  // IF TIME REMAINS:
  // X. Commenting for intelligibility
  // Y. Code Dryness / Refactoring
  // Z. 2nd ship hit intelligence
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // ~~~~~~~~~~~~    CODING BEGINS HERE   ~~~~~~~~~~~~~~~~
  
  // BASIC GLOBAL GAME CONDITION VARIABLES
  let scoreP = 0
  let difficultyLevel = ''
  let winner = ''

  // HTML ELEMENT REFERENCES
  const startB = document.getElementById('start')
  const rotateB = document.getElementById('rotate')
  const gridSel = document.querySelector('.gridP')
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
  let guessedNumbers = []

  // INITIALIZE BUTTONS AS DISABLED UNTIL GAME STARTED
  rotateB.disabled = true
  shipSelector.disabled = true
  fightB.disabled = true
  quitB.disabled = true
  startB.disabled = true

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

// *** HERE IS THE PROBLEM I'M WORKING ON
const  newExplosion = document.createElement('img')
// newExplosion.src = '../Assets/hit1.png'
// document.getElementById('gridP04').appendChild(newExplosion)


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
      // let imgShip = ''
      // imgShip.src =  '../Assets/carrier-horizontal.png'
      // document.getElementById(ship.startLocation).appendChild(imgShip.src)
      for (let i = 0; i < ship.lengthS;i++){
        document.getElementById(`grid${letter}${parseShipL(ship, i*10)}`).classList.add(ship.classS)

      }
    } else {
      // let imgShip = ''
      // imgShip.src =  '../Assets/carrier-vertical.png'
      // document.getElementById(ship.startLocation).appendChild(imgShip.src)
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

    // *** need to change player and computer guessing to change targets class to hit or miss ***

  // *** implement this only if I have finised my other styling work ***
  //    vii. NEEDS ONE MORE REFACTOR RE-HITS A 2ND SHIP WHILE HITTING THE FIRST SHIP
  //        aka, remember if you hit a 2nd ship, and if you destroy a ship, feed right back into destroying
  //        secondary ship you hit. Should be implemented after ship destruction (feedback new start location)
  //        if (2nd ship hit === true)  last hit location = 2ndshipLocation, run search and destroy (false/'hit')
  // if you hit a ship store the class in a variable that resets on destroy, or next hit
  // if you get a next hit and the classes don't match, load 2nd classes cooridinates into 2nd ship Location
  // and toggle 2nd ship hit == true

  // SEARCH AND DESTROY GLOBAL CONSTANTS --- FEED INTO SEARCH AND DESTROY AND INTO COMPUTER GUESS
  let hunting = false
  let lastHitLocation = ''
  let originalHitLocation = ''
  let huntingGuess = ''
  let huntingLocations = []
  let hitStreak = 1
  let cGuesses = 0
  let comeBack = []
  let oriPair1= []
  let lastPair2= []

  function isIsolated(compGuessLAdv){
    // this should RETURN TRUE if NSEW are all full of a guess/hit or off the edge
    
    let edgesS = 0
    let cgNum = Number(compGuessLAdv.slice(-2))
    
    let neverS = 'gridP' + doubleDigits(cgNum-10)
    let eatS = 'gridP' + doubleDigits(cgNum+1)
    let shreddedS = 'gridP' + doubleDigits(cgNum+10)
    let wheatS = 'gridP' + doubleDigits(cgNum-1)   
    
    let guessElemN = document.getElementById(neverS)
    let guessElemS = document.getElementById(shreddedS)
    let guessElemE = document.getElementById(eatS)
    let guessElemW = document.getElementById(wheatS)

    if( Math.floor(cgNum/10) === 0 || guessElemN.style.backgroundColor === 'grey'){ // has and EDGE NORTH OR hit/miss NORTH
      edgesS++
    }
    if( Math.floor(cgNum/10) === 9 || guessElemS.style.backgroundColor === 'grey'){ // has and EDGE SOUTH OR hit/miss SOUTH
      edgesS++
    }
    if(Math.floor(cgNum+1)%10 === 0 || guessElemE.style.backgroundColor === 'grey'){ // has and EDGE EAST OR hit/miss EAST
      edgesS++
    }
    if(Math.floor(cgNum-1)%10 === 9 || cgNum === 0 || guessElemW.style.backgroundColor === 'grey'){ // has and EDGE WEST OR hit/miss WEST
      edgesS++
    }
    
    if (edgesS === 4){
      return true
    } else {
      return false
    }
  }

  function searchAndDestroy(hunting, guessStatus){
    // console.log(hunting, 'hunting', guessStatus, 'guess status', 'these are the variables passed in when S&D was run')

    if (hunting === true && guessStatus === 'hit'){
      lastPair2 = [ document.getElementById(lastHitLocation).className, lastHitLocation]
      console.log(lastPair2, 'last Pair2 assigned here')
      hitStreak++
    }

    // *** TWO SHIPS HIT AI ***
    // so, if I initially hit while not hunting, then hit again while hunting,
    // they should both be stored as two items in an array, first is class second is location
    // the classes will be identical if you're hitting the same ship, nothing happens
    // if they're differen't classes, two different ships, when you destroy a ship,
    // you'll come back to the first one you hit and try to finish it off
    if (oriPair1.length === 2 && lastPair2.length === 2 && oriPair1[0] != lastPair2[0]){
      console.log((oriPair1[0] != lastPair2[0]), oriPair1, lastPair2, 'comparison of the two pairs')
      comeBack = oriPair1
      console.log(comeBack, 'comeBack')
    }
    // CODE THAT ACTUALLY DOES WORK
    let hitNumber = Number(lastHitLocation.slice(-2))
    let oriNumber = Number(originalHitLocation.slice(-2))
    let northArray1 = []
    let southArray1 = []
    let eastArray1 = []
    let westArray1 = []
    
    if(hitNumber < oriNumber){
      for (let i=0;i<Math.floor((hitNumber/10));i++){ // north 2nd hit is more north
        if (i<3){
        northArray1.push('VgridP' + doubleDigits(hitNumber-10-(i*10)))
        }
      }
    } else {
      for (let i=0;i<Math.floor((oriNumber/10));i++){ // north original hit is more north
        if (i<3){
        northArray1.push('VgridP' + doubleDigits(oriNumber-10-(i*10)))
        }
      }
    }
    if(oriNumber < hitNumber){
      for (let i=0;i<Math.floor(((100-hitNumber)/10));i++){ // south if 2nd hit is more south
        if (i<3){
          southArray1.push('VgridP' + doubleDigits(hitNumber+10+(i*10)))
        }
      }
    } else {
      for (let i=0;i<Math.floor(((100-oriNumber)/10));i++){ // south if original guess is more south
        if (i<3){
          southArray1.push('VgridP' + doubleDigits(oriNumber+10+(i*10)))
        }
      }
    }
    if(hitNumber > oriNumber){ 
      for (let i=0;i<9-(Number(lastHitLocation.slice(-1)));i++){ // east if 2nd hit is more east
        if (i<3){
          eastArray1.push('HgridP' + doubleDigits(hitNumber+1+i))
        }
      }
    } else {
      for (let i=0;i<9-(Number(originalHitLocation.slice(-1)));i++){ // east if original hit is more east
        if (i<3){
          eastArray1.push('HgridP' + doubleDigits(oriNumber+1+i))
        }
      }
    }
    if(hitNumber < oriNumber){
      for (let i=0;i<(Number(lastHitLocation.slice(-1)));i++){ // west if 2nd hit is more west
        if (i<3){
          westArray1.push('HgridP' + doubleDigits(hitNumber-1-i))
        }
      }
    } else {
      for (let i=0;i<(Number(originalHitLocation.slice(-1))-1);i++){ // west if original hit is more west
        if (i<3){
          westArray1.push('HgridP' + doubleDigits(oriNumber-1-i))
        }
      }
    }

    let northArray2 = northArray1.reverse()
    let southArray2 = southArray1.reverse()
    let eastArray2 = eastArray1.reverse()
    let westArray2 = westArray1.reverse()
    let never = 'V' + 'gridP' + doubleDigits(hitNumber-10)
    let eat = 'H'+'gridP' + doubleDigits(hitNumber+1)
    let shredded = 'V'+'gridP' + doubleDigits(hitNumber+10)
    let wheat = 'H'+'gridP' + doubleDigits(hitNumber-1)    
    let allFour = [northArray2, southArray2, eastArray2, westArray2]

    if (hunting === false && guessStatus === 'hit'){
      
      oriPair1 = [ document.getElementById(lastHitLocation).className, lastHitLocation]
      console.log(oriPair1, 'oriPair1 assigned here within first if clause')
      
      if ( getRandomInt(2) === 1){
        if(Number(lastHitLocation.slice(-1))> 0){
          huntingLocations.push(wheat)
        }
        if(Number(lastHitLocation.slice(-1))< 9){
          huntingLocations.push(eat)
        }
        if (Math.floor(hitNumber/10) < 9){
          huntingLocations.push(shredded)
        }
        if (Math.floor(hitNumber/10) > 0){
          huntingLocations.push(never)
        }
      } else {
        if (Math.floor(hitNumber/10) < 9){
          huntingLocations.push(shredded)
        }
        if (Math.floor(hitNumber/10) > 0){
          huntingLocations.push(never)
        }
        if(Number(lastHitLocation.slice(-1))> 0){
          huntingLocations.push(wheat)
        }
        if(Number(lastHitLocation.slice(-1))< 9){
          huntingLocations.push(eat)
        }

      }

      huntingLocationsFiltered = huntingLocations.filter(loc => !guessedNumbers.includes(Number(loc.slice(-2))))
      huntingLocations = huntingLocationsFiltered

      if (huntingLocations.length > 0){
        huntingGuess = huntingLocations.pop()
      } else {
        let randomHuntingGuess = doubleDigits(lessNumbers[getRandomInt(lessNumbers.length)])
        huntingGuess = 'VgridP' + randomHuntingGuess
      }

    } else if (hunting === true && guessStatus === 'hit' && hitStreak === 2){ // this is for a hit, after a hit, but only 2 in a row
      let numRel = Number(lastHitLocation.slice(-2)) - Number(originalHitLocation.slice(-2))
      if (oriPair1[0] != lastPair2[0]){
        if(Math.abs(numRel)=== 10){
          numRel = 1
        } else {
          numRel = 10
        }
      }
      if (Math.abs(numRel)=== 10){ // VERTICAL GENERATION
        if (numRel === 10) { // check south first
          huntingLocations = northArray2.concat(southArray2)
          // console.log(southArray2, 'checking south first', huntingLocations, 'should be a large array of potential targets only vertical')
        } else { // check north first
          huntingLocations = southArray2.concat(northArray2)
          // console.log(northArray2, 'checking north first', huntingLocations, 'should be a large array of potential targets only vertical')
        }
      } else { // HORIZONTAL GENERATION
        if (numRel === 1) { // check east first
          // console.log(westArray2, 'checking this as there may be a problem here')
          huntingLocations = westArray2.concat(eastArray2)
          // console.log(eastArray2, 'checking east first', huntingLocations, 'should be a large array of potential targets only horizontal')
        } else { // check west first
          huntingLocations = eastArray2.concat(westArray2)
          // console.log(westArray2, 'checking west first', huntingLocations, 'should be a large array of potential targets only horizontal')
        }
      }

      huntingLocationsFiltered = huntingLocations.filter(loc => !guessedNumbers.includes(Number(loc.slice(-2))))
      huntingLocations = huntingLocationsFiltered
      
      if (huntingLocations.length > 0){
        huntingGuess = huntingLocations.pop()
        // console.log(huntingGuess, 'hunting guess after array construction')
      } else {
        let randomHuntingGuess = doubleDigits(lessNumbers[getRandomInt(lessNumbers.length)])
        huntingGuess = 'VgridP' + randomHuntingGuess
      }

    } else if (hunting === true && guessStatus === 'hit' && hitStreak > 2){

      huntingLocationsFiltered = huntingLocations.filter(loc => !guessedNumbers.includes(Number(loc.slice(-2))))
      huntingLocations = huntingLocationsFiltered

      if (huntingLocations.length > 0){
        huntingGuess = huntingLocations.pop()
        console.log(huntingGuess, 'hunting guess after array construction')
      } else {
        let randomHuntingGuess = doubleDigits(lessNumbers[getRandomInt(lessNumbers.length)])
        huntingGuess = 'VgridP' + randomHuntingGuess
      }

    } else if (hunting === true && guessStatus === 'miss' && hitStreak === 2){
      //here assumption is I've made the horizontal or vertical array,
      // I've hit twice after no streak -> which triggers building of that array
      // now I want to filter out of hunting locations what is in eastArray2 if I missed in east array direction etc
      let huntingMissFilt = []
      // console.log(huntingLocations, ' this is what I will be cleaning')
      // console.log(huntingGuess, lastHitLocation, ' this is the current guess')

      for (let i = 0; i<allFour.length;i++){
        if (allFour[i].includes(huntingGuess)){
          huntingMissFilt = huntingLocations.filter(loc=> !allFour[i].includes(loc))
        }
      }
      huntingLocations = huntingMissFilt
      // console.log(huntingLocations, 'hunting locations filtered after 2 hits and a miss, ditching the further out misses')
      huntingLocationsFiltered = huntingLocations.filter(loc => !guessedNumbers.includes(Number(loc.slice(-2))))
      huntingLocations = huntingLocationsFiltered

      hitStreak = 1
      // FILTER BEFORE GUESS THEN HANDLE GUESS BASED ON IF THERE ARE REMAINING ITEMS OR NOT, THEN GUESS FED BACK INTO COMPUTER GUESS FUNCTION
      huntingLocationsFiltered = huntingLocations.filter(loc => !guessedNumbers.includes(Number(loc.slice(-2))))
      huntingLocations = huntingLocationsFiltered
      if (huntingLocations.length > 0){
        huntingGuess = huntingLocations.pop()
        console.log(huntingGuess, 'hunting guess after array construction')
      } else {
        let randomHuntingGuess = doubleDigits(lessNumbers[getRandomInt(lessNumbers.length)])
        huntingGuess = 'VgridP' + randomHuntingGuess
      }


    } else if (hunting === true && guessStatus === 'miss'){

      hitStreak = 1
       // FILTER BEFORE GUESS THEN HANDLE GUESS BASED ON IF THERE ARE REMAINING ITEMS OR NOT, THEN GUESS FED BACK INTO COMPUTER GUESS FUNCTION
      huntingLocationsFiltered = huntingLocations.filter(loc => !guessedNumbers.includes(Number(loc.slice(-2))))
      huntingLocations = huntingLocationsFiltered
      if (huntingLocations.length > 0){
        huntingGuess = huntingLocations.pop()
      } else {
        let randomHuntingGuess = doubleDigits(lessNumbers[getRandomInt(lessNumbers.length)])
        huntingGuess = 'VgridP' + randomHuntingGuess
      }

    }

    if (hunting === false){
      originalHitLocation = lastHitLocation
    }
  }

  function computerGuess(){
    // A FEW INITIALIZATIONS
    cGuesses++
    let guessLoc = ''
    let guessClass = ''
    let warning = ''
    let loopBreaker = 0
    if (lessNumbers.length === 0){
      lessNumbers = backUpNumbers
    }

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
    let huntingId = huntingGuess.slice(1)

    // ~~~~~~~~   SELECTION OF INITIAL GUESS BASED ON DIFFICULTY   ~~~~~~~~
    if (difficultyLevel === 'easy' || difficultyLevel === 'medium'){ // easy guess tree
      if (hunting){ // if hunting is true, the last guess was a hit, and we will hunt until we destroy the ship hit
        lessNumbers.splice(indexHunting, 1)
        guessLoc = document.getElementById(huntingId)
        guessClass = guessLoc.className
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
      } else { // procure a new advanced guess, whether initial, or secondary after isolation determined
        // While loops are scary, but! don't want to select any isolated squares ever. Waste of time for the AI. 
        loopBreaker = 0
        //isIsolated(compGuessLAdv) === true
        if (isIsolated(compGuessLAdv)) { // back up advanced guess if first one generated was isolated
          while ((loopBreaker < 5) && isIsolated(compGuessLAdv)){
          // if the guess is isolated, roll another new random number off remaining numbers
          // then also removed the isolated number, and produce new guess variables for
          console.log('SO THIS WAS SKIPPED', guessLoc)
          numGuessAdv = doubleDigits(lessNumbers[getRandomInt(lessNumbers.length)])
          indexGuessAdv = lessNumbers.indexOf(Number(numGuessAdv))
          compGuessLAdv = 'gridP' + numGuessAdv
          lessNumbers.splice(indexGuessAdv, 1)
          guessLoc = document.getElementById(compGuessLAdv)
          guessClass = guessLoc.className
          loopBreaker++
          }
        } else{ // first advanced random guess is NOT isolated - should be standard on hard difficulty
          lessNumbers.splice(indexGuessAdv, 1)
          guessLoc = document.getElementById(compGuessLAdv)
          guessClass = guessLoc.className
        }

      }
    }

    // PROCESSING THE GUESS SECTION (AS A HIT OR MISS OR A HIT THAT DESTROYS A SHIP)
    guessedNumbers.push(Number(guessLoc.id.slice(-2))) // ESSENTIAL FOR TRACKING GUESSES FOR FILTERING HUNTING LOCATION ARRAYS
    if (guessLoc.style.backgroundColor != 'red' && playerClasses.includes(guessClass) ){ // IF A COMPUTER'S GUESS HITS A SHIP
        let damagedShip = playersShips[playerClasses.indexOf(guessClass)]
        damagedShip.damage++
        scoreP -= 100
        guessLoc.style.backgroundColor = 'red'
        lastHitLocation = guessLoc.id
        console.log('they hit our ' + guessClass + ' at ' + guessLoc.id)
        if(difficultyLevel === 'medium' || difficultyLevel === 'hard'){
          searchAndDestroy(hunting, 'hit')
          if (hunting === false){
            console.log('hunting triggered! ' + guessLoc.id)
            hunting = true
          }
          
        }

        if(damagedShip.damage === damagedShip.hitPoints){ // IF A SHIP IS TOTALLY DESTROYED BY A HIT
          console.log(`They destroyed our ${guessClass.slice(0,-1)} Admiral!`)
          scoreP -= 100
          damagedShip.destroyed = true
          destroyedShipsP.push(guessClass)
          // THIS ENDS THE GAME
          if (destroyedShipsP.length === 5){
            console.log("They have destroyed our fleet! The day is lost! Your score: "+ scoreP + " THE COMPUTER TOOK " + cGuesses + " TO WIN.")
            winner = 'computer'
          }

          // add a destroyed class here to the squares of the ship, so that CSS can display ship (change opacity) and maybe desroyed ship image loaded
          //A DESTROYED SHIP ENDS HUNTING AND RE-INITIALIZES IT
          if(difficultyLevel === 'medium' || difficultyLevel === 'hard'){
            hunting = false // the hunting flag should be turned off
            lastHitLocation = '' //the hit location (original hit) should be wiped
            originalHitLocation = ''
            huntingLocations = []
            hitStreak = 1
          }
          
          // *** COMEBACK TWO SHIP CODE
          if (comeBack.length > 0){
            console.log('COMEBACK TO ME CODE RAN HERE')
            lastHitLocation = comeBack[1]
            console.log(lastHitLocation, 'last hit', comeBack[1], 'comeback item one(not item zero)')
            searchAndDestroy(false, 'hit')
            comeBack = []
          }


        } else { // IF A SHIP IS JUST DAMAGED BY A SHIP
          if (damagedShip.damage === (damagedShip.lengthS-1)){
            warning = " It is critically damaged!"
          }
          console.log(`They hit our ${guessClass.slice(0,-1)} Admiral!${warning}`)
        }
    } else if (guessLoc.style.backgroundColor === ''){ // IF A COMPUTER'S GUESS MISSES A SHIP
      console.log('They missed us Admiral!' + guessLoc.id)
      if(hunting === true && (difficultyLevel === 'medium' || difficultyLevel === 'hard')){
        console.log('after a couple hits and a miss does this run?')
        searchAndDestroy(hunting, 'miss')
      }
      guessLoc.style.backgroundColor = 'grey'
    }
  }

  // if (confirm("Confirm Firing Coordinates. Choose wisely, they will return fire.")){} IMPLEMENT ONLY AFTER I'M DONE TWEAKING GAMEPLAY
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
          // computerGuess()
          // computerGuess()
          // computerGuess()
          // computerGuess()
          // computerGuess()
        }
      } else {
        console.log(`We hit their ${guessClass.slice(0,-1)} Admiral! Excellent shot!`)
        computerGuess()
        computerGuess()
        computerGuess()
        // computerGuess()
        // computerGuess()
        // computerGuess()
        // computerGuess()
        // computerGuess()
      }
    } else if (eT.style.backgroundColor === 'red'){
      console.log('We already hit here. Choose new coordinates Admiral...')
    } else if (eT.style.backgroundColor === ''){
      console.log('We missed Admiral!')
      eT.style.backgroundColor = 'grey'
      computerGuess()
      computerGuess()
      computerGuess()
      // computerGuess()
      // computerGuess()
      // computerGuess()
      // computerGuess()
      // computerGuess()
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
      document.getElementById('hard').style.color = 'green'
      document.getElementById('easy').disabled = true
      document.getElementById('medium').disabled = true
    } else if (event.target.id === 'medium'){
      document.getElementById('medium').style.color = 'green'
      document.getElementById('easy').disabled = true
      document.getElementById('hard').disabled = true      
    } else {
      document.getElementById('easy').style.color = 'green'
      document.getElementById('medium').disabled = true
      document.getElementById('hard').disabled = true
    }
    startB.disabled = false
  }
  
  function startButton(){
    if (difficultyLevel.length > 0){
      startB.disabled = true
      rotateB.disabled = false
      shipSelector.disabled = false
      fightB.disabled = false
      gridSel.style.display = 'flex'
      difficultyLevels.forEach(btn=> btn.disabled=true)
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
