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

function buildTables(count, description) {
  var tableEl = document.getElementById('printPreview');

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
      buildTables(loadSheet[i].tray, loadSheet[i].name);
    } else {
      if (loadSheet[i].name === 'Celeb') {
        buildTables(loadSheet[i].celebTray, loadSheet[i].name);
      } else {
        if (loadSheet[i].name === 'Roulette') {
          buildTables(loadSheet[i].tray, loadSheet[i].name);
        }
      }
    }
  }
}

// weakestLink();
// renderTableType();

function renderRingType() {

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