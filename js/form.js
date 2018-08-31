'use strict';

// Define global variables
var loadSheet = [];
// var printList = [[], []];
var logistics;

//Constructors for each type of table
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
      [1, 1, 1, 2, 4, 4, 2, 1, 1, 1, 1]
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

function Logistics(name, location, truck) {
  this.name = name;
  this.location = location;
  this.truck = truck;
}

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
  var clientName = event.target.clientName.value;
  var eventLocation = event.target.eventLocation.value;
  var truck = event.target.truck.value;

  loadSheet = [
    (new Blackjack(blackjackCount)),
    (new Celeb(celebCount)),
    (new Roulette(rouletteNeed, rouletteTableSize, rouletteWheelSize)),
    (new Craps(crapsNeed, crapsTableSize)),
    (new TexasHoldem(holdemCount, holdemChairs)),
    (new PitBossTub()),
  ];

  logistics = new Logistics(clientName, eventLocation, truck);
  console.log(loadSheet);
  console.log(logistics);
}

function saveLoadSheetLocal() {
  localStorage.setItem('loadSheet', JSON.stringify(loadSheet));
  localStorage.setItem('logistics', JSON.stringify(logistics));
}

// function printPreviewList() {
//   for (var i = 0; i < loadSheet.length; i++) {
//     printList[0][i] = loadSheet[i].name;
//     printList[1][i] = loadSheet[i].count;
//   }
// }

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
function monitorCrapsCheckBox() { //eslint-disable-line
  var crapsCheckBox = document.getElementById('craps');
  if (crapsCheckBox.checked) {
    document.getElementById('crapsTable').style.display = 'inline';
    document.getElementById('crapsSize').style.display = 'inline';
  } else {
    document.getElementById('crapsTable').style.display = 'none';
    document.getElementById('crapsSize').style.display = 'none';
  }
}

function monitorRouletteCheckBox() { //eslint-disable-line
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
// The following function is required to start all the processes.
startApp();