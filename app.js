
// constants and variables for the game
const direction = { x: 0, y: 0 }
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');
// let board = document.querySelector('#board')

// time and speed stuff is being done in milliseconds
let speed = 500;
let lastPaintTime = 0;

let snakeArr = [
    { x: 13, y: 15 }
];

// game functions
function main(ctime) {

    if (ctime > 10000) {
        console.log('FINAL'
        ,{ ctime }, { lastPaintTime }, ctime - lastPaintTime);
        return
    }

    window.requestAnimationFrame(main)

    // checks is diff of time is smaller than 
    // specified time interval/speed
    if ((ctime - lastPaintTime) < speed) {
        return
    } else {

        lastPaintTime = ctime;
        gameEngine()
        // console.log('swagat nahi karoge hamara? :(');
        // console.log({ ctime }, { lastPaintTime }, ctime - lastPaintTime);
        // console.log(' ');
    }
}

function gameEngine() {
    // Updating the snake variable

    // display the snake and food
    // board.textContent = `<h1>${lastPaintTime}</h1>`
    
    // ? it seems ids can be used DirectLy without even using grabbing them expicitly through queryselector
    console.log(board);
    board.innerHTML = ''
}

// main logic of game

// this.window.requestAnimationFrame(main)
window.requestAnimationFrame(main)