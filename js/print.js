'use strict';

//Global Variables
var subTotals = []; //Populates when function processPrint is called on page load. Used in most functions.

//Populate loadSheet and logistics from local storage
var loadSheet = JSON.parse(localStorage.getItem('loadSheet'));
var logistics = JSON.parse(localStorage.getItem('logistics'));

//remove objects from loadSheet that have null or zero values
function weakestLink() {
  for (var i = 0; i < loadSheet.length; i++) {
    if (!loadSheet[i].need) {
      loadSheet.splice(i, 1);
      i--;
    }
  }
}

//Collates shared subcomponent of gaming tables
function getSubTotals() {
  var regularRingTotal = 0;
  var blackjackSkirtTotal = 0;
  var regularTrayTotal = 0;
  var sixBySix = 0;
  var dealersTotal = 0;
  var tablesTotals = 0;
  // Check each object in loadSheet and tally up shared items represented by function variables.
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack') {
      tablesTotals += loadSheet[i].tray;
      regularRingTotal += loadSheet[i].ring;
      dealersTotal += loadSheet[i].dealer;
      regularTrayTotal += loadSheet[i].tray;
    } else if (loadSheet[i].name === 'Celeb') {
      tablesTotals += loadSheet[i].celebTray;
      regularRingTotal += loadSheet[i].ring;
    } else if (loadSheet[i].name === 'Roulette') {
      tablesTotals += 1;
      dealersTotal += loadSheet[i].dealer;
      regularTrayTotal += loadSheet[i].tray;
    } else if (loadSheet[i].name === 'Texas Hold\'em') {
      tablesTotals += loadSheet[i].pokerTray;
      dealersTotal += loadSheet[i].dealer;
    } else if (loadSheet[i].name === 'Craps') {
      tablesTotals += 1;
      if (loadSheet[i].tablesize === '7ft' || loadSheet[i].tablesize === '6.5ft' || loadSheet[i].tablesize === '6-2' || loadSheet[i].tablesize === '6-1') {
        dealersTotal += 1;
      } else {
        dealersTotal += 3;
      }
    }
  }
  blackjackSkirtTotal = regularRingTotal;
  // Do calculation for 6x6 packages
  if (regularTrayTotal >= 6) {
    sixBySix = Math.floor(regularTrayTotal / 6);
    regularTrayTotal = regularTrayTotal - (sixBySix * 6);
    blackjackSkirtTotal = blackjackSkirtTotal - (sixBySix * 6);
  }
  return [sixBySix, blackjackSkirtTotal, regularTrayTotal, regularRingTotal, dealersTotal, tablesTotals];
}

//Creates a table row for a pertinent subcomponent
function buildTables(count, description, tableName) {
  // Create variables for all table elements
  var tableEl = document.getElementById(tableName);
  var trEl = document.createElement('tr');
  // First column - typically the number of items to pick
  var tdEl = document.createElement('td');
  tdEl.textContent = count;
  trEl.appendChild(tdEl);
  // Second column - a check box
  tdEl = document.createElement('td');
  tdEl.textContent = '\u25A2';
  trEl.appendChild(tdEl);
  // Third column - typically the name of the item to be picked
  tdEl = document.createElement('td');
  tdEl.textContent = description;
  trEl.appendChild(tdEl);
  tableEl.appendChild(trEl);
}

//Create table header row with item category name
function addTitle(name, entry) {
  var getTable = document.getElementById(name);
  var trEl = document.createElement('tr');
  var elText = document.createElement('th');
  elText.colSpan = 3;
  elText.textContent = entry;
  trEl.appendChild(elText);
  getTable.appendChild(trEl);
}

//Populates data at top of print sheet with customer and logistics data
function renderLogistics() {
  var logisticsLabels = ['Client Name: ', logistics.name, 'Client Location: ', logistics.location, 'Truck to load: ', logistics.truck];
  var logisticsList = document.getElementById('clientdata');
  for (var i = 0; i < logisticsLabels.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = logisticsLabels[i];
    logisticsList.appendChild(liEl);
  }
}

//Creates table of gaming tables - craps tables accounted for in a later function
function renderTableType() {
  var tables = 'tables';
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack' || loadSheet[i].name === 'Celeb' || loadSheet[i].name === 'Texas Hold\'em' || loadSheet[i].name === 'Roulette') {
      addTitle(tables, 'TABLES');
      break;
    }
  }
  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack') {
      buildTables(loadSheet[i].tray, loadSheet[i].name, tables);
    } else if (loadSheet[i].name === 'Celeb') {
      buildTables(loadSheet[i].celebTray, loadSheet[i].name, tables);
    } else if (loadSheet[i].name === 'Roulette') {
      buildTables(loadSheet[i].tray, loadSheet[i].tableSize + ' ' + loadSheet[i].name, tables);
    }
    else if (loadSheet[i].name === 'Texas Hold\'em') {
      buildTables(loadSheet[i].pokerTray, loadSheet[i].name, tables);
    }
  }
}

//Creates a table for quantity and type of table ring
function renderRingType() {
  var rings = 'rings';
  for (var i=0; i<loadSheet.length; i++) {
    if (subTotals[3] !== 0 || loadSheet[i].name === 'Roulette') {
      addTitle(rings, 'TRIM RINGS');
      break;
    }
  }
  if (subTotals[3] !== 0) {
    buildTables(subTotals[3], 'D-Ring Regular', rings);
  }
  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Roulette') {
      buildTables(loadSheet[i].tray, loadSheet[i].tableSize + ' Roulette Ring', rings);
    }
  }
}

//Creates a table if there are enough trays and skirts to load a 6x6 package
function renderSixBySix() {
  var sixBySix = 'sixbysix';
  if (subTotals[0] !== 0) {
    addTitle(sixBySix, '6 x 6');
    buildTables(subTotals[0], 'Six By Six', sixBySix);
  }
}

//Creates a table for quantity and type of chip trays
function renderTrayType() {
  var trays = 'trays';
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

//Creates a table for required dealer accessories for number of dealers
function renderDealerItems() {
  var dealers = 'dealers';
  if (subTotals[4] !== 0) {
    addTitle(dealers, 'DEALER ACCESSORIES');
    buildTables(subTotals[4], 'Tux Shirts', dealers);
    buildTables(subTotals[4], 'Set-up T-Shirts', dealers);
    buildTables(subTotals[4], 'Stud Kits', dealers);
    buildTables(subTotals[4], 'Bow Ties', dealers);
    buildTables(subTotals[4], 'Cumberbunds', dealers);
  }
}

//Creates a table for the selected Craps Table
function renderCrapsAll() {
  var craps = 'craps';
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Craps') {
      if (loadSheet[i].tablesize !== '12-1' || loadSheet[i].tablesize !== '12-2') {
        loadSheet[i].parts[0].splice(1, 1);
        loadSheet[i].parts[1].splice(1, 1);
      }

      addTitle(craps, 'CRAPS ITEMS FOR ' + loadSheet[i].tablesize);
      for (var n = 0; n < loadSheet[i].parts[0].length; n++) {
        if (loadSheet[i].parts[1][n] === '') {
          buildTables(loadSheet[i].parts[1][n], loadSheet[i].parts[0][n], craps);

          n++;
        }
        buildTables(loadSheet[i].parts[1][n] + ' per', loadSheet[i].parts[0][n], craps);
      }
    }
  }
}

//Creates a table for pre packaged Craps Items
function renderCrapsBox() {
  var crapsBox = 'crapsBox';
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Craps') {
      addTitle(crapsBox, 'CRAPS TUB ITEMS');
      for (var n = 0; n < loadSheet[i].tubs[0].length; n++) {
        buildTables(loadSheet[i].tubs[1][n] + ' per', loadSheet[i].tubs[0][n], crapsBox);
      }
    }
  }
}

//Creates a table for Roulette wheel subcomponents
function renderRouletteItems() {
  var roulette = 'roulette';
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

//Creates a table of required table skirts by type
function renderSkirtsType() {
  var skirts = 'skirts';
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Roulette' || subTotals[1] !== 0) {
      addTitle(skirts, 'SKIRTS');
      break;
    }
  }
  if (subTotals[1] !== 0) {
    buildTables(subTotals[1], 'Regular Skirts', skirts);
  }
  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Roulette') {
      buildTables(loadSheet[i].rouletteSkirt, 'Roulette Skirt', skirts);
    }
  }
}

//Creates a table for required accessories depending on gaming table selection
function renderAccessories() {
  var accessories = 'accessories';
  addTitle(accessories, 'GAMING ACCESSORIES');
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Celeb') {
      buildTables(loadSheet[i].celebSign, 'Celebrity Signs', accessories);
    }
  }
  buildTables(1, 'Raffle Drum', accessories);
  buildTables(subTotals[5] * 20, '$30,000 Chits', accessories);
  buildTables(subTotals[5] * 10, 'Coasters', accessories);
  buildTables(subTotals[5], 'Ticket Bags', accessories);
  buildTables(subTotals[4], 'Dealer Towels', accessories);
  buildTables(1, 'Hand Truck', accessories);
  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Texas Hold\'em') {
      buildTables(loadSheet[i].button, 'Dealer Button', accessories);
      buildTables(loadSheet[i].cushion, 'Dealer Cushion', accessories);
      if (loadSheet[i].chairs !== 0) {
        buildTables(loadSheet[i].chairs, 'Chairs', accessories);
      }
    }
  }
}

//Creates a checklist table for Pit Boss Items
function renderPitBoss() {
  var pitboss = 'pitboss';
  var boss = new PitBossTub(); // eslint-disable-line
  addTitle(pitboss, 'PITBOSS TUB');
  for (var i = 0; i < boss.pitBossTub[0].length; i++) {
    buildTables(' ', boss.pitBossTub[0][i], pitboss);
  }
}

//Creates a table of required shoes and playing cards by type
function renderShoes() {
  var shoes = 'shoes';
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack' || loadSheet[i].name === 'Celeb' || loadSheet[i].name === 'Texas Hold\'em') {
      addTitle(shoes, 'SHOES/CARDS');
      break;
    }
  }
  for (i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack') {
      buildTables(loadSheet[i].shoe, '4 Deck Shoe', shoes);
      buildTables(loadSheet[i].shoe, 'Discard Holders', shoes);
    }
  }
  for (i = 0; i < loadSheet.length; i++) {
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

//Master function that calls all other functions
function processPrint() {
  weakestLink();
  subTotals = getSubTotals();
  renderLogistics();
  renderTableType();
  renderRingType();
  renderSixBySix();
  renderTrayType();
  renderDealerItems();
  renderRouletteItems();
  renderCrapsAll();
  renderCrapsBox();
  renderSkirtsType();
  renderAccessories();
  renderPitBoss();
  renderShoes();
}

//Assigns print task to submit button
var printButton = document.getElementById('printypritny');
printButton.addEventListener('click', printLoadSheet);

function printLoadSheet() {
  // Hide everything but printable form
  var headerEl = document.getElementById('divHeader');
  var navEl = document.getElementById('navBar');
  navEl.style.display = 'none';
  headerEl.style.display = 'none';
  printButton.style.display = 'none';

  window.print();

  // Restore hidden itmes
  navEl.style.display = 'block';
  headerEl.style.display = 'block';
  printButton.style.display = 'inline-block';
}

//Renders all required tables on page load
processPrint();