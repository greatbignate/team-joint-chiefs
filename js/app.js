'use strict';

// Define global variables
var loadSheet = [];

//Constructors
function Blackjack(count) {
  this.ring = count;
  this.skirt = count;
  this.shoe = count;
  this.chips = count;
}

function Celeb(count) {
  this.ring = count;
  this.skirt = count;
  this.celebDecks = 2*count;
  this.chips = count;
  this.celebSign = count;
}

function Roulette(tableSize, wheelSize) {
  this.tableSize = tableSize;
  this.wheelSize = wheelSize;
  this.skirt = 1;
  this.chips = 1;
}

function TexasHoldem (count, needChairs) {
  if (needChairs) {
    this.chairs = count*10;
  } else {
    this.chairs = 0;
  }
  this.holdemDecks = count;
}

function Craps (tableSize) {
  this.tablesize = tableSize;
  this.parts = [];
  this.tubs = [];
}

// Craps.prototype.parts
var printPreview = document.getElementById('printpreview');
printPreview.addEventListener('submit',processSubmit);

function fillLoadSheet () {
  loadSheet = [];
  var blackjackCount = event.target.blackjackQuantity.value;
  var celebCount = event.target.celebQuantity.value;
  var rouletteTableSize = event.target.rouletteTableSize.value;
  var rouletteWheelSize = event.target.rouletteWheelSize.value;
  var holdemCount = event.target.rouletteQuantity.value;
  var crapsTableSize = event.target.crapsTableSize.value;
  
  loadSheet.push(new Blackjack(blackjackCount));
  loadSheet.push(new Celeb(celebCount));
  loadSheet.push(new Roulette(rouletteTableSize,rouletteWheelSize));
  loadSheet.push(new TexasHoldem(holdemCount));
  loadSheet.push(new Craps(crapsTableSize));
}
fillLoadSheet();

function processSubmit (event) {
  event.preventDefault();
  fillLoadSheet();
}