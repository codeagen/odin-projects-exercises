// Player factory
const Player = (name, marker) => {
    return { name, marker };
};

// Gameboard module (IIFE - single instance)
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    
    const getBoard = () => board;
    
    const setCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };
    
    const isCellEmpty = (index) => board[index] === '';
    
    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };
    
    const isFull = () => board.every(cell => cell !== '');
    
    return { 
        getBoard, 
        setCell, 
        isCellEmpty, 
        reset, 
        isFull 
    };
})();

// Game controller module (IIFE - single instance)
const GameController = (() => {
    let player1, player2;
    let currentPlayer;
    let gameOver = false;
    let gameStats = { player1Wins: 0, player2Wins: 0, ties: 0 };
    
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    const initGame = (p1Name, p2Name) => {
        player1 = Player(p1Name, 'X');
        player2 = Player(p2Name, 'O');
        currentPlayer = player1;
        gameOver = false;
        Gameboard.reset();
    };
    
    const getCurrentPlayer = () => currentPlayer;
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
    
    const checkWinner = () => {
        const board = Gameboard.getBoard();
        
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { 
                    winner: currentPlayer, 
                    winningCells: combination 
                };
            }
        }
        
        if (Gameboard.isFull()) {
            return { winner: null, tie: true };
        }
        
        return null;
    };
    
    const makeMove = (index) => {
        if (gameOver || !Gameboard.isCellEmpty(index)) {
            return false;
        }
        
        Gameboard.setCell(index, currentPlayer.marker);
        
        const result = checkWinner();
        if (result) {
            gameOver = true;
            if (result.winner) {
                updateStats(result.winner);
            } else if (result.tie) {
                gameStats.ties++;
            }
            return result;
        } else {
            switchPlayer();
            return { continue: true };
        }
    };
    
    const updateStats = (winner) => {
        if (winner === player1) {
            gameStats.player1Wins++;
        } else if (winner === player2) {
            gameStats.player2Wins++;
        }
    };
    
    const getStats = () => gameStats;
    const getPlayers = () => ({ player1, player2 });
    const isGameOver = () => gameOver;
    
    return {
        initGame,
        getCurrentPlayer,
        makeMove,
        getStats,
        getPlayers,
        isGameOver
    };
})();

// Display controller module (IIFE - single instance)
const DisplayController = (() => {
    const setupDiv = document.getElementById('setup');
    const gameAreaDiv = document.getElementById('gameArea');
    const gameBoardDiv = document.getElementById('gameBoard');
    const currentPlayerSpan = document.getElementById('currentPlayer');
    const gameResultDiv = document.getElementById('gameResult');
    const gameStatsDiv = document.getElementById('gameStats');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    const cells = document.querySelectorAll('.cell');
    
    const init = () => {
        startBtn.addEventListener('click', startGame);
        restartBtn.addEventListener('click', restartGame);
        
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
    };
    
    const startGame = () => {
        const p1Name = player1Input.value.trim() || 'Player 1';
        const p2Name = player2Input.value.trim() || 'Player 2';
        
        GameController.initGame(p1Name, p2Name);
        
        setupDiv.classList.add('hidden');
        gameAreaDiv.classList.remove('hidden');
        
        updateDisplay();
        updateStats();
    };
    
    const restartGame = () => {
        setupDiv.classList.remove('hidden');
        gameAreaDiv.classList.add('hidden');
        clearBoard();
    };
    
    const handleCellClick = (e) => {
        if (GameController.isGameOver()) return;
        
        const index = parseInt(e.target.dataset.index);
        const result = GameController.makeMove(index);
        
        if (result) {
            updateDisplay();
            
            if (result.winner) {
                displayWinner(result.winner, result.winningCells);
                updateStats();
            } else if (result.tie) {
                displayTie();
                updateStats();
            }
        }
    };
    
    const updateDisplay = () => {
        const board = Gameboard.getBoard();
        const currentPlayer = GameController.getCurrentPlayer();
        
        // Update board
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            cell.className = 'cell';
            if (board[index]) {
                cell.classList.add(board[index].toLowerCase());
                cell.classList.add('disabled');
            }
        });
        
        // Update current player
        if (!GameController.isGameOver()) {
            currentPlayerSpan.textContent = currentPlayer.name;
        }
    };
    
    const displayWinner = (winner, winningCells) => {
        gameResultDiv.innerHTML = `${winner.name} Wins!`;
        gameResultDiv.className = 'game-result winner';
        
        // Highlight winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
        
        // Disable all cells
        cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    };
    
    const displayTie = () => {
        gameResultDiv.innerHTML = `It's a Tie!`;
        gameResultDiv.className = 'game-result tie';
        
        cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    };
    
    const updateStats = () => {
        const stats = GameController.getStats();
        const players = GameController.getPlayers();
        
        gameStatsDiv.innerHTML = `
            <strong>Game Stats:</strong><br>
            ${players.player1.name}: ${stats.player1Wins} wins | 
            ${players.player2.name}: ${stats.player2Wins} wins | 
            Ties: ${stats.ties}
        `;
    };
    
    const clearBoard = () => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        gameResultDiv.innerHTML = '';
        gameResultDiv.className = 'game-result';
    };
    
    return { init };
})();

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    DisplayController.init();
});