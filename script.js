// Variables globales
const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');
let board = ['', '', '', '', '', '', '', '', ''];
let playerTurn = true;

// Funciones auxiliares
function reset() {
    board = ['', '', '', '', '', '', '', '', ''];
    playerTurn = true;
    message.innerHTML = '';
    squares.forEach(square => {
        square.innerHTML = '';
        square.style.backgroundColor = 'white';
        square.addEventListener('click', playerMove);
    });
}

function drawBoard() {
    squares.forEach((square, index) => {
        square.innerHTML = board[index];
        if (board[index] === 'X') {
            square.style.color = 'red';
        } else if (board[index] === 'O') {
            square.style.color = 'blue';
        } else {
            square.style.color = 'black';
        }
    });
}

function checkWin(board, player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function checkDraw(board) {
    return board.every(square => square !== '');
}

function playerMove(event) {
    const index = event.target.id;
    if (board[index] === '') {
        board[index] = playerTurn ? 'X' : 'O';
        drawBoard();
        if (checkWin(board, board[index])) {
            message.innerHTML = `¡${board[index]} ha ganado!`;
            squares.forEach(square => square.removeEventListener('click', playerMove));
        } else if (checkDraw(board)) {
            message.innerHTML = '¡Empate!';
        } else {
            playerTurn = !playerTurn;
            message.innerHTML = `Turno de ${playerTurn ? 'X' : 'O'}`;
            squares.forEach(square => square.removeEventListener('click', playerMove));
            computerMove();
        }
    }
}

function computerMove() {
    const index = Math.floor(Math.random() * 9);
    if (board[index] === '') {
        board[index] = 'O';
        drawBoard();
        if (checkWin(board, 'O')) {
            message.innerHTML = '¡La computadora ha ganado!';
            squares.forEach(square => square.removeEventListener('click', playerMove));
        } else if (checkDraw(board)) {
            message.innerHTML = '¡Empate!';
        } else {
            playerTurn = !playerTurn;
            message.innerHTML = `Turno de ${playerTurn ? 'X' : 'O'}`;
            squares.forEach(square => square.addEventListener('click', playerMove));
        }
    } else {
        computerMove();
    }
}

// Event listeners
resetButton.addEventListener('click', reset);

// Inicialización
reset();