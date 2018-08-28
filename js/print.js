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

function renderTableType() {
  var tableEl = document.getElementById('printPreview');
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');

  for (var i = 0; i < loadSheet.length; i++) {
    if (loadSheet[i].name === 'Blackjack') {
      tdEl.textContent = loadSheet[i].tray;
      trEl.appendChild(tdEl);

      tdEl = document.createElement('td');
      tdEl.textContent = '';
      trEl.appendChild(tdEl);

      tdEl = document.createElement('td');
      tdEl.textContent = loadSheet[i].name;
      trEl.appendChild(tdEl);

      tableEl.appendChild(trEl);
    }
    else {
      if (loadSheet[i].name === 'Celeb') {
        trEl = document.createElement('tr');

        tdEl = document.createElement('td');
        tdEl.textContent = loadSheet[i].celebTray;
        trEl.appendChild(tdEl);

        tdEl = document.createElement('td');
        tdEl.textContent = '';
        trEl.appendChild(tdEl);


        tdEl = document.createElement('td');
        tdEl.textContent = loadSheet[i].name;
        trEl.appendChild(tdEl);

        tableEl.appendChild(trEl);
      }
      else {
        if (loadSheet[i].name === 'Roulette') {
          trEl = document.createElement('tr');
          tdEl = document.createElement('td');
          tdEl.textContent = loadSheet[i].tray;
          trEl.appendChild(tdEl);

          tdEl = document.createElement('td');
          tdEl.textContent = '';
          trEl.appendChild(tdEl);

          tdEl = document.createElement('td');
          tdEl.textContent = loadSheet[i].name;
          trEl.appendChild(tdEl);
          tableEl.appendChild(trEl);
        }
      }
    }
  }
}