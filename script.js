// cards array will hold all cards 
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declare move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variable for star icons
const stars = document.querySelectorAll(".fa-star");

//declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// stars list
let starsList = document.querySelectorAll(".stars li");

// close icon in modal
let closeIcon = document.querySelector(".close");

//declare modal 
let modal = document.getElementById("popup1");

// array for opened cards
let openedCards = [];

// display card function toggles between open and show classes to display card on click
const displayCard = function() {
  // open cards
  this.classList.toggle("open");
  // shows card
  this.classList.toggle("show");
  // once card has been shown, it cannot be clicked on again until it has been closed
  this.classList.toggle("disabled");
}

// for each card attach an event listener for click, then run display card function
for (i = 0; i < cards.length; i++){
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
};

// shuffle deck of cards on load or restart using Fisher-Yates Shuffle
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex; 

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// function to start game
function startGame() {
  // empty the openCards array
  openedCards = [];
  // shuffle cards and array and save in new shuffleCards array
  cards = shuffle(cards);
  // for each card in the shuffled array
  for (var i =0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item){
      //display each card in the deck on the screen
      deck.appendChild(item);
    });
    // remove all existing classes for each card
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // reset moves
  // reset rating
  // reset timer
}

// once the window page has loaded, run start game function to ensure that a shuffled deck in displayed
window.onload = startGame();


//once card has been opened, add to OpenedCards list and then check if cards are a match, function runs on every click of a card
function cardOpen() {
  // push clicked card to array to keep track of opened cards
  openedCards.push(this);
  const arrayLength = openedCards.length;
  // if cards in array is equal to 2 (two cards needed to check for match) check if cards match
  if(arrayLength === 2) {
    // add to move count
    // moveCounter();
    // if type of open cards are equal
    if(openedCards[0].type === openedCards[1].type){
      // run match function
      matched();
    } else {
      // run unmatch function
      unmatched();
    }
  }
};

// if cards are match
function matched() {
  //add class of match for css for both cards in openedCards array
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  // remove class of show and open for css for both cards in openCards array
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  // empty openedCards array, to allow next pair to be selected and checked for match or unmatch
  openedCards = [];
}

// if cards do not match
function unmatched() {
  // add class of unmatched for both cards in openedCards array
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  // run disable function, to disallow player from opening more than two cards
  disable();
  // after set time remove show, open, and unmatched classes from both cards in openedCards array, allows non-matches to be clicked and added to openedCards array again and checked for new match or unmatch
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open", "unmatched");
    openedCards[1].classList.remove("show", "open", "unmatched");
    // run enable function to allow player to start opening another two cards
    enable();
    //empty openedCards array, to allow next pair to be selected and checked for match or unmatch
    openedCards = [];
  }, 1100);
}

//temporarily disable cards if non-match, to stop player from opening more than two cards at a time
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    // add class of disabled to clicked card
    card.classList.add('disabled');
  });
}

// enable and disabled matched cards 
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    // remove class of disabled
    card.classList.remove('disabled');
    // for each card in matched card array
    for(let i = 0; i < matchedCard.length; i++) {
      // add class of disabled to stop players from re-clicking previously matched cards
      matchedCard[i].classList.add('disabled');
    }
  });
}
