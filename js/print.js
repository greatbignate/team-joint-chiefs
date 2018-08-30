'use strict';

var loadSheet = [];
var tables = 'tables';
var rings = 'rings';
var trays = 'trays';
var dealers = 'dealers';
var craps = 'craps';
var roulette = 'roulette';
var skirts = 'skirts';
var accessories = 'accessories';
var pitboss = 'pitboss';
var sixBySix = 'sixbysix';
var subTotals = [];
var shoes = 'shoes';

loadSheet = JSON.parse(localStorage.getItem('loadSheet'));

function weakestLink() {
  for (var i = 0; i < loadSheet.length; i++) {
    if (!loadSheet[i].need) {
      loadSheet.splice(i, 1);
      i--;
    }
  }
}

function getSubTotals() {
  var regularRingTotal = 0;
  var blackjackSkirtTotal = 0;
  var regularTrayTotal = 0;
  var sixBySix = 0;
  var dealersTotal = 0;
  var tablesTotals = 0;

  // Calculate regular trays
  for (var i = 0; i < loadSheet.length; i++) {
    // console.log(loadSheet[i].ring);
    if (loadSheet[i].tray) {
      regularTrayTotal += (loadSheet[i].tray);
      dealersTotal += (loadSheet[i].tray);
    }
    if (loadSheet[i].ring) {
      regularRingTotal += (loadSheet[i].ring);
    }

    // console.log(regularTrayTotal);

  }
  blackjackSkirtTotal = regularRingTotal;

  if (regularTrayTotal >= 6) {
    sixBySix = Math.floor(regularTrayTotal / 6);
    regularTrayTotal = regularTrayTotal - (sixBySix * 6);
    blackjackSkirtTotal = blackjackSkirtTotal - (sixBySix * 6);
  }

  // console.log(sixBySix, blackjackSkirtTotal, regularTrayTotal);

  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack') {
      // buildTables(loadSheet[i].tray, loadSheet[i].name, tables);
      tablesTotals += loadSheet[i].tray;
    } else if (loadSheet[i].name === 'Celeb') {
      // buildTables(loadSheet[i].celebTray, loadSheet[i].name, tables);
      tablesTotals += loadSheet[i].celebTray;
    } else if (loadSheet[i].name === 'Roulette') {
      // buildTables(loadSheet[i].tray, loadSheet[i].name, tables);
      tablesTotals += 1;
    }
    else if (loadSheet[i].name === 'Texas Hold\'em') { // this may not work!
      // buildTables(loadSheet[i].pokerTray, loadSheet[i].name, tables);
      tablesTotals += loadSheet[i].pokerTray;
    }
    else if (loadSheet[i].name === 'Craps') {
      // buildTables(loadSheet[i].tablesize, loadSheet[i].name, tables); // mostly working, just not displaying table size
      tablesTotals += 1;

    }
  }

  return [sixBySix, blackjackSkirtTotal, regularTrayTotal, regularRingTotal, dealersTotal, tablesTotals];
}

function buildTables(count, description, tableName) {
  var tableEl = document.getElementById(tableName);

  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = count;
  trEl.appendChild(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = '';
  trEl.appendChild(tdEl);

  tdEl = document.createElement('td');
  tdEl.textContent = description;
  trEl.appendChild(tdEl);

  tableEl.appendChild(trEl);
}

function addTitle(name, entry) {
  var titleText = document.getElementById(name);
  var elText = document.createTextNode(entry);
  titleText.appendChild(elText);
}


function renderTableType() {
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack') {
      addTitle(tables, 'TABLES');
      buildTables(loadSheet[i].tray, loadSheet[i].name, tables);
    } else if (loadSheet[i].name === 'Celeb') {
      buildTables(loadSheet[i].celebTray, loadSheet[i].name, tables);
    } else if (loadSheet[i].name === 'Roulette') {
      buildTables(loadSheet[i].tray, loadSheet[i].name, tables);
    }
    else if (loadSheet[i].name === 'Texas Hold\'em') { // this may not work!
      buildTables(loadSheet[i].pokerTray, loadSheet[i].name, tables);
    }
    else if (loadSheet[i].name === 'Craps') {
      buildTables(loadSheet[i].tablesize, loadSheet[i].name, tables); // mostly working, just not displaying table size
    }
  }
}


function renderRingType() {
  if (subTotals[3] !== 0) {
    addTitle(rings, 'TRIM RINGS');
    buildTables(subTotals[3], 'D-Ring Regular', rings);
  }
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Roulette') {
      buildTables(loadSheet[i].tray, loadSheet[i].tableSize + 'Roulette Ring', rings);
    }
  }
}

function renderSixBySix() {
  if (subTotals[0] !== 0) {
    addTitle(sixBySix, '6 x 6');
    buildTables(subTotals[0], 'Six By Six', sixBySix);
  }
}

function renderTrayType() {
  if (subTotals[2] !== 0) {
    addTitle(trays, 'TRAYS');
    buildTables(subTotals[2], 'Regular Trays', trays);
  }
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Celeb') {
      buildTables(loadSheet[i].celebTray, 'Celebrity Trays', trays);
    }
  }
  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Texas Hold\'em') {
      buildTables(loadSheet[i].pokerTray, 'Poker Tray', trays);
    }
  }
}

function renderDealerItems() {
  addTitle(dealers, 'DEALER ACCESSORIES');
  buildTables(subTotals[4], 'Tux Shirts', dealers);
  buildTables(subTotals[4], 'Set-up T-Shirts', dealers);
  buildTables(subTotals[4], 'Stud Kits', dealers);
  buildTables(subTotals[4], 'Bow Ties', dealers);
  buildTables(subTotals[4], 'Cummerbunds', dealers);
}

function renderCrapsAll() {
  for (var i = 0; i<loadSheet.length; i++) {
    if (loadSheet[i].name === 'Craps') {
      if (loadSheet[i].tablesize !== '12-1' || loadSheet[i].tablesize !== '12-2') {
        loadSheet[i].parts[0].splice(1,1);
        loadSheet[i].parts[1].splice(1,1);
      }
      for (var n = 0; n<loadSheet[i].parts[0].length; n++) {
        addTitle(craps, 'CRAPS ITEMS');
        buildTables(loadSheet[i].parts[1][n] +'per', loadSheet[i].parts[0][n],craps);
      }
    }
  }
  buildTables('Craps','Tub Items',craps);
  for (i=0; i<loadSheet.length; i++) {
    if (loadSheet[i].name === 'Craps') {
      for (n = 0; n<loadSheet[i].tubs[0].length; n++) {
        buildTables(loadSheet[i].tubs[1][n] +'per', loadSheet[i].tubs[0][n], craps);
      }
    }
  }
}

function renderRouletteItems() {
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Roulette') {
      addTitle(roulette, 'ROULETTE');
      buildTables(loadSheet[i].wheelSize, 'Roulette Wheel', roulette);
      buildTables(2, 'Markers', roulette);
      buildTables(2, 'Balls', roulette);
      buildTables(2, 'Pay Sheets', roulette);
    }
  }
}

function renderSkirtsType() {
  if (subTotals[1] !== 0) {
    addTitle(skirts, 'SKIRTS');
    buildTables(subTotals[1], 'Regular Skirts', skirts);
  }
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Roulette') {
      buildTables(loadSheet[i].rouletteSkirt, 'Roulette Skirt', skirts);
    }
  }
}

function renderAccessories() {
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Celeb') {
      addTitle(accessories, 'GAMING ACCESSORIES');
      buildTables(loadSheet[i].celebSign, 'Celebrity Signs', accessories);
    }
  }
  buildTables(1, 'Raffle Drum', accessories);
  buildTables(subTotals[5] * 20, '30,000 Chits', accessories);
  buildTables(subTotals[5] * 10, 'Coasters', accessories);
  buildTables(subTotals[5], 'Ticket Bags', accessories);
  buildTables(subTotals[4], 'Dealer Towels', accessories);
  buildTables(1, 'Hand Truck', accessories);
  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Texas Hold\'em') {
      buildTables(loadSheet[i].button, 'Dealer Button', accessories);
      buildTables(loadSheet[i].cushion, 'Dealer Cushion', accessories);
      buildTables(loadSheet[i].chairs, 'Chairs', accessories); // may require if statement
    }
  }
}

function renderPitBoss() {
  var boss = new PitBossTub();
  for (var i = 0; i < boss.pitBossTub[0].length; i++) {
    addTitle(pitboss, 'PITBOSS TUB');
    buildTables(' ', boss.pitBossTub[0][i], pitboss);
  }
}

function renderShoes() {
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack') {
      addTitle(shoes, 'SHOES/CARDS');
      buildTables(loadSheet[i].shoe, '4 Deck Shoe', shoes);
      buildTables(loadSheet[i].shoe, 'Discard Holders', shoes);
    }
  }
  for (i = 0; i < loadSheet.length; i++){
    if (loadSheet[i].name === 'Celeb') {
      buildTables(loadSheet[i].celebDecks, 'Cut Cards', shoes);
      buildTables(loadSheet[i].celebDecks, 'Red Card Deck', shoes);
    }
  }
  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Texas Hold\'em') {
      buildTables(loadSheet[i].holdemDecks, 'Poker Cards', shoes);
    }
  }
}

function processPrint(event) {
  subTotals = getSubTotals();
  weakestLink();
  renderTableType();
  renderRingType();
  renderSixBySix();
  renderTrayType();
  renderDealerItems();
  renderRouletteItems();
  renderCrapsAll();
  renderSkirtsType();
  renderAccessories();
  renderPitBoss();
  renderShoes();
}

var printButton = document.getElementById('printypritny');

printButton.addEventListener('click', printLoadSheet);
// addEventListener('submit', processPrint);
// addEventListener()

function printLoadSheet() {
  window.print();
}

processPrint();