

let grid = [];

function createGrid() {

    for (let i = 0; i < 500; i = i + 20) {
        const line = [];
        for (let j = 0; j < 500; j = j + 20) {
            line.push({ x: i, y: j, state: 'empty' });//empty, snake-body, snake-head, food
        }
        grid.push(line);
    }
}

createGrid();

let snake = document.querySelector(".snake");
let food = document.querySelector(".food");
let game = document.querySelector("#game");

let snakeBody = [snake];
let snakeDirection = "stop";

snakeBody[0].style.left = "0px";
snakeBody[0].style.top = "0px";


food.style.left = Math.floor(Math.random() * 24) * 20 + "px";
food.style.top = Math.floor(Math.random() * 24) * 20 + "px";

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            moveSnakeBody("up");
            snakeDirection = "up";
            break;
        case "ArrowDown":
            moveSnakeBody("down");
            snakeDirection = "down";
            break;
        case "ArrowLeft":
            moveSnakeBody("left");
            snakeDirection = "left";
            break;
        case "ArrowRight":
            moveSnakeBody("right");
            snakeDirection = "right";
            break;
        default:
            console.log("Invalid key");
            break;
    }
    checkSnakeHeadPosition();
})


function checkSnakeHeadPosition() {
    if (snakeBody[0].style.left === food.style.left && snakeBody[0].style.top === food.style.top) {
        setFood();
        // increase snake size

        const newSnakeBody = document.createElement("div");
        newSnakeBody.classList.add("snake-body");
        newSnakeBody.style.left = snakeBody[snakeBody.length - 1].style.left;
        newSnakeBody.style.top = snakeBody[snakeBody.length - 1].style.top;
        snakeBody.push(newSnakeBody);
        game.appendChild(newSnakeBody);


    }
}

function setFood(x, y) {
    x = Math.floor(Math.random() * 24) * 20;
    y = Math.floor(Math.random() * 24) * 20;
    if (!verifyPosition(y, x)) {
        setFood();
        return;
    }
    food.style.left = x + "px";
    food.style.top = y + "px";
}

function verifyPosition(y, x) {
    if (x < 0 || x > 480 || y < 0 || y > 480) {
        return false;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i].style.left === x + "px" && snakeBody[i].style.top === y + "px") {
            return false;
        }
    }
    return true;
}

function moveSnakeBody(direction) {

    switch (direction) {
        case "up":
            if (verifyPosition(parseInt(snakeBody[0].style.top) - 20, parseInt(snakeBody[0].style.left))) {
                snakeBody[snakeBody.length - 1].style.top = (parseInt(snakeBody[0].style.top) - 20) + "px"
                snakeBody[snakeBody.length - 1].style.left = snakeBody[0].style.left;
                snakeBody.unshift(snakeBody.pop());
            }
            else {

                snakeBody[snakeBody.length - 1].style.top = snakeBody[snakeBody.length - 1].style.top;

            }
            break;
        case "down":
            if (verifyPosition(parseInt(snakeBody[0].style.top) + 20, parseInt(snakeBody[0].style.left))) {
                snakeBody[snakeBody.length - 1].style.top = (parseInt(snakeBody[0].style.top) + 20) + "px"
                snakeBody[snakeBody.length - 1].style.left = snakeBody[0].style.left;
                snakeBody.unshift(snakeBody.pop());
            }
            else {

                snakeBody[snakeBody.length - 1].style.top = snakeBody[snakeBody.length - 1].style.top;

            }
            break;
        case "left":
            if (verifyPosition(parseInt(snakeBody[0].style.top), parseInt(snakeBody[0].style.left) - 20)) {
                snakeBody[snakeBody.length - 1].style.left = (parseInt(snakeBody[0].style.left) - 20) + "px"
                snakeBody[snakeBody.length - 1].style.top = snakeBody[0].style.top;
                snakeBody.unshift(snakeBody.pop());

            }
            else {

                snakeBody[snakeBody.length - 1].style.left = snakeBody[snakeBody.length - 1].style.left;

            }
            break;
        case "right":
            if (verifyPosition(parseInt(snakeBody[0].style.top), parseInt(snakeBody[0].style.left) + 20)) {
                snakeBody[snakeBody.length - 1].style.left = (parseInt(snakeBody[0].style.left) + 20) + "px"
                snakeBody[snakeBody.length - 1].style.top = snakeBody[0].style.top;
                snakeBody.unshift(snakeBody.pop());
            }
            else {

                snakeBody[snakeBody.length - 1].style.left = snakeBody[snakeBody.length - 1].style.left;

            }
            break;
        default:
            console.log("Invalid direction");
            break;

    }

}

let interval = setInterval(() => {
    if (snakeDirection !== "stop") {
        moveSnakeBody(snakeDirection);
        checkSnakeHeadPosition();
    }
}, 100);