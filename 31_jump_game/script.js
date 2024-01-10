/* eslint-disable no-undef */
kaboom();

const WIDTH = width();
const HEIGHT = height();
const FLOOR_HEIGHT = HEIGHT / 2;
const JUMP_FORCE = 1000;
const SPEED = 480;
const BACKGROUND_COLOR = Color.fromHex("#8DB7FF");
const GRASS_COLOR = Color.fromHex("#388004");
const FLOOR_COLOR = Color.fromHex("#009A17");

setBackground(BACKGROUND_COLOR);

loadSprite("truck", "/sprites/truck.png");
loadSprite("block", "/sprites/block.png");

scene("game", () => {
  setGravity(2000);

  const createPlayer = () => {
    const player = add([sprite("truck"), pos(80, 40), area(), body()]);

    return player;
  };

  const player = createPlayer();

  const createFloor = () => {
    const floor = add([
      rect(WIDTH, FLOOR_HEIGHT),
      outline(4, GRASS_COLOR),
      pos(0, HEIGHT),
      anchor("botleft"),
      area(),
      body({ isStatic: true }),
      color(FLOOR_COLOR),
    ]);

    return floor;
  };

  createFloor();

  const spawnBlock = () => {
    add([
      sprite("block"),
      area(),
      pos(WIDTH, FLOOR_HEIGHT),
      anchor("botleft"),
      move(LEFT, SPEED),
      offscreen({ destroy: true }),
      "block",
    ]);

    wait(rand(2, 4), spawnBlock);
  };

  spawnBlock();

  const jump = () => {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
    }
  };

  onKeyPress("space", jump);
  onClick(jump);

  let score = 0;

  player.onCollide("block", () => {
    go("lose", score);
  });

  const createScoreLabel = () => {
    const scoreLabel = add([text(score), scale(2), pos(WIDTH / 2, 40)]);

    return scoreLabel;
  };

  const scoreLabel = createScoreLabel();

  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });
});

scene("lose", (score) => {
  add([
    text("Игра окончена."),
    pos(WIDTH / 2, HEIGHT / 2),
    scale(2),
    anchor("center"),
  ]);
  add([
    text("Очков набрано: " + score),
    pos(WIDTH / 2, HEIGHT / 2 + 64),
    scale(2),
    anchor("center"),
  ]);

  onKeyPress("space", () => go("game"));
  onClick(() => go("game"));
});

go("game");
