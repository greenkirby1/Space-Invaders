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

makeGrid()

// ? State changing variables
let lives
let score
let playerCurrPos = blks.indexOf(document.querySelector('.player'))
let invadersStartPos = [
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
    [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81]
]

// - invaders state
//   - array with nums specificing starting positions of invaders
//   - forEach to add classes to invaders
//   - movement side to side at setInterval()
//   - after reaching one side of grid invaders move down one row as a whole
//   - position reset to start position when player clicks play again btn

// - player state
//   - movement right/left using rightArrow/leftArrow or A/D
//   - laser created when space bar is pressed
//   - if (lives === 0 || invaders are in the same row as player) {
//          - element.classLIst.add('explosion')
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

// - laser from player
//   - laser travels up the column from blk where it was generated/initiated


// ~ setInterval time decrement
//   ~ for (invaders row change === true) {
    //          ~ interval++
    //   ~ }
    
    // ~ leaderboard
    //   ~ leaderboard using localStorage
    
    
    // ? Cached elements
    // - start game button
    //   - const startBtn = document.getElementById('start')
    // - pause/resume button
    //   - const pauseBtn = document.getElementById('pause')
    // - play again button
    //   - const playAgainBtn = document.getElementById('play-again')
    // ~ mute button
    //   ~ mute audio when audio is playing
    //   ~ when audio is muted it can be unmuted
    //   ~ const muteBtn = document.getElementById('mute')
    
    
    // ? Event listners
    document.addEventListener('keydown', playerMove)
    document.addEventListener('keyup', playerShoot)
    // startBtn.addEventListener('click', init)
    // pauseBtn.addEventListener('click', pause)
    // playAgainBtn.addEventListener('click', init)
    // ~ muteBtn.addEventListener('click', soundOff)
    
    
    
    // ? Functions
    
    
    function init() {
        makeGrid()
        // delay for 2000ms then start game
    }
    
    function pause() {
        
    }
    
    function soundOff() {
        
    }
    
    function playerMove(evt) {
        blks[playerCurrPos].classList.remove('player')
        if (evt.key === 'ArrowLeft' && playerCurrPos !== 289) {
            playerCurrPos--
        } else if (evt.key === 'ArrowRight' && playerCurrPos !== 305) {
            playerCurrPos++
        } else {
            console.log("Not Allowed")
        }
        // console.log(playerCurrPos)
        blks[playerCurrPos].classList.add('player')
    }
    
    function playerShoot(evt) {
        // console.log(evt.code)
        let shootOrigin = playerCurrPos - 17
        // console.log(shootOrigin)
        if (evt.code === 'Space') {
            blks[shootOrigin].classList.add('swat')
            for (let i = shootOrigin; i > playerCurrPos - 289; i -= 17) {
                
            }
        }
        // - to go up column is += 17
        // - shootOrigin[playerCurrPos + 17]
        //   - if (blks with .invader-laser > 4) {
        //          - disable space bar key shooting laser
        //          - check whether blks with .invader laser > 4
        //          - enable laser space bar key if condition not met
        //     }
        //   - if (blks with .player-laser && .invader === true) {
        //          - element.classList.add('explosion')
        //          - element.classList.remove('invader-laser invader')
        //          - score(sum of total score) += 100
        //     }  
    }
    