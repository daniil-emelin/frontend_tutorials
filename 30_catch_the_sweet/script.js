const screens = document.querySelectorAll(".screen");
const chooseSweetBtns = document.querySelectorAll(".choose-sweet-btn");
const startButton = document.getElementById("start-btn");
const gameNode = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");

let seconds = 0;
let score = 0;
let selectedSweet = {};

startButton.addEventListener("click", () => {
  screens[0].classList.remove("visible");
  screens[1].classList.add("visible");
});

chooseSweetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const sweetId = btn.getAttribute('data-id');

    selectedSweet = { src, id: sweetId };
    screens[1].classList.remove("visible");
    screens[2].classList.add("visible");

    setTimeout(createSweet, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let s = seconds % 60;

  s = s < 10 ? `0${s}` : s;

  timeEl.innerHTML = `Время: ${s}`;
  seconds++;
}

function createSweet() {
  const { x, y } = getRandomLocation();

  const sweet = document.createElement("img");
  sweet.classList.add("sweet");
  sweet.src = selectedSweet.src;
  sweet.alt = selectedSweet.alt;
  sweet.style.display = "block";
  sweet.style.top = `${y}px`;
  sweet.style.left = `${x}px`;
  sweet.style.transform = `rotate(${Math.random() * 360}deg)`;

  sweet.addEventListener("click", catchSweet);

  gameNode.appendChild(sweet);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return { x, y };
}

function playBiteSound() {
  const audio = document.getElementById(selectedSweet.id);

  audio.play();
}

function catchSweet() {
  playBiteSound();
  increaseScore();

  this.remove();

  addSweets();
}

function addSweets() {
  setTimeout(createSweet, 1000);
  setTimeout(createSweet, 1500);
}

function increaseScore() {
  score++;

  if (score > 19) {
    message.classList.add("visible");
  }

  scoreEl.innerHTML = `Счет: ${score}`;
}
