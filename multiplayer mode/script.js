var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');
var score = 0;
var size = 4;
var width = canvas1.width / size - 6;
var cells = [];
var fontSize;
var loss = false;
startGame();



function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function createCells() {
  var i, j;
  for(i = 0; i < size; i++) {
    cells[i] = [];
    for(j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell1(cell) {
  ctx1.beginPath();
  ctx1.rect(cell.x, cell.y, width, width);
  switch (cell.value){
    case 0 : ctx1.fillStyle = '#A9A9A9'; break;
    case 2 : ctx1.fillStyle = '#D2691E'; break;
    case 4 : ctx1.fillStyle = '#FF7F50'; break;
    case 8 : ctx1.fillStyle = '#ffbf00'; break;
    case 16 : ctx1.fillStyle = '#bfff00'; break;
    case 32 : ctx1.fillStyle = '#40ff00'; break;
    case 64 : ctx1.fillStyle = '#00bfff'; break;
    case 128 : ctx1.fillStyle = '#FF7F50'; break;
    case 256 : ctx1.fillStyle = '#0040ff'; break;
    case 512 : ctx1.fillStyle = '#ff0080'; break;
    case 1024 : ctx1.fillStyle = '#D2691E'; break;
    case 2048 : ctx1.fillStyle = '#FF7F50'; break;
    case 4096 : ctx1.fillStyle = '#ffbf00'; break;
    default : ctx1.fillStyle = '#ff0080';
  }
  ctx1.fill();
  if (cell.value) {
    fontSize = width/2;
    ctx1.font = fontSize + 'px Arial';
    ctx1.fillStyle = 'white';
    ctx1.textAlign = 'center';
    ctx1.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }
}

function drawCell2(cell) {
  ctx2.beginPath();
  ctx2.rect(cell.x, cell.y, width, width);
  switch (cell.value){
    case 0 : ctx2.fillStyle = '#A9A9A9'; break;
    case 2 : ctx2.fillStyle = '#D2691E'; break;
    case 4 : ctx2.fillStyle = '#FF7F50'; break;
    case 8 : ctx2.fillStyle = '#ffbf00'; break;
    case 16 : ctx2.fillStyle = '#bfff00'; break;
    case 32 : ctx2.fillStyle = '#40ff00'; break;
    case 64 : ctx2.fillStyle = '#00bfff'; break;
    case 128 : ctx2.fillStyle = '#FF7F50'; break;
    case 256 : ctx2.fillStyle = '#0040ff'; break;
    case 512 : ctx2.fillStyle = '#ff0080'; break;
    case 1024 : ctx2.fillStyle = '#D2691E'; break;
    case 2048 : ctx2.fillStyle = '#FF7F50'; break;
    case 4096 : ctx2.fillStyle = '#ffbf00'; break;
    default : ctx2.fillStyle = '#ff0080';
  }
  ctx2.fill();
  if (cell.value) {
    fontSize = width/2;
    ctx2.font = fontSize + 'px Arial';
    ctx2.fillStyle = 'white';
    ctx2.textAlign = 'center';
    ctx2.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }
}

function canvasClean1() {
  ctx1.clearRect(0, 0, 500, 500);
}

function canvasClean2() {
  ctx2.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
  if (!loss) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      moveUp(); 
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      moveRight();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      moveDown(); 
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      moveLeft(); 
    }
    scoreLabel.innerHTML = 'Score : ' + score;
  }
}

function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
}

function finishGame() {
  canvas1.style.opacity = '0.5';
  loss = true;
}

function drawAllCells() {
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      drawCell1(cells[i][j]);
      drawCell2(cells[i][j]);
    }
  }
}

function pasteNewCell() {
  var countFree = 0;
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      if(!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if(!countFree) {
    finishGame();
    return;
  }
  while(true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if(!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  }
}

function moveRight () {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = size - 2; j >= 0; j--) {
      if(cells[i][j].value) {
        coll = j;
        while (coll + 1 < size) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          } else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score +=  cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveLeft() {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = 1; j < size; j++) {
      if(cells[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          } else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score +=   cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveUp() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = 1; i < size; i++) {
      if(cells[i][j].value) {
        row = i;
        while (row > 0) {
          if(!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}

function moveDown() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = size - 2; i >= 0; i--) {
      if(cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  pasteNewCell();
}
