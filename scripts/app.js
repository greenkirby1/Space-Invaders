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
const startPosition = 297

// ? Generate game grid
const cols = 17
const rows = 18
const cellCount = cols * rows

const cells = []

function makeGrid() {
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div')
        cell.innerText = i // delete when done
        cell.style.width = `${100 / cols}%`
        cell.style.height = `${100 / rows}%`
        cells.push(cell)
        cells.forEach((cell) => {
            const cellId = `${cells.indexOf(cell)}`
            return cell.dataset.id = cellId
        })    
        grid.append(cell)
        // console.log(cells)
        if (i === startPosition) {
            cell.classList.add('player')
            // console.log(cells[297])
        }
    }
}

makeGrid()

// ? State changing variables
let lives
let score

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
//   - if (cells with .invader-laser && .player === true) {
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
//   - laser travels up the column from cell where it was generated/initiated
//   - if (cells with .invader-laser > 4) {
//          - disable space bar key shooting laser
//          - check whether cells with .invader laser > 4
//          - enable laser space bar key if condition not met
//     }
//   - if (cells with .player-laser && .invader === true) {
//          - element.classList.add('explosion')
//          - element.classList.remove('invader-laser invader')
//          - score(sum of total score) += 100
//     }


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
// document.addEventListner('keydown', playerMove)
// document.addEventListener('keyup', playerShoot)
// startBtn.addEventListner('click', init)
// pauseBtn.addEventListener('click', pause)
// playAgainBtn.addEventListner('click', init)
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
    let currPosition 
}

function playerShoot() {

}