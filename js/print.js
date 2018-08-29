'use strict';


// for(let i = 0; i < surveyPictures.length; i++ ) {
//   if(surveyResults[i].name === event.target.title){
//     surveyResults[i].imagesClicked++;
//     clicksArray.push(surveyResults[i].imagesClicked);
//     console.log(surveyResults[i].imagesClicked);
//     localStorage.setItem('clicks', JSON.stringify(clicksArray));
//     console.log();
//   }

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
var subTotals = getSubTotals();

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


function renderTableType() {
  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack') {
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
      buildTables(loadSheet[i].tableSize, loadSheet[i].name, tables); // mostly working, just not displaying table size
    }
  }
}


weakestLink();
renderTableType();

function renderRingType() {
// var tableEl = document.getElementById('rings');
//  {
  for (var i = 0; i < loadSheet.length; i++) {
    if (subTotals[4] !== 0) {
      buildTables(subTotals[4], 'D-Ring Regular', rings);

      // var trEl = document.createElement('tr');
      // var trEl = document.createElement('td');
      // tdEl.textContent = subTotals[4];
      // trEl.appendChild(tdEl);
      // tdEl = document.createElement('td');
      // tdEl.textContent = ' ';
      // trEl.appendChild(tdEl);
      // tdEl = document.createElement('td');
      // tdEl.textContent = 'D-Ring Regular';
      // trEl.appendChild(tdEl);

      // tableEl.appendChild(trEl);
    }
  }

}

function renderTrayType() {

}

function renderDealerItems() {

}

function renderCrapsAll() {

}

function renderRouletteItems() {

}

function renderSkirtsType() {

}

function renderAccessories() {

}

function renderPitBoss() {

}

var printButton = document.getElementById('printPreview');
printButton.addEventListener('submit', processPrint);

function processPrint() {

}