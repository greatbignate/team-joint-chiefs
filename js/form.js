'use strict';
// start the app
function startApp() {
  inilizeListeners();
  initializeFormDisplay();
  showForm();
}

//Turn on the listeners for the form and confrimation buttons
function inilizeListeners() {
  addEventListener('submit', processSubmit);

  var editButton = document.getElementById('edit');
  editButton.addEventListener('click', showForm);
}

function showForm() {
  document.getElementById('ulDiv').style.display = 'none';
  document.getElementById('loadForm').style.display = 'block';
}

function hideForm() {
  document.getElementById('loadForm').style.display = 'none';
  document.getElementById('ulDiv').style.display = 'block';
}

// turn off the roulette and craps options on first display of form
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
  var crapsCheckBox = document.getElementById('craps');
  if (crapsCheckBox.checked) {
    document.getElementById('crapsTable').style.display = 'inline';
    document.getElementById('crapsSize').style.display = 'inline';
  } else {
    document.getElementById('crapsTable').style.display = 'none';
    document.getElementById('crapsSize').style.display = 'none';
  }
}

function monitorRouletteCheckBox() {
  var rouletteCheckBox = document.getElementById('roulette');
  if (rouletteCheckBox.checked) {
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

// helper function for rendering the ul list
function createUl(liContent) {
  var ulEL = document.getElementById('confirmList');
  var liEl = document.createElement('li');
  liEl.textContent = liContent;
  ulEL.appendChild(liEl);
}

// Render the confirmation list
function renderConfirmation() {

  // remove the previous list if exists
  var ulEL = document.getElementById('confirmList');
  while (ulEL.childElementCount > 0) {
    ulEL.removeChild(ulEL.childNodes[0]);
    console.log(ulEL.childElementCount);
  }

  var equipmentSelected = false;
  var i = 0;

  if (!isNaN(loadSheet[i].ring) && loadSheet[i].ring !== 0) {
    createUl(`${loadSheet[i].ring} ${loadSheet[i].name} Table(s)`);
    equipmentSelected = true;
  }
  i++;

  if (!isNaN(loadSheet[i].ring) && loadSheet[i].ring !== 0) {
    createUl(`${loadSheet[i].ring} ${loadSheet[i].name} Table(s)`);
    equipmentSelected = true;
  }
  i++;

  if (document.getElementById('roulette').checked) {
    createUl(`${loadSheet[i].wheelSize} ${loadSheet[i].tableSize} ${loadSheet[i].name} Table`);
    equipmentSelected = true;
  }
  i++;

  if (document.getElementById('craps').checked) {
    createUl(`${loadSheet[i].tablesize} ${loadSheet[i].name} Table`);
    equipmentSelected = true;

  }
  i++;

  if (!isNaN(loadSheet[i].pokerTray) && loadSheet[i].pokerTray !== 0) {
    createUl(`${loadSheet[i].pokerTray} ${loadSheet[i].name} Table with ${loadSheet[i].chairs} Chairs`);
    equipmentSelected = true;
  }
  i++;

  // if no equipment selected - post notice and hide print preview
  if (!equipmentSelected) {
    createUl('No Equipment Selected');
    document.getElementById('printPreview').style.display = 'none';
  } else {
    document.getElementById('printPreview').style.display = 'inline';
  }


}

function processSubmit(event) {
  console.log('click');
  event.preventDefault();
  fillLoadSheet(event);
  saveLoadSheetLocal();
  hideForm();
  renderConfirmation();
}

startApp();