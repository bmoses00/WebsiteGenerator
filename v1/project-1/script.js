'use strict';

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute('id'));

  if (cell.textContent !== '' || !gameActive) {
    return;
  }

  cell.textContent = currentPlayer;

  checkWin();

  togglePlayer();
}

function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (cells[a].textContent === currentPlayer && cells[b].textContent === currentPlayer && cells[c].textContent === currentPlayer) {
      message.textContent = `${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }

  checkDraw();
}

function checkDraw() {
  let isDraw = true;

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === '') {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    message.textContent = 'Draw!';
    gameActive = false;
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));