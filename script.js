// Things to add
// random direction for snake genration and reset.
// checkcollision in move
// Add destructive element
// Add return to score

const board = document.getElementById('game-board');
const instructiontext = document.getElementById(`instruction-text`);
const logo = document.getElementById(`logo`);
const scoretext = document.getElementById(`score`);
const highScoretext = document.getElementById(`highScore`);
document.addEventListener(`keydown`, handlekeys);

const gridSize = 20;
let food = generateFood();
let snake = [{ x: 10, y: 10 }];
let direction = `right`;
let gameSpeedDelay = 200;
let gameStarted = false;
let gameinterval;
let highScore = 0;

// let direction = directiongenerator();
// let directarray = [`right`, `left`, `up`, `down`];

function draw() {
    board.innerHTML = ``;
    drawSnake();
    drawFood();
    updateScore();

}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement(`div`, `snake`);
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement(`div`, `food`);
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// draw();

// directiongenerator(){
//     let directarray = [`right`, `left`, `up`, `down`];
//     let randomdirection = Math.floor(Math.random * directarray.lenth) 
// }
function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case `up`:
            head.y--;
            break;
        case `down`:
            head.y++;
            break;
        case `right`:
            head.x++;
            break;
        case `left`:
            head.x--;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameinterval);
        increaseSpeed();
        gameinterval = setInterval(() => {
            move();
            collision();
            draw();
        }, gameSpeedDelay)
    }
    else {
        snake.pop();
    }
}

function startGame() {
    gameStarted = true;
    instructiontext.style.display = `none`;
    updateScore();
    updateHighScore();
    logo.style.display = `none`;
    gameinterval = setInterval(() => {
        move();
        collision();
        draw();
    }, gameSpeedDelay);
}


function handlekeys(event) {
    if ((!gameStarted && event.code === `Space`) || (!gameStarted && event.key === ` `)) {
        startGame();
    }
    else {
        switch (event.key) {
            case `ArrowUp`:
                direction = `up`;
                break;
            case `ArrowDown`:
                direction = `down`;
                break;
            case `ArrowRight`:
                direction = `right`;
                break;
            case `ArrowLeft`:
                direction = `left`;
                break;
        }
    }
}


function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 4;
    }
    else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    }
    else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    }

    console.log(gameSpeedDelay);
}

function collision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }

}

function resetGame() {
    board.innerHTML = '';
    updateHighScore();
    updateScore();
    snake = [{ x: 10, y: 10 }];
    direction = `right`;
    gameSpeedDelay = 200;
    clearInterval(gameinterval);
    stopGame();
}

function updateHighScore() {
    let score = snake.length - 1;
    if (score > highScore) {
        highScore = score;
        highScoretext.textContent = highScore.toString().padStart(3, `0`);
    }


    highScoretext.style.display = `block`;

}

function updateScore() {
    let score = snake.length - 1;
    scoretext.textContent = score.toString().padStart(3, `0`);
}

function stopGame() {
    clearInterval(gameinterval);
    gameStarted = false;
    logo.style.display = `block`;
    instructiontext.style.display = `block`;
}
// setInterval(
//     () => {
//         move();
//         draw();
//     }, 200);

