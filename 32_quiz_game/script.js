const QUESTIONS = [
  {
    text: "Какой фрукт считается источником витамина C?",
    variants: ["Банан", "Апельсин", "Груша", "Арбуз"],
    rightIndex: 1,
  },
  {
    text: "Какой из этих городов является столицей Австралии?",
    variants: ["Сидней", "Мельбурн", "Канберра", "Брисбен"],
    rightIndex: 2,
  },
  {
    text: "Какое из следующих чисел является простым числом?",
    variants: ["25", "37", "42", "50"],
    rightIndex: 1,
  },
  {
    text: "Какой элемент используется в большинстве ламп накаливания для создания света?",
    variants: ["Гелий", "Ксенон", "Натрий", "Вольфрам"],
    rightIndex: 3,
  },
  {
    text: "Какой химический элемент представлен символом Fe в периодической таблице?",
    variants: ["Свинец", "Железо", "Фтор", "Фосфор"],
    rightIndex: 1,
  },
];

const MONEY_NODES = document.querySelectorAll(".money");
const START_GAME_BUTTONS = document.querySelectorAll(".start-game");
const SCREEN_NODES = document.querySelectorAll(".screen");
const ANSWER_NODES = document.querySelectorAll(".answer");
const PRIZE_FOR_RIGHT_ANSWER = 5000;

let activeQuestionIndex = 0;
let money = 0;

START_GAME_BUTTONS.forEach((button) =>
  button.addEventListener("click", startNewGame)
);

function startNewGame() {
  updateMoneyDisplay(0);
  setActiveQuestion(0);
  showScreen(1);
}

function updateMoneyDisplay(newMoney) {
  money = newMoney;

  MONEY_NODES.forEach((moneyNode) => (moneyNode.textContent = money));
}

function setActiveQuestion(index) {
  activeQuestionIndex = index;

  const QUESTION_NODE = document.querySelector(".question");
  const activeQuestion = QUESTIONS[index];

  QUESTION_NODE.textContent = activeQuestion.text;

  activeQuestion.isChecking = false;

  setupAnswers(activeQuestion);
}

function showScreen(index) {
  SCREEN_NODES.forEach((screen, i) => {
    screen.classList.toggle("visible", i === index);
  });
}

function setupAnswers(question) {
  ANSWER_NODES.forEach((answerNode, index) => {
    const letters = ["A", "B", "C", "D"];

    answerNode.textContent = `${letters[index]}. ${question.variants[index]}`;

    answerNode.addEventListener("click", () =>
      handleAnswerClick(answerNode, question)
    );
  });
}

async function handleAnswerClick(answerNode, question) {
  if (question.isChecking) {
    return;
  }

  question.isChecking = true;

  await highlightAnswer(answerNode, "active", 2000);

  const rightAnswerNode = ANSWER_NODES[question.rightIndex];

  const isRightAnswer = answerNode.textContent === rightAnswerNode.textContent;

  await highlightAnswer(rightAnswerNode, "right", 1000);

  if (!isRightAnswer) {
    gameOver("lose");
    return;
  }

  const isLastQuestion = activeQuestionIndex === QUESTIONS.length - 1;

  if (isLastQuestion) {
    gameOver("win");
  } else {
    setActiveQuestion(activeQuestionIndex + 1);
  }

  updateMoneyDisplay(money + PRIZE_FOR_RIGHT_ANSWER);
}

async function highlightAnswer(answerNode, type, timeoutMs) {
  answerNode.classList.add(type);

  if (timeoutMs) {
    await timeout(timeoutMs);
  }

  clearClassnamesFromQuestionNode(answerNode);
}

function gameOver(status) {
  if (status === "win") {
    showScreen(3);
  }

  if (status === "lose") {
    updateMoneyDisplay(0);
    showScreen(2);
  }
}

function clearClassnamesFromQuestionNode(answerNode) {
  ["active", "right", "wrong"].forEach((className) =>
    answerNode.classList.remove(className)
  );
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
