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
let initTime = 0;
let cardsCount = 0;
let cardsMatched = 0;
let t = 0;


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



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/* TODO need fix*/
 function closeCard(value){
   let cardClose = document.getElementsByClassName("open");
   cardClose[0].className = "card";

   cardClose[0] = document.getElementsByClassName("open");
   cardClose[0].className = "card";

   document.body.style.pointerEvents = 'auto';
}

 function matchedCard(value){

   let cardMatched = document.getElementsByClassName("open");
   cardMatched[0].className = "card match show";


   cardMatched = document.getElementsByClassName("open");
   cardMatched[0].className = "card match show";
   document.body.style.pointerEvents = 'auto';

 }

function clickCard(evt) {

  let isCard = evt.target.className;

  if (isCard == "card") {

    if ( initTime == 0 ){

      timerBoardId = setInterval(function(){ initTimerBoard() }, 1000);
      console.log("The card value " +initTime);
      initTime++;
    }

    let cardCurrent = evt.target.querySelector("i").className;

    cardsOpen++;

    if (cardsOpen <= 2) {

      evt.target.className  = "card open show";

      if ( cardsOpen == 2 ){
        if (cardLast == cardCurrent) {
            setTimeout(function() {
              matchedCard(cardLast);
              cardsMatched++;
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
        }


    }

    cardLast = evt.target.querySelector("i").className;
  }

  console.log(cardsCount);
}

/* Moves Counter*/
function initMovesCounter(value) {
  const movesCount = document.querySelector(".moves");
  movesCount.innerHTML = value;
}

function initBoard(card, index) {
  cardsList[index].querySelector("i").className = "fa " + card;
  cardsList[index].className = "card";
  cardsList[index].addEventListener('click', clickCard);
}

function initTimerBoard(){

    timerBoard.innerHTML = t + "s";

    t++;


}

function initGame(){
  let cardShuffle = shuffle(cardsIcon);
  cardShuffle.forEach(initBoard);
  cardsCount = 0;
  /* reset moves  counter */
  initMovesCounter(0);

}

function resetGame(){
  clearInterval(timerBoardId);
  t = 0;
  initTime = 0;
  timerBoard.innerHTML = t + "s";
  initGame();
}

initGame();

/* Event Reset Board*/
resetBoard.addEventListener('click', resetGame);
