const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomKey = () => {
  return keys[getRandomNumber(0, keys.length - 1)];
};

const targetRandomKey = () => {
  const key = document.getElementById(getRandomKey());

  key.classList.add("selected");
};

let score = 0;

document.addEventListener("keyup", (event) => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const hightlightKey = document.querySelector(".selected");
  const result = document.querySelector(".result");

  keyElement.classList.add("hit");

  keyElement.addEventListener("animationend", () => {
    keyElement.classList.remove("hit");

    if (keyPressed === hightlightKey.id) {
      score = score + 1;

      result.innerHTML = `Очки ${score + 1}`;

      hightlightKey.classList.remove("selected");

      targetRandomKey();
    } else {
      alert("Вы проиграли. Нажимайте внимательнее.");
      score = 0;
      result.innerHTML = `Очки ${score}`;

      hightlightKey.classList.remove("selected");

      targetRandomKey();
    }
  });
});

targetRandomKey();
