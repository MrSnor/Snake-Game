
// constants and variables for the game
const direction = { x: 0, y: 0 }
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');
const board = document.querySelector('#board')
const validKeys = [
    'ArrowUp',
    'ArrowDown',
    'ArrowRight',
    'ArrowLeft',
]
let score = 0;
// let currentKeyValue = null;
let inputDir = { x: 0, y: 0 };
// time and speed stuff is being done in milliseconds
let speed = 200;
let lastPaintTime = 0;

let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 3, y: 8 };



// game functions
function main(ctime) {

    // max runtime for now
    // if (ctime > 10000) {
    //     console.log('FINAL'
    //         , { ctime }, { lastPaintTime }, ctime - lastPaintTime);
    //     return
    // }

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

function isCollide(sArr) {
    return false
}

function gameEngine() {
    // Part 1> Updating the snake variable
    if (isCollide(snakeArr)) {
        // gameOverSound.play();
        // musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game over!')
        snakeArr = [
            { x: 13, y: 15 }
        ];
        // musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y &&
        snakeArr[0].x === food.x
    ) {

        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });

        const a = 2;
        const b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2> display the snake and food

    // * display the snake
    // ? it seems ids can be used DirectLy without even using grabbing them expicitly through queryselector/getElementbyid 
    // console.log(board);
    board.innerHTML = '';
    snakeArr.forEach((Element, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = Element.y;
        snakeElement.style.gridColumnStart = Element.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // * display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// main logic of game

// musicSound.play()

window.requestAnimationFrame(main)

window.addEventListener('keydown', Element => {

    // to exit the function if invalid key is 
    // pressed or same(valid key) is pressed 
    // twice in a row
    // if (!validKeys.includes(Element.key) || (Element.key == currentKeyValue)) {
    //     return
    // }

    // ! to exit the function if invalid key is 
    // pressed
    if (!validKeys.includes(Element.key)) {
        return
    }

    // starts the  game
    inputDir = { x: 0, y: 1 };
    // moveSound.play()
    // currentKeyValue = Element.key;
    //  * controls
    switch (Element.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
    // console.log(Element);
    console.table(snakeArr)
})