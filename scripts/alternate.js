// ? Constant variables
const invaders = {
    gold: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    purple: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    green: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    brown: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
    black: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]
}

Object.keys(invaders)

const player = {
    weapon: 'swat',
    playerCurrPos: 297,
    lives: 3,
    score: 0
}

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
        }
    }
}


// ? State changing variables
let lives
let score
let playerCurrPos = 297
let invaderRow
let invaderCol


// ? Cached elements
// - start game button
const startBtn = document.getElementById('start')
// - pause/resume button
//   - const pauseBtn = document.getElementById('pause')
// - play again button
//   - const playAgainBtn = document.getElementById('play-again')
// ~ mute button
//   ~ mute audio when audio is playing
//   ~ when audio is muted it can be unmuted
//   ~ const muteBtn = document.getElementById('mute')
const scoreEl = document.getElementById('score')
const livesEl = document.getElementById('lives-display')
const startScreen = document.querySelector('.start-container')
const gameStartScreen = document.querySelector('.game-container')


// ? Event listners
document.addEventListener('keydown', playerMove)
document.addEventListener('keyup', playerShoot)
startBtn.addEventListener('click', init)
// pauseBtn.addEventListener('click', pause)
// playAgainBtn.addEventListener('click', init)
// ~ muteBtn.addEventListener('click', soundOff)


// ? Functions
init()

function init() {
    // console.log(evt.target, 'start clicked')
    // if (gameStartScreen.style.display === 'none') {
    //     startScreen.style.display = 'none'
    //     gameStartScreen.style.display = 'flex'
    // }
    makeGrid()
    // delay for 2000ms then start game
    resetGame()
    // invadersMove()

}

function pause() {

}

function soundOff() {

}

function resetGame() {
    
    setInvaders()

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
    } else {
        console.log("Not Allowed")
    }
    // console.log(playerCurrPos)
    blks[playerCurrPos].classList.add('player')
}

function invadersMove() {
    let sideMove = 1
    let downMove = cols

    let interval = setInterval(() => {
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

        //check for 


        // add classes back in
        setInvaders()
    }, 900)

    //clearInterval when row above player reached and also loose all lives
}

function setInvaders() {
    //set start position for invaders
    //added different invader types for each row
    invadersCurrPos.forEach(colArr => {
        if (invadersCurrPos.indexOf(colArr) === 4) {
            colArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'black')
            })
        } else if (invadersCurrPos.indexOf(colArr) === 3) {
            colArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'brown')
            })
        } else if (invadersCurrPos.indexOf(colArr) === 2) {
            colArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'green')
            })
        } else if (invadersCurrPos.indexOf(colArr) === 1) {
            colArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'purple')
            })
        } else if (invadersCurrPos.indexOf(colArr) === 0) {
            colArr.forEach(blkValue => {
                blks[blkValue].classList.add('invader', 'gold')
            })
        }
    })
}