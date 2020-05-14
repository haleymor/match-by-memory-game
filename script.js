// cards array holds all cards 
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards 
const deck = document.getElementById("card-deck");

// declare move variable
let moves = 0;
let counter = document.querySelector(".moves");


//toggles open and show class to display card
const displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
}

// loop to add event listeners for click to each card
for (i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", displayCard);
  };