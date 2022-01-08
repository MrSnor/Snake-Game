
// constants and variables for the game

const board = document.querySelector('#board')
const scoreBox = document.querySelector('#scoreBox')
const hiScoreBox = document.querySelector('#hiScoreBox');
const RESET = document.querySelector('#reset')
const validKeys = [
    'ArrowUp',
    'ArrowDown',
    'ArrowRight',
    'ArrowLeft',
]
const oppositeDirectionKeys = {
    'ArrowUp': 'ArrowDown',
    'ArrowDown': 'ArrowUp',
    'ArrowRight': 'ArrowLeft',
    'ArrowLeft': 'ArrowRight',
}
const boundary = {
    xmin: 1,
    xmax: 18,
    ymin: 1,
    ymax: 18
}

let score = 0;
let hiScore = 0;
let currentKeyValue = null;
let inputDir = { x: 0, y: 0 };
// * time and speed stuff is being done in milliseconds
// ! decrease "speed" value to increase snake's speed
let speed = 150;
let lastPaintTime = 0;

let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 3, y: 8 };

// displaying hiScore from device
if (localStorage.localhiScore) {
    hiScore = localStorage.localhiScore;
} else {
    localStorage.localhiScore = 0;
}
hiScoreBox.textContent = `HiScore : ${hiScore}`


// game functions

function main(ctime) {

    window.requestAnimationFrame(main)

    // checks is diff of time is smaller than 
    // specified time interval/speed
    if ((ctime - lastPaintTime) < speed) {
        return
    } else {
        lastPaintTime = ctime;
        gameEngine()
    }
}

function isCollide(snake) {

    // if snake collides to self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[0].x === snake[i].x &&
            snake[0].y === snake[i].y) {
            return true;
        }
    }

    // if snake collides to borders
    if (snake[0].x < boundary.xmin ||
        snake[0].x > boundary.xmax ||

        snake[0].y < boundary.ymin ||
        snake[0].y > boundary.ymax) {
        return true;
    }

    return false
}

RESET.addEventListener('click', () => {
    localStorage.clear()
    hiScoreBox.textContent = `HiScore : 0`
})

function gameEngine() {

    // Part 1> Updating the snake variable
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert('Game over!')
        snakeArr = [
            { x: 13, y: 15 }
        ];
        if (score > hiScore) {
            localStorage.localhiScore = score;
            hiScore = localStorage.localhiScore
        }
        score = 0;

        scoreBox.textContent = `Score : ${score}`;
        hiScoreBox.textContent = `HiScore : ${hiScore}`
    }

    // If you have eaten the food, increment the score, increase snake body and regenerate the food
    if (snakeArr[0].y === food.y &&
        snakeArr[0].x === food.x
    ) {
        score++
        scoreBox.textContent = `Score : ${score}`;
        // * increasing snake length
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

    // * moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2> display the snake and food

    // display the snake
    // ? it seems ids can be used DirectLy without even using grabbing them expicitly through queryselector/getElementbyid 

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

    // display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




// main logic of game

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

    // to check the the snake doesnt move in direct oppposite direction
    if (snakeArr.length > 1) {
        if (Element.key == oppositeDirectionKeys[currentKeyValue]) {
            return
        }
    }

    // starts the  game
    inputDir = { x: 0, y: 1 };
    currentKeyValue = Element.key;

    // * controls
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
})