/*----- constants -----*/
const SHAPES = {
    '0' : '', // Empty Cell
    '1' : 'X', // Player 1 Shape
    '-1' : 'O' // Player 2 Shape
}
const WINSTATES = [
    [[0,0],[0,1],[0,2]], /// First Row Horizontal Win
    [[0,0],[1,0],[2,0]], /// First Column Vertical Win
    [[1,0],[1,1],[1,2]], /// Second Row Horizontal Win 
    [[0,1],[1,1],[2,1]], /// Second Column Vertical Win
    [[2,0],[2,1],[2,2]], /// Third Row Howizontal Win
    [[0,2],[1,2],[2,2]], /// Third Column Vertical Win
    [[0,0],[1,1],[2,2]], /// NWSE Diag Win
    [[0,2],[1,1],[2,0]] /// NESW Diag Win
];

/*----- state variables -----*/
let board;
let turn;
let winner;
/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const zones = document.querySelectorAll(".TTT-Zone")
/*----- event listeners -----*/
zones.forEach(function(zone) {
    // Add an event listener to each zone
    zone.addEventListener("click", function(evt) {
        // If there is a winner, prevent clicks
        if (winner !== null) {
            return
        } else {
        // Find the column and row of the clicked zone
        let coordfinder = evt.target.id.split("");
        let boardCol = parseInt([coordfinder[5]]);
        let boardRow = parseInt([coordfinder[7]]);
        if (board[boardCol][boardRow] !== 0) {
            // If the zone already has a shape, don't allow a click
            return
        } else {
            // Update the board witht the current turn
            board[boardCol][boardRow] = turn;
            
        }
        // Check for a winner
        findWinner();
        // Render the Board and message
        render();
        // Change to the next player's turn
        changeTurn();
    }})
})
playAgainBtn.addEventListener("click", function() {
 init();
})
/*----- functions -----*/
init();
function init() {
// Initialize the board
board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
// Randomly choose a starting player
turn = randomPlayer();
// Set the winner to null at the start
winner = null;
// Render the board and starting message
render();
}
function render() {
    // Render the board
    renderBoard();
    // Render the play again button if needed
    renderPlayAgain();
    // Render the message at the top of the screen
    renderMessage();
}
function randomPlayer() {
    // Selects a random number between 1 and -1 to select a random player
    return Math.floor(Math.random() > 0.5 ? 1 : -1);
}
function renderBoard() {
    // Loop through each column and row of the board
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            // Get the id of the current cell
            const cellId = `Zone-${colIdx}-${rowIdx}`
            // Get the element of the current cell
            const cellEl = document.getElementById(cellId);
            // Update the content of the cell with the correct shape and color
            cellEl.innerHTML = `<span class="shape ${cellVal === 1 ? 'blue' : 'red'}">${SHAPES[cellVal]}</span>`;
        });
    });
}

function renderMessage(){
    // Renders the correct message at the top of the screen
    // depending on if the state of the game is...
    if(winner !== null) {
        if (winner === 'T') {
            /// a tie...
            return messageEl.innerHTML = "It's a tie???"
        } else {
            /// a win...
            return messageEl.innerHTML = `${SHAPES[winner]} Wins!`;
        }
    } else {
        /// or if the game is still going
        return messageEl.innerHTML = `${SHAPES[turn]}'s Turn!`
    }

}
function renderPlayAgain() {
    if(winner === null) {
        /// If the game is still going, hide the play again button
        playAgainBtn.style.visibility = "hidden";
        playAgainBtn.style.opacity = "0";
    }  else {
        // If the game is over, show the play again button
        playAgainBtn.style.visibility = "visible";
        playAgainBtn.style.opacity = "1";
    }
}
function changeTurn() {
    if (winner !== null) {
        return;
    }
    // Check if the board is full
    boardFull = checkFullBoard();
    if (boardFull === true) {
        // If the board is full without a winner, the game is tied
        winner = "T"
        render();
    } else {
        // If the board is not full, change the turn
    turn = turn * -1;
    render();
    }
}
function findWinner() {
    // Loop Through all the possible winning combinations
    for (let i =  0; i < WINSTATES.length; i++) {
        let win = true;
        // loop through all cells in the current winning combination
        for (let j = 0; j < WINSTATES[i].length; j++) {
            let x = WINSTATES[i][j][0]
            let y = WINSTATES[i][j][1];
            // check if the value of the cell matches the current turn
            if (board[x][y] !== turn){
                win = false;
                break
            }
        }
        // if all the cell values in the winning combination match the current turn,
        // set the winner to the current turn
        if (win) {
            winner = turn;
            return
        }
    }
}
function checkFullBoard() {
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                // Check for an empty cell
                // If there isn't one, the board isn't full
                return false;
            }
        }
    }
    // Otherwise, the board is full
    return true;
}