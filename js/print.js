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

weakestLink();
renderTableType();