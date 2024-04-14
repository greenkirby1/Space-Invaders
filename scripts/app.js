// ? Planning
//// - 5 rows of invaders move right to left and down one row after reaching both sides of the screen
//// - Top row of invaders shoot lasers at player
//// - Player can move right/left and space to shoot invaders with laser
//// - Invaders explode upon impact with player's laser
//// - Player has 3 lives and loses a life when invaders' lasers collide with player
//// - When player loses all lives or invaders reaches row (row 10) where player is in the game is over
// - Optional
//   - Big invader passes through at the top row which gives players bonus points when destroyed
//   - Movement of invaders increases with each new row
//   - Shields that take 10 hits from invader or player lasers
////   - Highscore board usins localStorage


// ? Constant variables
const gameSound = document.getElementById('gameplay-music')
const hitSound = document.getElementById('hit')
const squishSound = document.getElementById('squish')
const winSound = document.getElementById('win')
const loseSound = document.getElementById('lose')
const allSound = document.querySelectorAll('audio')
const grid = document.querySelector('.game-grid')
const startPos = 297
const scoreObj = {}


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
        // blks.forEach((blk) => {
        //     return blk.classList.add('blocks')
        // })
        grid.append(blk)
        if (i === startPos) {
            blk.classList.add('player')
        }
    }
    console.log(blks)
}

// ? State changing variables
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

let invaderMoveInterval
let invaderShootInterval
let pauseInterval
let pause = false
const intArr = []
let isMuted = false
let playerName
let storageKey
let storageValue

// ~ setInterval time decrement
//   ~ for (invaders row change === true) {
//          ~ interval++
//   ~ }


// ? Cached elements
const startBtn = document.getElementById('start')
const restartBtn = document.getElementById('restart')
const muteBtn = document.getElementById('mute')
const pauseBtn = document.getElementById('pause')
const scoreEl = document.getElementById('score')
const livesEl = document.getElementById('lives-display')
const startScreen = document.querySelector('.start-container')
const gameStartScreen = document.querySelector('.game-container')
const endScreen = document.querySelector('.end-container')
const result = document.querySelector('.end-result')
const endMidPanel = document.querySelector('.mid-wrapper')
const endPanel = document.querySelector('.end-scene')
const finalScore = document.getElementById('final-score')
const invaderColors = ['black', 'brown', 'green', 'purple', 'gold']
const scoreSubmitBtn = document.getElementById('high-score')
const nameInput = document.querySelector('#name')
const leaderboard = document.querySelector('.leaderboard')
const scoreList = document.querySelector('ol')



// ? Event listners
startBtn.addEventListener('click', init)
document.addEventListener('keydown', playerMove)
document.addEventListener('keyup', playerShoot)
restartBtn.addEventListener('click', restart)
pauseBtn.addEventListener('click', pauseGame)
muteBtn.addEventListener('click', soundOff)
nameInput.addEventListener('input', () => {
    if (nameInput.value.length <= 0) {
        scoreSubmitBtn.disabled = true
    } else {
        scoreSubmitBtn.disabled = false
    }
})
scoreSubmitBtn.addEventListener('click', saveScore)



// ? Functions
function init(evt) {
    if (gameStartScreen.style.display === '' || 'none') {
        gameStartScreen.style.display = 'flex'
        startScreen.style.display = 'none'
        endScreen.style.display = 'none'
        makeGrid()
        resetGame()
        invadersMove()
        invadersShoot()
        playSound(gameSound)
    }
    console.log(blks)
}

function restart(evt) {
    // scoreList.remove()
    document.location.reload()
}

function pauseGame(evt) {
    if (pause === false) {
        pause = true
        console.log(intArr)
        pauseBtn.innerHTML = 'RESUME'
    } else if (pause === true) {
        pause = false
        pauseBtn.innerHTML = 'PAUSE'

    }
}

function resetGame() {
    // reset score and lives to game start
    score = 0
    scoreEl.innerHTML = score
    lives = 3
    livesEl.innerHTML = '❤️'.repeat(lives)
    setInvaders()
}

function setInvaders() {
    // set start position for invaders
    // added different invader types for each row
    invadersCurrPos.forEach((rowArr, index) => {
        rowArr.forEach((blkValue, idx) => {
            blks[blkValue].dataset.arrIdx = index
            blks[blkValue].dataset.rowIdx = idx
        })
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

function invadersMove() {
    let sideMove = 1
    let downMove = cols

    invaderMoveInterval = setInterval(() => {
        if (!pause) {
            // border conditions
            let noMoveRight = invadersCurrPos.some(rowArr => rowArr.some(invaderIdx => invaderIdx % cols === cols - 1))
            let noMoveLeft = invadersCurrPos.some(rowArr => rowArr.some(invaderIdx => invaderIdx % cols === 0))
            let noMoveDown = invadersCurrPos.some(rowArr => rowArr.some(invaderIdx => invaderIdx > blks.length - 2 * cols))

            // remove classes from existing position
            invadersCurrPos.forEach(rowArr => {
                rowArr.forEach(blkValue => {
                    blks[blkValue].classList.remove(...invaderColors)
                    blks[blkValue].dataset.arrIdx = undefined
                    blks[blkValue].dataset.rowIdx = undefined
                })
            })

            // update all invaders position
            invadersCurrPos.forEach((rowArr, index) => {
                rowArr.forEach((blkValue, idx) => {
                    if (noMoveDown === true) {
                        clearInterval(invaderMoveInterval)
                        console.log('no move down')
                        lives = 0
                        livesEl.innerHTML = '❤️'.repeat(lives)
                        livesEl.classList.add('goo')
                        setTimeout(gameEnd(), 50)
                    } else if (noMoveLeft === true) {
                        sideMove = 1
                        invadersCurrPos[index][idx] += downMove
                    } else if (noMoveRight === true) {
                        sideMove = -1
                        invadersCurrPos[index][idx] += downMove
                    }
                    invadersCurrPos[index][idx] += sideMove
                })
            })

            setInvaders()
        }
    }, 900)
    intArr.push(invaderMoveInterval)
}

function invadersShoot() { // has to come after invadersMove() due to logging of new positions
    invaderShootInterval = setInterval(() => {
        if (!pause) {
            // Gets random index for invadersCurrPos variable
            currShootRow = Math.floor(Math.random() * invadersCurrPos.length)
            currShootCol = Math.floor(Math.random() * invadersCurrPos[0].length)
            // Only gets index with invaders present
            let shooterIdx = invadersCurrPos[currShootRow][currShootCol] + cols

            blks[shooterIdx]?.classList.add('goo-shoot')
            squishSound.play()
            console.log('sound play')
            let interval = setInterval(() => {
                if (!pause) {
                    if (shooterIdx < playerCurrPos) {
                        blks[shooterIdx]?.classList.remove('goo-shoot')
                        shooterIdx += cols
                        // console.log(shooterIdx)
                        blks[shooterIdx]?.classList.add('goo-shoot')
                        if (blks[shooterIdx]?.classList.contains('player')) {
                            blks[shooterIdx].classList.add('goo')
                            lives--
                            livesEl.innerHTML = '❤️'.repeat(lives)
                            blks[shooterIdx].classList.remove('goo-shoot')
                            gameEnd()
                            setTimeout(() => {
                                blks[shooterIdx].classList.remove('goo')
                            }, 100)
                        }
                    } else {
                        blks[shooterIdx]?.classList.remove('goo-shoot')
                    }
                }
            }, 400)
            intArr.push(interval)
        }
    }, 1200)
    intArr.push(invaderShootInterval)
}

function playerMove(evt) {
    if (!pause) {
        blks[playerCurrPos].classList.remove('player')
        if (evt.code === 'ArrowLeft' && playerCurrPos !== blks.length - cols) {
            playerCurrPos--
        } else if (evt.code === 'ArrowRight' && playerCurrPos !== blks.length - 1) {
            playerCurrPos++
        }
        blks[playerCurrPos].classList.add('player')
    }
}

function playerShoot(evt) {
    let shootOrigin = playerCurrPos - cols

    if (evt.code === 'Space') {
        blks[shootOrigin].classList.add('swat')
        let interval = setInterval(() => {
            if (!pause) {
                blks[shootOrigin]?.classList.remove('swat')
                // const swatNum = document.querySelectorAll('.swat')
                if (shootOrigin > cols - 1) {
                    shootOrigin -= cols
                    blks[shootOrigin].classList.add('swat')
                    if (blks[shootOrigin].classList.contains('invader')) {
                        blks[shootOrigin].classList.remove('invader')
                        let el = blks[shootOrigin]
                        invadersCurrPos[el.dataset.arrIdx]?.splice(el.dataset.rowIdx, 1)
                    }
                    if (blks[shootOrigin].classList.contains('black')) {
                        playSound(hitSound)
                        score += 100
                        scoreEl.innerHTML = score
                        blks[shootOrigin].classList.remove('black', 'swat')
                        clearInterval(interval)
                        blks[shootOrigin].classList.add('dead-fly')
                    } else if (blks[shootOrigin].classList.contains('brown')) {
                        playSound(hitSound)
                        score += 200
                        scoreEl.innerHTML = score
                        blks[shootOrigin].classList.remove('brown', 'swat')
                        clearInterval(interval)
                        blks[shootOrigin].classList.add('dead-fly')

                    } else if (blks[shootOrigin].classList.contains('green')) {
                        playSound(hitSound)
                        score += 300
                        scoreEl.innerHTML = score
                        blks[shootOrigin].classList.remove('green', 'swat')
                        clearInterval(interval)
                        blks[shootOrigin].classList.add('dead-fly')

                    } else if (blks[shootOrigin].classList.contains('purple')) {
                        playSound(hitSound)
                        score += 500
                        scoreEl.innerHTML = score
                        blks[shootOrigin].classList.remove('purple', 'swat')
                        clearInterval(interval)
                        blks[shootOrigin].classList.add('dead-fly')

                    } else if (blks[shootOrigin].classList.contains('gold')) {
                        playSound(hitSound)
                        score += 1000
                        scoreEl.innerHTML = score
                        blks[shootOrigin].classList.remove('gold', 'swat')
                        clearInterval(interval)
                        blks[shootOrigin].classList.add('dead-fly')
                    }
                    setTimeout(() => {
                        blks[shootOrigin].classList.remove('dead-fly')
                    }, 85)
                    checkInvadersPresent()
                } else {
                    clearInterval(interval)
                }
            }
        }, 100)
        intArr.push(interval)
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

    if (haveInvader === false) {
        // console.log('you win')
        intArr.forEach(int => clearInterval(int))
        allSound.forEach(sound => sound.pause())
        playSound(winSound)
        gameStartScreen.style.display = 'none'
        endScreen.style.display = 'flex'
        endScreen.classList.add('good-bg')
        endMidPanel.classList.add('good-end')
        result.innerHTML = 'You defeated the fly legion!'
        finalScore.innerHTML = `${score}`
    }
}

function gameEnd() {
    if (lives === 0) {
        // console.log('game end')
        intArr.forEach(int => clearInterval(int))
        allSound.forEach(sound => sound.pause())
        playSound(loseSound)
        gameStartScreen.style.display = 'none'
        endScreen.style.display = 'flex'
        endScreen.classList.add('bad-bg')
        endMidPanel.classList.add('bad-end')
        result.innerHTML = 'Mourn for the loss of your cake.'
        finalScore.innerHTML = `${score}`
    }
}

function playSound(sound) {
    if (sound.currentTime === 0) {
        if (sound === gameSound) {
            sound.volume = 0.15
        } else {
            sound.volume = 0.3
        }
    }
    sound.src = `assets/${sound.id}.mp3`
    sound.play()
}

function soundOff(evt) {
    if (isMuted === false) {
        isMuted = true
        gameSound.muted = true
        squishSound.muted = true
        hitSound.muted = true
        muteBtn.innerHTML = 'UNMUTE'
    } else if (isMuted === true) {
        isMuted = false
        gameSound.muted = false
        squishSound.muted = false
        hitSound.muted = false
        muteBtn.innerHTML = 'MUTE'
    }
}

function saveScore(evt) {
    playerName = nameInput.value
    localStorage.setItem(`${playerName}`, `${score}`)


}

function getScore() {
    // retrieved score from localStorage and placed into object
    for (let i = 0; i < localStorage.length; i++) {
        storageKey = localStorage.key(i)
        storageValue = localStorage.getItem(storageKey)
        scoreObj[storageKey] = storageValue
    }
}

function addToLeaderboard() {
    const sortedScoreObj = Object.fromEntries(
        Object.entries(scoreObj).sort((a, b) => a[1] - b[1]).reverse().splice(0, 5)
    )
    // console.log(sortedScoreObj)
    for (const [key, value] of Object.entries(sortedScoreObj)) {
        scoreInput = document.createElement('li')
        scoreList.appendChild(scoreInput)
        scoreInput.innerHTML = `${key}         ${value}`
        console.log(scoreInput)
    }
}

getScore()
addToLeaderboard()