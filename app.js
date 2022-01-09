
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
let lastPaintTime = 0;

let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 3, y: 8 };
let localHighScores = JSON.parse(localStorage.getItem('localHighScores'));
let firstHighScore = document.querySelector('#hiScoreBox > ol > #first');
let secondHighScore = document.querySelector('#hiScoreBox > ol > #second');
let thirdHighScore = document.querySelector('#hiScoreBox > ol > #third');

// displaying highScores from device

if (localHighScores == null) {
    localStorage.setItem('localHighScores', JSON.stringify([0, 0, 0]));
}

firstHighScore.textContent = localHighScores[0];
secondHighScore.textContent = localHighScores[1];
thirdHighScore.textContent = localHighScores[2];

// game functions

function main(ctime) {

    window.requestAnimationFrame(main)

    // checks is diff of time is smaller than 
    // specified time interval/speed
    // ! decrease "speed" value to increase snake's speed
    let speed = 130;
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

    localHighScores = JSON.parse(localStorage.getItem('localHighScores'));

    firstHighScore.textContent = 0;
    secondHighScore.textContent = 0;
    thirdHighScore.textContent = 0;
})

function gameEngine() {

    // Part 1> Updating the snake variable
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert('Game over!')
        snakeArr = [
            { x: 13, y: 15 }
        ];

        // Updating highscores
        if (localHighScores == null) {
            localStorage.setItem('localHighScores', JSON.stringify([0, 0, 0]));
            localHighScores = JSON.parse(localStorage.getItem('localHighScores'));
        }
        for (let index = 0; index < localHighScores.length; index++) {
            let element = localHighScores[index];

            if ((score > element) && (!localHighScores.includes(score))) {

                localHighScores.splice(index, 0, score);
                if (localHighScores.length > 3) {
                    localHighScores.pop()
                }

                localStorage.setItem('localHighScores', JSON.stringify(localHighScores));
                break
            }

        }

        score = 0;

        scoreBox.textContent = `Score: ${score}`;

        firstHighScore.textContent = localHighScores[0];
        secondHighScore.textContent = localHighScores[1];
        thirdHighScore.textContent = localHighScores[2];
    }

    // If you have eaten the food, increment the score, increase snake body and regenerate the food
    if (snakeArr[0].y === food.y &&
        snakeArr[0].x === food.x
    ) {
        score++
        scoreBox.textContent = `Score: ${score}`;
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