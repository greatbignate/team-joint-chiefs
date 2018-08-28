'use strict';

// Define global variables
var loadSheet = [];
var STORE_SHEET = [];

//Constructors
function Blackjack(count) {
  this.ring = count;
  this.skirt = count;
  this.shoe = count;
  this.tray = count;
  this.dealer = count;
}

function Celeb(count) {
  this.ring = count;
  this.skirt = count;
  this.celebDecks = 2*count;
  this.celebTray = count;
  this.celebSign = count;
}

function Roulette(tableSize, wheelSize) {
  this.tableSize = tableSize;
  this.wheelSize = wheelSize;
  this.skirt = 1;
  this.tray = 1;
  this.dealer = 1;
}

function TexasHoldem (count, needChairs) {
  if (needChairs) {
    this.chairs = count*10;
  } else {
    this.chairs = 0;
  }
  this.holdemDecks = count;
  this.pokerTray = count;
  this.dealer = count;
  this.button = count;
  this.cushion = count;
}

function Craps (tableSize) {
  this.tablesize = tableSize;
  this.parts = [];
  this.tubs = [];
}

// function InventoryNeeded () {}

// Craps.prototype.parts
// var printPreview = document.getElementById('printPreview');
// printPreview.
addEventListener('submit',processSubmit);

function fillLoadSheet (event) {
  loadSheet = [];
  var blackjackCount = event.target.blackjackQuantity.value;
  var celebCount = event.target.celebQuantity.value;
  var rouletteTableSize = event.target.rouletteTableSize.value;
  var rouletteWheelSize = event.target.rouletteWheelSize.value;
  var holdemCount = event.target.holdemQuantity.value;
  var crapsTableSize = event.target.crapsTableSize.value;

  loadSheet = [
    (new Blackjack(blackjackCount)),
    (new Celeb(celebCount)),
    (new Roulette(rouletteTableSize,rouletteWheelSize)),
    (new TexasHoldem(holdemCount, false)),
    (new Craps(crapsTableSize)),
  ];
  console.log(loadSheet);
}

// localStorage.setItem(STORE_SHEET, JSON.stringify(loadSheet));
function saveLoadSheetLocal (){
  localStorage.setItem(STORE_SHEET, JSON.stringify(loadSheet));
}

function processSubmit (event) {
  console.log('click');
  event.preventDefault();
  fillLoadSheet(event);
  saveLoadSheetLocal();
}

// InventoryNeeded.prototype.blackjack