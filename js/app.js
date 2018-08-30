'use strict';

// Define global variables
var loadSheet = [];
var printList = [[], []];


//Constructors
function Blackjack(count) {
  if (!isNaN(count)) {
    this.need = true;
  } else {
    this.need = false;
  }
  this.name = 'Blackjack';
  this.ring = count;
  this.skirt = count;
  this.shoe = count;
  this.tray = count;
  this.dealer = count;
}

function Celeb(count) {
  if (!isNaN(count)) {
    this.need = true;
  } else {
    this.need = false;
  }
  this.name = 'Celeb';
  this.ring = count;
  this.skirt = count;
  this.celebDecks = 2 * count;
  this.celebTray = count;
  this.celebSign = count;
}

function Roulette(need, tableSize, wheelSize) {
  this.need = need;
  this.name = 'Roulette';
  this.tableSize = tableSize;
  this.wheelSize = wheelSize;
  this.rouletteSkirt = tableSize;
  this.tray = 1;
  this.dealer = 1;
}

function TexasHoldem(count, needChairs) {
  if (!isNaN(count)) {
    this.need = true;
  } else {
    this.need = false;
  }
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

function Craps(need, tableSize) {
  this.need = need;
  this.name = 'Craps';
  this.tablesize = tableSize;
  this.parts = createCrapsParts('parts');
  this.tubs = createCrapsParts('tubs');
}

function createCrapsParts(crapsStuff) {

  if (crapsStuff === 'parts') {
    var crapsParts = [
      ['Set Legs', '12\' leg rails', 'Set Legs Rails (bags)', 'Set Top Side Rails (bags)', 'Cloth (in rail bag)', 'Stick (in rail bag)', 'Piece Table Top', 'Set End Caps'],
      [1, 1, 1, 1, 1, 1, '', 1]
    ];

    return crapsParts;

  }


  if (crapsStuff === 'tubs') {
    var crapsTub = [
      ['Craps Skirt', 'Set Dice (5 per set)', 'Dice Boat', 'On/Off Pucks', 'Buy/Lay buttons', 'On/Off Buttons', 'Chip Trays', 'Tray Stand', 'Table Brush', 'Table Brush', 'Rope Light/ext cord'],
      [1, 1, 1, 2, 4, 4, 2, 1, 1, 1]
    ];
    return crapsTub;
  }
}

function PitBossTub() {
  this.pitBossTub = [
    ['Raffle Tickets', 'Band Aids', 'Shaving Cream', 'Duct Tape', 'Glass Cleaner', 'Biz Cards', 'Voucher Cards', 'Red Pens', 'Deodorant', 'Razor', 'Armor All', 'Black Garbage Bags', 'White Garbage Bags'],
    ['', '', '', '', '', '', '', '', '', '', '', '', '']
  ];
}


// addEventListener('submit', processSubmit);

function fillLoadSheet(event) {
  loadSheet = [];
  var blackjackCount = parseInt(event.target.blackjackQuantity.value);
  var celebCount = parseInt(event.target.celebQuantity.value);
  var rouletteNeed = document.getElementById('roulette').checked;
  var rouletteTableSize = event.target.rouletteTableSize.value;
  var rouletteWheelSize = event.target.rouletteWheelSize.value;
  var holdemCount = parseInt(event.target.holdemQuantity.value);
  var holdemChairs = document.getElementById('holdemChairs').checked;
  var crapsNeed = document.getElementById('craps').checked;
  var crapsTableSize = event.target.crapsTableSize.value;

  loadSheet = [
    (new Blackjack(blackjackCount)),
    (new Celeb(celebCount)),
    (new Roulette(rouletteNeed, rouletteTableSize, rouletteWheelSize)),
    (new Craps(crapsNeed, crapsTableSize)),
    (new TexasHoldem(holdemCount, holdemChairs)),
    (new PitBossTub())
  ];
  console.log(loadSheet);
}

function saveLoadSheetLocal() {
  localStorage.setItem('loadSheet', JSON.stringify(loadSheet));
}



// Calculate combined item totals
function getSubTotals() {
  var regularRingTotal = 0;
  var blackjackSkirtTotal = 0;
  var regularTrayTotal = 0;
  var sixBySix = 0;

  // Calculate regular trays
  for (var i = 0; i < loadSheet.length; i++) {
    // console.log(loadSheet[i].ring);
    if (loadSheet[i].tray) {
      regularTrayTotal += (loadSheet[i].tray);
    }
    if (loadSheet[i].ring) {
      regularRingTotal += (loadSheet[i].ring);
    }

    // console.log(regularTrayTotal);

  }
  blackjackSkirtTotal = regularRingTotal;

  if (regularTrayTotal => 6) {
    sixBySix = Math.floor(regularTrayTotal / 6);
    regularTrayTotal = regularTrayTotal - (sixBySix * 6);
    blackjackSkirtTotal = blackjackSkirtTotal - (sixBySix * 6);
  }

  // console.log(sixBySix, blackjackSkirtTotal, regularTrayTotal);

  return [sixBySix, blackjackSkirtTotal, regularTrayTotal, regularRingTotal];
}

function printPreviewList() {
  // var sixBySix, blackjackSkirtTotal, regularTrayTotal, regularRingTotal = 0;

  // [sixBySix, blackjackSkirtTotal, regularTrayTotal, regularRingTotal] = getSubTotals();

  // console.log(sixBySix, blackjackSkirtTotal, regularTrayTotal, regularRingTotal);

  for (var i = 0; i < loadSheet.length; i++) {
    printList[0][i] = loadSheet[i].name;
    printList[1][i] = loadSheet[i].count;

  }

}


// tempList = [];
// var i = 0;
// while (loadSheet[i]){
//   var n=0;
//   while (loadSheet[i])
// }

// function InventoryNeeded() {

// }


