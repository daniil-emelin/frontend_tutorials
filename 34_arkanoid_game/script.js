const CANVAS_NODE = document.getElementById("arkanoid");
const CTX = CANVAS_NODE.getContext("2d");
const BALL_RADIUS = 10;

CTX.fillStyle = "#0095DD";
CTX.font = "16px Arial";

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 75;

const BRICK_ROW_COUNT = 5;
const BRICK_COLUMN_COUNT = 3;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET = 30;

let ballX = CANVAS_NODE.width / 2;
let ballY = CANVAS_NODE.height - 30;
let dx = 2;
let dy = -2;

let paddleX = (CANVAS_NODE.width - PADDLE_WIDTH) / 2;

let score = 0;
let lives = 3;

const bricks = [];

for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
  bricks[c] = [];

  for (let r = 0; r < BRICK_ROW_COUNT; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(e) {
  const RELATIVE_X = e.clientX - CANVAS_NODE.offsetLeft;

  if (RELATIVE_X > 0 && RELATIVE_X < CANVAS_NODE.width) {
    paddleX = RELATIVE_X - PADDLE_WIDTH / 2;
  }
}

function drawBall() {
  CTX.beginPath();
  CTX.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
  CTX.fill();
  CTX.closePath();
}

function drawPaddle() {
  CTX.beginPath();
  CTX.rect(
    paddleX,
    CANVAS_NODE.height - PADDLE_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
  CTX.fill();
  CTX.closePath();
}

function drawBricks() {
  for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    for (let r = 0; r < BRICK_ROW_COUNT; r++) {
      if (bricks[c][r].status === 1) {
        const BRICK_X = r * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET;
        const BRICK_Y = c * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET;

        bricks[c][r].x = BRICK_X;
        bricks[c][r].y = BRICK_Y;

        CTX.beginPath();
        CTX.rect(BRICK_X, BRICK_Y, BRICK_WIDTH, BRICK_HEIGHT);
        CTX.fill();
        CTX.closePath();
      }
    }
  }
}

function drawScore() {
  CTX.fillText("Счет: " + score, 8, 20);
}

function drawLives() {
  CTX.fillText("Жизней: " + lives, CANVAS_NODE.width - 85, 20);
}

function detectCollision() {
  for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
    for (let r = 0; r < BRICK_ROW_COUNT; r++) {
      let brick = bricks[c][r];

      if (brick.status === 1) {
        const isCollisionTrue =
        ballX > brick.x &&
        ballX < brick.x + BRICK_WIDTH &&
        ballY > brick.y &&
        ballY < brick.y + BRICK_HEIGHT;

        if (isCollisionTrue) {
          dy = -dy;
          brick.status = 0;

          score++;

          if (score === BRICK_ROW_COUNT * BRICK_COLUMN_COUNT) {
            alert("Вы выиграли!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function draw() {
  CTX.clearRect(0, 0, CANVAS_NODE.width, CANVAS_NODE.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  detectCollision();

  if (ballX + dx < BALL_RADIUS || ballX + dx > CANVAS_NODE.width - BALL_RADIUS) {
    dx = -dx;
  }

  if (ballY + dy < BALL_RADIUS) {
    dy = -dy;
  }

  if (ballY + dy > CANVAS_NODE.height - BALL_RADIUS) {
    if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
      dy = -dy;
    } else {
      lives--;

      if (lives === 0) {
        alert("Игра окончена!");

        document.location.reload();
      } else {
        ballX = CANVAS_NODE.width / 2;
        ballY = CANVAS_NODE.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (CANVAS_NODE.width - PADDLE_WIDTH) / 2;
      }
    }
  }

  ballX += dx;
  ballY += dy;

  requestAnimationFrame(draw);
}

draw();
