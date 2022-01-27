'use strict';
//Selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
// variables to be declared
let currentScore, activePlayer, score, playing;
//starting conditions

function init() {
  diceEL.classList.add('hidden');
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
}
init();
// switch player functionality
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
}
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display the dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //3.Check if the dice shows 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1. Add current score to active player's score
  score[activePlayer] += currentScore;
  // console.log(score[activePlayer]);
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  //2. Check if Player's score is >=100
  //If so finish the game
  if (score[activePlayer] >= 100) {
    playing = false;
    diceEL.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
    switchPlayer();
  }

  //Switch to the next player
  switchPlayer();
});
btnNew.addEventListener('click', init);
