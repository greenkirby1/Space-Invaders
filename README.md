# Space-Invaders

Welcome to my first browser game built from scratch! This browser game was the first project I completed for General Academy's SEI Bootcamp, it was a challenge to utilise what I have learnt so far in HTML, CSS and vanilla JavaScript. I wanted to create a Space Invaders game because it was one of my favourite games during my childhood, and I have made some theme alterations to make it slightly different from the beloved retro classic. 

I will be discussing my planning process behind the scenes to achieve the goals stated in the brief. As well as challenges I encountered during ther coding process, with key takeaways of this experince. Finally, I will also discuss future improvements for the game.

Please have a look at my project in action:
* [Game Link](https://greenkirby1.github.io/Space-Invaders/)


## Brief

The goal is to render a functioning Space Invaders-based game in the browser, and it must be built on a grid and not HTML Canvas.

* Player is able to move left and right with arrow key buttons, as well as shoot missiles with the space bar
* Invaders must move as a group to the left, right and down the grid while periodically dropping bombs at the player
* There must be a win/lose consequence which is displayed at the end of game along with the final score
* Separate HTML, CSS and JS files must be included
    - Uses semantic markup for HTML and CSS
    - Uses JS for DOM manipulation
* Game must be deployed online
*	Stretch goals
    - Setting up a leaderboard to save player scores using localStorage
    - Have different levels where the speed increments with each level
    - Have mute and pause buttons
    - Block of invaders consists of different type with different score increments
    - Have a bonus invader travelling through the top of the grid periodically which gives bonus points when hit
    - Provide shields for player to hide under until they are destroyed by bombs thrown by invaders


## Planning

### Wireframe

Using Excalidraw I created a wireframe of the front end and UI design, the initial plan has 3 different screens: 

1. Start screen
* I planned for the start screen to appear first on page load, containing the game title, a set of simple rules for gameplay and a start button. I also intended to add some graphics and a leaderboard using localStorage as optional goals to achieve. 

2. Game start screen
* The main screen, which is the game start screen has the most elements and complexity out of all screens. It would include a div showing the current score and life count of the player, which is updated throughout gameplay. The game grid where the actual game takes place would be created in JS, and during gameplay the DOM will be used to manipulate game elements by adding specific class/id to elements to show them at a variation of times. Having a mute and pause button would also be beneficial to improving the UX.

3. Game-over screen
* The game end screen, which is the gameover screen should inform the player of their final score and whether they have won/lost. I have also planned for a play again button to take the player back to the start screen.


### Pseudocode

```
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
// - Grid: 18 rows x 17 columns


// ? State changing variables
// - lives

// - invaders state
//   - movement side to side at setInterval()
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

// - gameplay score
//   - let score

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
// startBtn.addEventListner('click', init)
// pauseBtn.addEventListener('click', pause)
// playAgainBtn.addEventListner('click', init)
// ~ muteBtn.addEventListener('click', soundOff)



// ? Functions


function init() {
    // make grid
    // delay for 2000ms then start game
}

function pause() {

}

function soundOff() {

}
```


## Build/Code Process

* HTML was set up simply and following initial wireframe with some name and class name changes
* Basic CSS and JS to create game grid was laid down first in order to help visualize the movement of player and invaders later on with more complex JS code
* Player move
    - As the player will only be moving within a single row, I specified conditions where the players would not move outside of the grid or wrap around to the next row
    - Player shooting was available after some troubleshooting, the missile was first appearing in every block down the column when `playerShoot()` was executed. After nesting a `setInterval()` in the if loop, the missile stopped appearing in every single block as it passes through each of them
    - Wrote out logic for missile and invader collision by targeting grid divs with both the swat and invader colours (black, brown, green, purple, gold) class, which is checked using `if…else` loops
    - As the missile collides with an invader invaders’ position (i.e. index of grid) is retrieved using the data attributes created in `setInvaders()`, which is then spliced from the invaders’ current position 2D array so it cannot be further incremented
* Invader movement
    - Invaders’ starting position was defined as a variable in the global scope, which is an array consisting of 5 different arrays for each colour variation
    - Invaders were set in their position when game starts using `setInvaders()` by defining the index of the row arrays
        * Since the variable with the starting positions is a 2D array, a `forEach` method is used within another `forEach` method in order to iterate through each value within each array nested inside an array
        * This method of defining the positions added another layer of difficulty when using different methods 
        * Class names are added to specific rows to specify the colour type
        * Data attributes are also added to each to indicate the array index and row index for later use
    - Another function was created called `invaderMove()`, controlling the invaders’ sequence of movements throughout the game 
        * To put simply, during each interval the invaders have to move to the right /left by 1 grid block
        * If some of the invaders meet the border of the grid, they have to all move down one row and then continue to move left/right by 1
        * When some of the invaders reach the row above the player the lives are set to 0 and `gameEnd()` is called
        * Every time the invaders move to a new position their position is redefined in the global variable and the invaders have to be set on the grid again using the newly logged arrays
        * The invader class and invader colour class are removed from the previous positions and added to the newly declared positions
    - As the invaders move they will randomly drop bombs towards the row the player is residing in, and this is defined in the function `invadersShoot()`
        * Using `Math` methods, random integers are retrieved within the range of invaders’ current position (i.e. current indexes on the grid with class invader present) as it moves across the grid during each interval
        * Due to the nature of the 2D array of the invaders’ position variable, 2 numbers are needed for row and column to indicate the correct index
        * As the timing of the randomly generated position of the bombs and the speed at which they travel towards the player are different, an interval to specify the drop speed is nested within the `invaderShootInterval` which specifies how often a bomb is generated
* Game end
    - To check whether player has won or lost, 2 functions were created:
        * `checkInvadersPresent()` checks whether some of the grid divs contain any of the invader colour classes, if it returns false the game ends and it transitions to the game win screen with the player’s final score
        * `gameEnd()` checks whether player lives equals to 0, if it returns true the game ends and transitions to the game lost screen with the player’s final score
        * All intervals are stoped using a global variable which consists of an array of interval indexes 
        * A restart button is available in both scenarios
* Sound
    - Sound was added for the duration of the gameplay, which can be muted with the mute button linked to an event listener and `soundOff()`
* Pause
    - In order to pause every running interval during the game, `pauseGame()` was used to update the global variable pause to true/false when the pause button is clicked
    - Within the intervals are a nested if statement, with the argument of `!pause` which allows them to execute depending on the Boolean of the pause variable
* Leaderboard
    - Using `localStorage` in combination with an `<input>` for player to input their names, when the submit button is clicked an item would be set within the localStorage object with the player name input as the key and their final score as the value
    - In order to retrieve the info from `localStorage` and displayed on the leaderboard:
        * For loop is used to get each key and value, then stored into a global object
        * To display only the top 6 scores in descending order, the global object is sorted into ascending order, reversed to achieve the descending order, and finally spliced to only return the 6 key value pair
        * Using the sorted object defined locally and a `for…of` loop, each pair are displayed within the leaderboard element by creating `<li>` elements


### Challenges

This project was really challenging in terms of having to understand which method of doing things is most suitable for each mini task within the coding process. Also whether the methods that was chosen will aid or hinder the process in the long term.

I found out the hard way that using a 2D array was not necessarily the best way to compile informtion for how I was intending to utilise it. It made the coding process longer and less concise at certain points.

It was also challenging when errors were discovered and not knowing what they mean and where they come from. It took a lot of trial and error along with research to understand the basis of the errors.

### Key Takeaways

After this experience, I am quite confident in my understanding of HTML and CSS structures and elements. Throughout the coding process, I was able to recall HTML structure and select CSS properties correctly wihtout having to spend time seraching for them online. As for JavaScipt, there is definitely room for improvement but my understanding of functions and how to create them have improved massively. 

I am also proud of the in-game graphics I desgined and drew for the project! It makes it more satisfying when I'm playing the game and seeing them in action.

## Future Improvements

In order to achieve a cleaner code, the use of objects will be more helpful in that process. I would also like to implement more graphic design aspects, such as animations for each invader as they move down the grid. Other elements and I'd like to impelement are shields which block invader attacks for a certain amount of time, and a bonus invader that periodically moves across the top of the grid.