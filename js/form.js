'use strict';

// .addEventListener('checked', monitorCrapsCheckBox);
// document.getElementById('roulette').addEventListener('click', monitorRouletteCheckBox);

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