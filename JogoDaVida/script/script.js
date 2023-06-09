// Definindo o tamanho do tabuleiro
const numRows = 28;
const numCols = 80;

// Criando uma matriz vazia para representar o tabuleiro
let board = createEmptyBoard();

// Variável para controlar o intervalo de atualização do jogo
let intervalId;

// Função para criar uma matriz vazia
function createEmptyBoard() {
  const board = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    board[i] = new Array(numCols).fill(0);
  }
  return board;
}

// Função para preencher o tabuleiro com células vivas aleatoriamente
function fillBoardRandomly() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      board[i][j] = Math.floor(Math.random() * 2);
    }
  }
}

// Função para renderizar o tabuleiro na página HTML
function renderBoard() {
  const container = document.getElementById("board-container");
  container.innerHTML = "";

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.toggle("alive", board[i][j] === 1);
      cell.addEventListener("click", () => toggleCell(i, j));
      container.appendChild(cell);
    }
  }
}

// Função para atualizar o estado do tabuleiro
function updateBoard() {
  const newBoard = createEmptyBoard();

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const numNeighbors = countNeighbors(i, j);
      if (board[i][j] === 1) {
        if (numNeighbors === 2 || numNeighbors === 3) {
          newBoard[i][j] = 1;
        }
      } else {
        if (numNeighbors === 3) {
          newBoard[i][j] = 1;
        }
      }
    }
  }

  board = newBoard;
}

// Função para contar o número de vizinhos vivos de uma célula
function countNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const neighborRow = row + i;
      const neighborCol = col + j;
      if (
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols
      ) {
        count += board[neighborRow][neighborCol];
      }
    }
  }
  return count;
}

// Função para alternar o estado de uma célula entre viva e morta
function toggleCell(row, col) {
  board[row][col] = board[row][col] === 1 ? 0 : 1;
  renderBoard();
}

// Função para iniciar o jogo
function startGame() {
  fillBoardRandomly();
  renderBoard();
  intervalId = setInterval(() => {
    updateBoard();
    renderBoard();
  }, 500);
}

// Função para parar o jogo
function stopGame() {
  clearInterval(intervalId);
}

// Função para limpar o tabuleiro
function clearBoard() {
  board = createEmptyBoard();
  renderBoard();
}

// Iniciar o jogo quando a página carregar
window.addEventListener("DOMContentLoaded", () => {
  renderBoard();
});