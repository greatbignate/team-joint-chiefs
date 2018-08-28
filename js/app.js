'use strict';

// Define global variables
var loadSheet = [];
var printList = [[], []];

//Constructors
function Blackjack(count) {
  this.name = 'Blackjack';
  this.ring = count;
  this.skirt = count;
  this.shoe = count;
  this.tray = count;
  this.dealer = count;
}

function Celeb(count) {
  this.name = 'Celeb';
  this.ring = count;
  this.skirt = count;
  this.celebDecks = 2 * count;
  this.celebTray = count;
  this.celebSign = count;
}

function Roulette(tableSize, wheelSize) {
  this.name = 'Roulette';
  this.tableSize = tableSize;
  this.wheelSize = wheelSize;
  this.rouletteSkirt = tableSize;
  this.tray = 1;
  this.dealer = 1;
}

function TexasHoldem(count, needChairs) {
  this.name = 'Texas Hold\'em';
  this.holdemDecks = count;
  this.pokerTray = count;
  this.dealer = count;
  this.button = count;
  this.cushion = count;
  if (needChairs) {
    this.chairs = count * 10;
  } else {
    this.chairs = 0;
  }
}

function Craps(tableSize) {
  this.name = 'Craps';
  this.tablesize = tableSize;
  this.parts = [];
  this.tubs = [];
}

// function InventoryNeeded () {}

// Craps.prototype.parts
// var printPreview = document.getElementById('printPreview');
// printPreview.
addEventListener('submit', processSubmit);

function fillLoadSheet(event) {
  loadSheet = [];
  var blackjackCount = parseInt(event.target.blackjackQuantity.value);
  var celebCount = parseInt(event.target.celebQuantity.value);
  var rouletteTableSize = event.target.rouletteTableSize.value;
  var rouletteWheelSize = event.target.rouletteWheelSize.value;
  var holdemCount = parseInt(event.target.holdemQuantity.value);
  var crapsTableSize = event.target.crapsTableSize.value;

  loadSheet = [
    (new Blackjack(blackjackCount)),
    (new Celeb(celebCount)),
    (new Roulette(rouletteTableSize, rouletteWheelSize)),
    (new TexasHoldem(holdemCount, false)),
    (new Craps(crapsTableSize)),
  ];
  console.log(loadSheet);
}

// localStorage.setItem(STORE_SHEET, JSON.stringify(loadSheet));
function saveLoadSheetLocal() {
  localStorage.setItem('loadSheet', JSON.stringify(loadSheet));
}

function processSubmit(event) {
  console.log('click');
  event.preventDefault();
  fillLoadSheet(event);
  saveLoadSheetLocal();
}

// function InventoryList {

// }

// InventoryList.prototype.tables() { }


// Calculate combined item totals
function getSubTotals() {
  var regularRingTotal = 0;
  var blackjackSkirtTotal = 0;
  var regularTrayTotal = 0;
  var sixBySix = 0;

  // Calculate regular trays
  for (var i = 0; i < loadSheet.length; i++) {
    console.log(loadSheet[i].ring);
    if (loadSheet[i].tray) {
      regularTrayTotal += (loadSheet[i].tray);
    }
    if (loadSheet[i].ring) {
      regularRingTotal += (loadSheet[i].ring);
    }

    console.log(regularTrayTotal);

  }
  blackjackSkirtTotal = regularRingTotal;

  if (regularTrayTotal => 6) {
    sixBySix = Math.floor(regularTrayTotal / 6);
    regularTrayTotal = regularTrayTotal - (sixBySix * 6);
    blackjackSkirtTotal = blackjackSkirtTotal - (sixBySix * 6);
  }

  console.log(sixBySix, blackjackSkirtTotal, regularTrayTotal);

  return [sixBySix, blackjackSkirtTotal, regularTrayTotal, regularRingTotal];
}

