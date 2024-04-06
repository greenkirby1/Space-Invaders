// * Constant variables
const grid = document.querySelector('.game-grid')
const startPos = 297

// * Generate game grid
const cols = 17
const rows = 18
const blkCount = cols * rows

const blks = []

function makeGrid() {
    for (let i = 0; i < blkCount; i++) {
        const blk = document.createElement('div')
        blk.innerText = i
        blk.style.width = `${100 / cols}%`
        blk.style.height = `${100 / rows}%`
        blks.push(blk)
        blks.forEach((blk) => {
            const blkId = `${blks.indexOf(blk)}`
            return blk.dataset.id = blkId
        })
        grid.append(blk)
        // console.log(blks)
        if (i === startPos) {
            blk.classList.add('player')
            // console.log(blks[297])
        }
    }
}

// * Changing variables
let lives
let score
let playerCurrPos = 297
let invadersCurrPos = [
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
    [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]
]
let invaderRow
let invaderCol
let interval

// * Cached elements
const startBtn = document.getElementById('start')
// - pause/resume button
//   - const pauseBtn = document.getElementById('pause')
const playAgainBtn = document.getElementById('play-again')
const scoreEl = document.getElementById('score')
const livesEl = document.getElementById('lives-display')
const startScreen = document.querySelector('.start-container')
const gameStartScreen = document.querySelector('.game-container')
const endScreen = document.querySelector('.end-container')
const invaderColors = ['black', 'brown', 'green', 'purple', 'gold']
const result = document.querySelector('.end-result')

// * Event listners
startBtn.addEventListener('click', init)
document.addEventListener('keydown', playerMove)
// document.addEventListener('keyup', playerShoot)
// pauseBtn.addEventListener('click', pause)
// playAgainBtn.addEventListener('click', init)

// * Functions
// Game start
function init(evt) {
    if (gameStartScreen.style.display === '') {
        gameStartScreen.style.display = 'flex'
        startScreen.style.display = 'none'
    }
    makeGrid()
    resetGame()
    invadersMove()
    // delay for 2000ms then start game
    interval = setInterval(() => {
        // invadersMove()
        // invadersShoot()
        
    }, 2000)
    // checkInvadersPresent()
    // gameEnd()
}

function resetGame() {
    // setInvaders()
    //reset score and lives to game start
    score = 0
    scoreEl.innerHTML = score
    lives = 3
    livesEl.innerHTML = '❤️'.repeat(lives)
}

function playerMove(evt) {
    blks[playerCurrPos].classList.remove('player')
    if (evt.code === 'ArrowLeft' && playerCurrPos !== 289) {
        playerCurrPos--
    } else if (evt.code === 'ArrowRight' && playerCurrPos !== 305) {
        playerCurrPos++
    }
    // console.log(playerCurrPos)
    blks[playerCurrPos].classList.add('player')
}

function invadersMove() {
    let sideMove = 1
    let downMove = cols

    interval = setInterval(() => {
        // returns true when remainder is 16 (stop point)
        let noMoveRight = invadersCurrPos.some(rowArr => rowArr.some(invaderIdx => invaderIdx % cols === cols - 1))

        // returns true when remainder is 0 (stop point)
        let noMoveLeft = invadersCurrPos.some(rowArr => rowArr.some(invaderIdx => invaderIdx % cols === 0))

        // returns true when invaderIdx > 289
        let noMoveDown = invadersCurrPos.some(rowArr => rowArr.some(invaderIdx => invaderIdx > blks.length - cols))

        //remove classes from existing position
        invadersCurrPos.forEach(rowArr => rowArr.forEach(blkValue => blks[blkValue].classList.remove(...invaderColors)))

        //update all invadersCurrPos
        invadersCurrPos.forEach((rowArr, index) => {
            rowArr.forEach((blkValue, idx) => {
                invaderRow = index
                invaderCol = invadersCurrPos[index].indexOf(blkValue)
                if (noMoveDown === true) {
                    console.log('no move down')
                    clearInterval(interval)
                    lives = 0
                    livesEl.innerHTML = ''
                    livesEl.classList.add('goo')
                    // invadersCurrPos[index][idx] += sideMove
                } else if (noMoveLeft === true) {
                    sideMove = 1
                    // invadersCurrPos[index][idx] += downMove
                } else if (noMoveRight === true) {
                    sideMove = -1
                    invadersCurrPos[index][idx] += downMove
                }
                invadersCurrPos[index][idx] += sideMove
                // console.log(invadersCurrPos[index], invadersCurrPos[idx])
            })
        })
        // console.log(invaderRow, invaderCol)

        //check for 


        // add classes back in
        setInvaders()

    }, 200)

    //clearInterval when row above player reached and also loose all lives
}

function setInvaders() {
    //set start position for invaders
    //added different invader types for each row
    invadersCurrPos.forEach(rowArr => {
        if (invadersCurrPos.indexOf(rowArr) === 4) {
            rowArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'black')
            })
        } else if (invadersCurrPos.indexOf(rowArr) === 3) {
            rowArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'brown')
            })
        } else if (invadersCurrPos.indexOf(rowArr) === 2) {
            rowArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'green')
            })
        } else if (invadersCurrPos.indexOf(rowArr) === 1) {
            rowArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'purple')
            })
        } else if (invadersCurrPos.indexOf(rowArr) === 0) {
            rowArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'gold')
            })
        }
    })
}

function invadersShoot() { // has to come after invadersMove() due to logging of new positions
    // Gets random index for invadersCurrPos variable
    currShootRow = Math.floor(Math.random() * invadersCurrPos.length)
    currShootCol = Math.floor(Math.random() * invadersCurrPos[0].length)

    // Only gets index with invaders present
    let shooterIdx = invadersCurrPos[currShootRow][currShootCol] + cols
    // console.log(shooterIdx, shooterIdx - cols)

    blks[shooterIdx].classList.add('goo-shoot')
    let interval = setInterval(() => {
        if (shooterIdx < playerCurrPos) {
        blks[shooterIdx].classList.remove('goo-shoot')
        shooterIdx += cols
        // console.log(shooterIdx)
        blks[shooterIdx].classList.add('goo-shoot')
        }
    }, 500)
    
}