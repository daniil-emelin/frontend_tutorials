/* eslint-disable no-undef */
kaboom();

const BACKGROUND_COLOR = "#b6e5ea";
const PIPE_COLOR = "#74c02e";

const PIPE_WIDTH = 64;
const PIPE_BORDER = 4;
const PIPE_OPEN = 240;
const PIPE_MIN_HEIGHT = 60;

const JUMP_FORCE = 800;
const SPEED = 320;
const CEILING = -60;

let score = 0;

loadSprite("bird", "/sprites/bird.png");
loadSound("score", "/sounds/score.mp3");
loadSound("wooosh", "/sounds/wooosh.mp3");
loadSound("hit", "/sounds/hit.mp3");

setGravity(3200);
setBackground(Color.fromHex(BACKGROUND_COLOR));

scene("game", () => {
  const game = add([timer()]);

  const createPlayer = () => {
    const player = game.add([
      sprite("bird"),
      pos(width() / 4, 0),
      area(),
      body(),
    ]);

    return player;
  };

  const bird = createPlayer();

  onKeyPress("space", () => {
    bird.jump(JUMP_FORCE);
    play("wooosh");
  });

  onClick(() => {
    bird.jump(JUMP_FORCE);
    play("wooosh");
  });

  const spawnPipe = () => {
    const bottomPipeHeight = rand(
      PIPE_MIN_HEIGHT,
      height() - PIPE_MIN_HEIGHT - PIPE_OPEN
    );
    const topPipeHeight = height() - bottomPipeHeight - PIPE_OPEN;

    game.add([
      pos(width(), 0),
      rect(PIPE_WIDTH, bottomPipeHeight),
      color(Color.fromHex(PIPE_COLOR)),
      outline(PIPE_BORDER),
      area(),
      move(LEFT, SPEED),
      offscreen({ destroy: true }),
      "pipe",
    ]);

    game.add([
      pos(width(), bottomPipeHeight + PIPE_OPEN),
      rect(PIPE_WIDTH, topPipeHeight),
      color(Color.fromHex(PIPE_COLOR)),
      outline(PIPE_BORDER),
      area(),
      move(LEFT, SPEED),
      offscreen({ destroy: true }),
      "pipe",
      { passed: false },
    ]);
  };

  game.loop(1, spawnPipe);

  bird.onUpdate(() => {
    if (bird.pos.y >= height() || bird.pos.y <= CEILING) {
      go("lose", score);
    }
  });

  bird.onCollide("pipe", () => {
    play("hit");
    go("lose", score);
  });

  onUpdate("pipe", (pipe) => {
    if (pipe.pos.x + pipe.width <= bird.pos.x && pipe.passed === false) {
      addScore();
      pipe.passed = true;
    }
  });

  const createScoreLabel = () => {
    const scoreLabel = game.add([
      text(score),
      anchor("center"),
      pos(width() / 2, 80),
      fixed(),
      z(100),
    ]);

    return scoreLabel;
  };

  const scoreLabel = createScoreLabel();

  const addScore = () => {
    score++;
    scoreLabel.text = score;
    play("score");
  };
});

scene("lose", (score) => {
  add([
    text("Набрано очков: " + score),
    pos(center()),
    scale(3),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("game"));
  onClick(() => go("game"));
});

go("game");
