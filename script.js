// let cards array hold each card
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("card-deck");

// let move variable start at zero and have one move be counted as two opened cards
let moves = 0;
let counter = document.querySelector(".moves");

// let stars be equal to star icons
let stars = document.querySelectorAll(".fa-star");

//let matched card be represented by cards with class match
let matchedCard = document.getElementsByClassName("match");

// let stars list be equal to li with class of star
let starsList = document.querySelectorAll(".stars li");

// let close icon be the x used to close popUp
let closeIcon = document.querySelector(".close");

//let popUp be element with id popup1
let popUp = document.getElementById("popup1");

// empty array for opened cards
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
  // let moves = 0;
  // counter.innerHTML = moves;
  // reset rating
  for (let i=0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
  // reset timer when new game starts
  // let timer = document.querySelector(".timer");
  // timer.innerHTML = "0 mins 0 secs";
  //clear any running interval
  // clearInterval(interval);
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
    // when two cards have been opened run moveCounter function
    moveCounter();
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
  // after 1.1s remove show, open, and unmatched classes from both cards in openedCards array, allows non-matches to be clicked and added to openedCards array again and checked for new match or unmatch
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

//game to display current number of moves a player has made
function moveCounter() {
  // add 1 to move variable
  moves++;
  counter.innerHTML = moves;

  //start timer on first move
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }

  // set a star rating based on number of moves made
  // if number of moves is greater than 8 but less than 12
  if (moves > 8 && moves < 12) {
    // for each star
    for (i = 0; i < 3; i++) {
      //if 2 or more stars
      if(i > 1) {
        // collapse visibility 
        stars[i].style.visibility = "collapse";
      }
    }
    // else if moves are greater than 13 
  } else if (moves > 13) {
    // for each star
    for (i = 0; i < 3; i++) {
      // if 1 or more stars
      if (i > 0) {
        // collapse visibility
        stars[i].style.visibility = "collapse"; 
      }
    }
  }
}

//when player starts game, timer to start
//once player wins game, timer to stop
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute+"mins "+second+"secs";
    second++;
    if(second == 60) {
      minute++;
      second = 0;
    }
    if(minute == 60) {
      hour++;
      minute = 0;
    }
  },1000);
}

// have a congratulations pop-up appear when player wins the game, i.e. when matched card array contains all 16 cards in deck
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    //display pop-up
    popUp.classList.add("show");
    //let star rating equal number of stars
    let starRating = document.querySelector(".stars").innerHTML;
    //display number of moves
    document.getElementById("finalMove").innerHTML = moves;
    // display star rating
    document.getElementById("starRating").innerHTML = starRating;
    //display total time
    document.getElementById("totalTime").innerHTML = finalTime;
    //close icon for popUp
    closePopUp();
  };
}

//close popUp
function closePopUp() {
  closeIcon.addEventListener("click", function() {
    popUp.classList.remove("show");
    startGame();
  });
}

// function to play again
function playAgain() {
  popUp.classList.remove("show");
  startGame();
}

// for each card attach an event listener for click, then run display card function
for (i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
};