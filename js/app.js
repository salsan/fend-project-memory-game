/*
 * Create a list that holds all of your cards
 */

const cardsIcon = ["fa-diamond", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-bomb"];


const deck = document.querySelector(".deck");
const cardsList = deck.getElementsByTagName("li");
const resetBoard = document.querySelector(".fa-repeat");
const starsBoard = document.querySelector(".stars");
const timerBoard = document.querySelector("time");
let timerBoardId;
let cardsOpen = 0;
let cardLast = '';
let cardsCount = 0;
let cardsMatched = 0;
/* Timer Variable */
let initTime = 0;
let t = 0;
/* Model Variable */
/* Get the modal */
let modal = document.getElementById('myModal');
/* Get the button that opens the modal */
let btn = document.getElementById("myBtn");
/* Get the <span> element that closes the modal */
let span = document.getElementsByClassName("close")[0];
let modalMessage = document.querySelector(".modal-message");
let modalRestart = document.querySelector("button");
let modalWindow = document.getElementById("myModal");
/* Stars */
let starsCount = 3;
const starsIcons = document.getElementsByClassName("fa-star");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/* close card if is not matched*/

function closeCard(value) {
  let cardClose = document.getElementsByClassName("open");
  cardClose[0].className = "card";

  cardClose[0] = document.getElementsByClassName("open");
  cardClose[0].className = "card";

  document.body.style.pointerEvents = 'auto';
}

/* show card if matched */
function matchedCard(value) {

  let cardMatched = document.getElementsByClassName("open");
  cardMatched[0].className = "card match show";


  cardMatched = document.getElementsByClassName("open");
  cardMatched[0].className = "card match show";
  document.body.style.pointerEvents = 'auto';

  if (cardsMatched == 8) {
    finishGame();
  }

}

/* Manage event if click card on the board */

function clickCard(evt) {

  let isCard = evt.target.className;

  if (isCard == "card") {

    if (initTime == 0) {

      timerBoardId = setInterval(function() {
          initTimerBoard();
      }, 1000);
      initTime++;
    }

    let cardCurrent = evt.target.querySelector("i").className;

    cardsOpen++;

    if (cardsOpen <= 2) {

      evt.target.className = "card open show";

      if (cardsOpen == 2) {
        if (cardLast == cardCurrent) {
          cardsMatched++;
          setTimeout(function() {
            matchedCard(cardLast);
          }, 800);
        } else {
          setTimeout(function() {
            closeCard(cardLast);
          }, 800);
        }

        cardsCount++;
        cardsOpen = 0;
        document.body.style.pointerEvents = 'none';
        initMovesCounter(cardsCount);

        /* */
        switch (cardsCount) {
          case 12:
          case 24:
          case 48:
            starsCount--;
            starsIcons[starsCount].style.display = "none";
            break;

        }


      }

      cardLast = evt.target.querySelector("i").className;

    }
  }

}

/* Moves Counter*/
function initMovesCounter(value) {
  const movesCount = document.querySelector(".moves");
  movesCount.innerHTML = value;
}

/* Initialize the board with the cards */
function initBoard(card, index) {
  cardsList[index].querySelector("i").className = "fa " + card;
  cardsList[index].className = "card";
  cardsList[index].addEventListener('click', clickCard);
}

/* Manage time of game */
function initTimerBoard() {
  timerBoard.innerHTML = t + "s";
  t++;
}

/* Initialize the board game */
function initGame() {
  let cardShuffle = shuffle(cardsIcon);
  cardShuffle.forEach(initBoard);
  for (var i = 0; i < starsIcons.length; i++) {
    starsIcons[i].style.display = "inline-block";
  }

  cardsCount = 0;
  starsCount = 3;
  /* reset moves  counter */
  initMovesCounter(0);

}

/* Reset event and board game */
function resetGame() {
  clearInterval(timerBoardId);
  t = 0;
  initTime = 0;
  cardsMatched = 0;
  timerBoard.innerHTML = t + "s";
  initGame();
}

/* Display winning message */
function finishGame() {
  modalMessage.innerText = "You are winner!!! in " + t + " seconds with " + starsCount + " stars";
  modalWindow.style.display = "block";
  resetGame();
}

function startGame() {
  modalWindow.style.display = "none";
  resetGame();
}


initGame();

/* Event Reset Board */
resetBoard.addEventListener('click', resetGame);
modalRestart.addEventListener('click', startGame);
