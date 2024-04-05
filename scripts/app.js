// ? Planning
// - 5 rows of invaders move right to left and down one row after reaching both sides of the screen
// - Top row of invaders shoot lasers at player
// - Player can move right/left and space to shoot invaders with laser
// - Invaders explode upon impact with player's laser
// - Player has 3 lives and loses a life when invaders' lasers collide with player
// - When player loses all lives or invaders reaches row (row 10) where player is in the game is over
// - Optional
//   - Big invader passes through at the top row which gives players bonus points when destroyed
//   - Movement of invaders increases with each new row
//   - Shields that take 10 hits from invader or player lasers
//   - Highscore board usins localStorage


// ? Constant variables
const grid = document.querySelector('.game-grid')
const startPos = 297

// ? Generate game grid
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

// makeGrid()

// ? State changing variables
let lives
let score
let playerCurrPos = 297 //blks.indexOf(document.querySelector('.player')) //if this comes before makeGrid() player class doesn't exist yet
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

// - player state
//   - if (lives === 0 || invaders are in the same row as player) {
//     }

// - laser from invader
//   - laser is generated only by invaders at the top row at random setInterval()
//   - travels down column it was generated in 
//   - if (blks with .invader-laser && .player === true) {
//          - element.classList.add('explosion')  // css background-image: explosion
//          - element.classList.remove('invader-laser player')
//          - player lose one life (lives--)
//     }

//          - pause interval of invaders moving
//          - check if (lives === 0)
//          - resume interval of invaders moving
//          - element.classList.add('player')  // to resume game 
//     }

// ~ setInterval time decrement
//   ~ for (invaders row change === true) {
//          ~ interval++
//   ~ }

// ~ leaderboard
//   ~ leaderboard using localStorage


// ? Cached elements
const startBtn = document.getElementById('start')
// - pause/resume button
//   - const pauseBtn = document.getElementById('pause')
// - play again button
// const playAgainBtn = document.getElementById('play-again')
// ~ mute button
//   ~ mute audio when audio is playing
//   ~ when audio is muted it can be unmuted
//   ~ const muteBtn = document.getElementById('mute')
const scoreEl = document.getElementById('score')
const livesEl = document.getElementById('lives-display')
const startScreen = document.querySelector('.start-container')
const gameStartScreen = document.querySelector('.game-container')
const endScreen = document.querySelector('.end-container')
const invaderColors = ['black', 'brown', 'green', 'purple', 'gold']
const result = document.querySelector('.end-result')



// ? Event listners
startBtn.addEventListener('click', init)
document.addEventListener('keydown', playerMove)
document.addEventListener('keyup', playerShoot)
// pauseBtn.addEventListener('click', pause)
// playAgainBtn.addEventListener('click', init)
// ~ muteBtn.addEventListener('click', soundOff)



// ? Functions

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
        invadersShoot()

    }, 2000)
    checkInvadersPresent()
    gameEnd()
}


function resetGame() {
    setInvaders()
    //reset score and lives to game start
    score = 0
    scoreEl.innerHTML = score
    lives = 3
    livesEl.innerHTML = '❤️'.repeat(lives)
}


function invadersMove() {
    let sideMove = 1
    let downMove = cols

    interval = setInterval(() => {
        // returns true when remainder is 16 (stop point)
        let noMoveRight = invadersCurrPos.some(rowArr => {
            return rowArr.some(invaderIdx => {
                return invaderIdx % cols === cols - 1
            })
        })

        // returns true when remainder is 0 (stop point)
        let noMoveLeft = invadersCurrPos.some(rowArr => {
            return rowArr.some(invaderIdx => {
                return invaderIdx % cols === 0
            })
        })

        //remove classes from existing position
        invadersCurrPos.forEach(rowArr => {
            rowArr.forEach(blkValue => {
                blks[blkValue].classList.remove(...invaderColors)
            })
        })

        //update all invadersCurrPos e.g. ++/-- need index
        invadersCurrPos.forEach((rowArr, index) => {
            rowArr.forEach((blkValue, idx) => {
                invaderRow = index
                invaderCol = invadersCurrPos[index].indexOf(blkValue)
                if (noMoveRight === true) {
                    sideMove = -1
                    invadersCurrPos[index][idx] += downMove
                    // invadersCurrPos[index][idx] += sideMove
                } else if (noMoveLeft === true) {
                    sideMove = 1
                    invadersCurrPos[index][idx] += downMove
                }
                invadersCurrPos[index][idx] += sideMove
                console.log(invadersCurrPos[index], invadersCurrPos[idx])
            })
        })
        // console.log(invaderRow, invaderCol)

        //check for 


        // add classes back in
        setInvaders()

    }, 900)

    //clearInterval when row above player reached and also loose all lives
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

function playerShoot(evt) {
    // console.log(evt.code)
    let shootOrigin = playerCurrPos - cols

    // console.log(shootOrigin)
    if (evt.code === 'Space') {
        blks[shootOrigin].classList.add('swat')
        interval = setInterval(() => {
            blks[shootOrigin]?.classList.remove('swat')
            // const swatNum = document.querySelectorAll('.swat')
            if (shootOrigin > cols - 1) {
                shootOrigin -= cols
                blks[shootOrigin].classList.add('swat')
                if (blks[shootOrigin].classList.contains('black')) {
                    score += 100
                    scoreEl.innerHTML = score
                    blks[shootOrigin].classList.remove('black', 'swat')
                    clearInterval(interval)
                    blks[shootOrigin].classList.add('dead-fly')
                } else if (blks[shootOrigin].classList.contains('brown')) {
                    score += 200
                    scoreEl.innerHTML = score
                    blks[shootOrigin].classList.remove('brown', 'swat')
                    clearInterval(interval)
                    blks[shootOrigin].classList.add('dead-fly')

                } else if (blks[shootOrigin].classList.contains('green')) {
                    score += 300
                    scoreEl.innerHTML = score
                    blks[shootOrigin].classList.remove('green', 'swat')
                    clearInterval(interval)
                    blks[shootOrigin].classList.add('dead-fly')

                } else if (blks[shootOrigin].classList.contains('purple')) {
                    score += 500
                    scoreEl.innerHTML = score
                    blks[shootOrigin].classList.remove('purple', 'swat')
                    clearInterval(interval)
                    blks[shootOrigin].classList.add('dead-fly')

                } else if (blks[shootOrigin].classList.contains('gold')) {
                    score += 1000
                    scoreEl.innerHTML = score
                    blks[shootOrigin].classList.remove('gold', 'swat')
                    clearInterval(interval)
                    blks[shootOrigin].classList.add('dead-fly')
                }

                setTimeout(() => {
                    blks[shootOrigin].classList.remove('dead-fly')
                }, 85)
                // } else if (swatNum.length > 5) {
                //     console.log('enough')
            } else {
                clearInterval(interval)
            }
        }, 100)
    }
}

function checkInvadersPresent() {
    let haveInvader = blks.some(blk => {
        return blk.classList.contains('black') ||
        blk.classList.contains('brown') ||
        blk.classList.contains('green') ||
        blk.classList.contains('purple') ||
        blk.classList.contains('gold') === true
    })
    
    if (haveInvader !== false) {
        clearInterval(interval)
        gameStartScreen,style.display = 'none'
        endScreen.style.display = 'flex'
        result.innerHTML = 'You defeated the fly legion!'
    }
}

// lose life
// - check if .player and .goo class in the same block
// - if present lives--
// - update lives

function gameEnd() {
    if (lives === 0 ) {
        clearInterval(interval)
        gameStartScreen,style.display = 'none'
        endScreen.style.display = 'flex'
        result.innerHTML = 'Mourn for the loss of your cake.'
    }
}





function pause() {

}

function soundOff() {

}