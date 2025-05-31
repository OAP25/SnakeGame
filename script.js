let game = document.querySelector(".game");
let scoreContainer = document.querySelector(".score");
let foodX, foodY;
let headX = 12, headY = 12;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let score = 0;

// Function to generate food at random positions
function generateFood() {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][1] === foodY && snakeBody[i][0] === foodX) {
            generateFood();
        }
    }
}

// Function to handle game over
function gameOver() {
    headX = 12;
    headY = 12;
    generateFood();
    velocityY = 0;
    velocityX = 0;
    snakeBody = [];
    scoreContainer.innerHTML = "Score : " + score;
    alert("Game Over! Your score was: " + score);
    score = 0;
}

// Function to render the game state
function renderGame() {
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;

    // If snake eats the food
    if (foodX === headX && headY === foodY) {
        snakeBody.push([foodX, foodY]);
        generateFood();
        score += 10;
        scoreContainer.innerHTML = "Score : " + score;
    }

    // Move snake and update body
    snakeBody.pop();
    headX += velocityX;
    headY += velocityY;
    snakeBody.unshift([headX, headY]);

    // Check for game over conditions
    if (headX === 0 || headY === 0 || headX === 26 || headY === 26) {
        gameOver();
    }
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            gameOver();
        }
    }

    // Render snake body
    for (let i = 0; i < snakeBody.length; i++) {
        updatedGame += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }

    game.innerHTML = updatedGame;
}

// Function to handle keyboard inputs (for laptop/desktop)
document.addEventListener("keydown", function (e) {
    let key = e.key;

    if (key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
});

// Function to handle touch gestures (for mobile devices)
let touchStartX, touchStartY;

document.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", function (e) {
    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;

    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            velocityX = 1;
            velocityY = 0; // Swipe Right
        } else {
            velocityX = -1;
            velocityY = 0; // Swipe Left
        }
    } else {
        if (diffY > 0) {
            velocityX = 0;
            velocityY = 1; // Swipe Down
        } else {
            velocityX = 0;
            velocityY = -1; // Swipe Up
        }
    }
});

// Generate initial food and start the game
generateFood();
setInterval(renderGame, 150);
