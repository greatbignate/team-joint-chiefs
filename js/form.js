'use strict';

// .addEventListener('checked', monitorCrapsCheckBox);
// document.getElementById('roulette').addEventListener('click', monitorRouletteCheckBox);
showForm();

var editButton = document.getElementById('edit');
editButton.addEventListener('click', returnToForm);

function returnToForm(event) {
  showForm();

}

function showForm() {
  document.getElementById('ulDiv').style.display = 'none';
  document.getElementById('loadForm').style.display = 'block';
}

function hideForm() {
  document.getElementById('loadForm').style.display = 'none';
  document.getElementById('ulDiv').style.display = 'block';
}

function initializeFormDisplay() {
  document.getElementById('crapsTable').style.display = 'none';
  document.getElementById('crapsSize').style.display = 'none';
  document.getElementById('wheelSize').style.display = 'none';
  document.getElementById('wheelSizeSelector').style.display = 'none';
  document.getElementById('rouletteSize').style.display = 'none';
  document.getElementById('rouletteTable').style.display = 'none';
}

//called with onclick in HTML
function monitorCrapsCheckBox() {
  console.log('checked');
  var crapsCheckBox = document.getElementById('craps');
  if(crapsCheckBox.checked) {
    document.getElementById('crapsTable').style.display = 'inline';
    document.getElementById('crapsSize').style.display = 'inline';
  } else {
    document.getElementById('crapsTable').style.display = 'none';
    document.getElementById('crapsSize').style.display = 'none';
  }
}

function monitorRouletteCheckBox() {
  console.log('checked');
  var rouletteCheckBox = document.getElementById('roulette');
  if(rouletteCheckBox.checked) {
    document.getElementById('wheelSize').style.display = 'inline';
    document.getElementById('wheelSizeSelector').style.display = 'inline';
    document.getElementById('rouletteSize').style.display = 'inline';
    document.getElementById('rouletteTable').style.display = 'inline';
  } else {
    document.getElementById('wheelSize').style.display = 'none';
    document.getElementById('wheelSizeSelector').style.display = 'none';
    document.getElementById('rouletteSize').style.display = 'none';
    document.getElementById('rouletteTable').style.display = 'none';
  }
}

initializeFormDisplay();

function renderConfirmation() {

  var ulEL = document.getElementById('confirmList');
  while(ulEL.childElementCount > 0) {
    ulEL.removeChild(ulEL.childNodes[0]);
    console.log(ulEL.childElementCount);
  }
  var liEl = document.createElement('li');

  var i = 0;

  if(!isNaN(loadSheet[i].ring) && loadSheet[i].ring !== 0) {
    liEl.textContent = (`${loadSheet[i].ring} ${loadSheet[i].name} Table(s)`);
    ulEL.appendChild(liEl);
  }
  i++;

  if(!isNaN(loadSheet[i].ring) && loadSheet[i].ring !== 0) {
    liEl = document.createElement('li');
    liEl.textContent = (`${loadSheet[i].ring} ${loadSheet[i].name} Table(s)`);
    ulEL.appendChild(liEl);
  }

  i++;

  if(document.getElementById('roulette').checked) {
    liEl = document.createElement('li');
    liEl.textContent = (`${loadSheet[i].wheelSize} ${loadSheet[i].tableSize} ${loadSheet[i].name} Table`);
    ulEL.appendChild(liEl);
  }

  i++;

  if(document.getElementById('craps').checked) {
    liEl = document.createElement('li');
    liEl.textContent = (`${loadSheet[i].tablesize} ${loadSheet[i].name} Table`);
    ulEL.appendChild(liEl);
  }

  i++;

  if(!isNaN(loadSheet[i].pokerTray) && loadSheet[i].pokerTray !== 0) {
    liEl = document.createElement('li');
    liEl.textContent = (`${loadSheet[i].pokerTray} ${loadSheet[i].name} Table with ${loadSheet[i].chairs} Chairs`);
    ulEL.appendChild(liEl);
  }

  if(liEl.textContent === '') {
    liEl.textContent = 'No Equipment Selected';
    ulEL.appendChild(liEl);
  }
}

