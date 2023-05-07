const btnRoll = document.querySelector('.btn--roll'); //Бросить кубик
const btnNew = document.querySelector('.btn--new'); //Новая игра
const btnHold = document.querySelector('.btn--hold'); //Оставить

let player0Element = document.querySelector('.player--0'); // 1 игрока
let player1Element = document.querySelector('.player--1'); // 2 игрока
let playerElement = document.querySelector('.player'); //Игроки

let score0Element = document.querySelector('#score--0'); //Счет 1 игрока
let score1Element = document.querySelector('#score--1'); //Счет 2 игрока
let current0Score = document.querySelector('#current--0'); //Тукущий счет игрока 1
let current1Score = document.querySelector('#current--1'); //Тукущий счет игрока 2

let diceElement = document.querySelector('.dice'); //Кубик
//////////////////////////////////////////////////
score0Element.textContent = '0';
score1Element.textContent = '0';
diceElement.classList.add('hidden');

let currentScore = [0, 0];
let currentPlayer = 0;
let score = 0;
let isPlayer = true;

const replacementPlayer = function () {
  document.querySelector(`#score--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
  score = 0;
};

const rollDice = function () {
  if (isPlayer) {
    const numRandom = Math.round(Math.random() * 5) + 1;
    diceElement.style.display = 'block';
    diceElement.src = `dice${numRandom}.png`;

    if (numRandom !== 1) {
      score += numRandom;
      document.querySelector(`#score--${currentPlayer}`).textContent = score;
    } else {
      replacementPlayer();
    }
  }
};

const stopGames = function () {
  if (isPlayer) {
    currentScore[currentPlayer] += score;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore[currentPlayer];

    if (currentScore[currentPlayer] >= 100) {
      isPlayer = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
    } else {
      replacementPlayer();
    }
  }
};

const newGames = function () {
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  diceElement.style.display = 'none';
  score0Element.textContent = '0';
  score1Element.textContent = '0';
  current0Score.textContent = '0';
  current1Score.textContent = '0';
  currentPlayer = 0;
  currentScore = [0, 0];
  score = 0;
  isPlayer = true;
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', stopGames);
btnNew.addEventListener('click', newGames);
