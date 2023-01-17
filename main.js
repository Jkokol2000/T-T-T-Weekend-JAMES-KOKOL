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
    zone.addEventListener("click", function(evt) {
        if (winner !== null) {
            return
        } else {
        let coordfinder = evt.target.id.split("");
        let boardCol = parseInt([coordfinder[5]]);
        let boardRow = parseInt([coordfinder[7]]);
        if (board[boardCol][boardRow] !== 0) {
            return
        } else {
            board[boardCol][boardRow] = turn;
            
        }
        findWinner();
        render();
        changeTurn();
    }})
})
playAgainBtn.addEventListener("click", function() {
 init();
})
/*----- functions -----*/
init();
function init() {
board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
turn = randomPlayer();
winner = null;
render();
}
function render() {
    renderBoard();
    renderPlayAgain();
    renderMessage();
}
function randomPlayer() {
    return Math.floor(Math.random() > 0.5 ? 1 : -1);
}
function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `Zone-${colIdx}-${rowIdx}`
            const cellEl = document.getElementById(cellId);
            cellEl.innerHTML = `<span class="shape ${cellVal === 1 ? 'blue' : 'red'}">${SHAPES[cellVal]}</span>`;
        });
    });
}

function renderMessage(){
    if(winner !== null) {
        if (winner === 'T') {
            return messageEl.innerHTML = "It's a tie???"
        } else {
            return messageEl.innerHTML = `${SHAPES[winner]} Wins!`;
        }
    } else {
        return messageEl.innerHTML = `${SHAPES[turn]}'s Turn!`
    }

}
function renderPlayAgain() {
    if(winner === null) {
        playAgainBtn.style.visibility = "hidden";
        playAgainBtn.style.opacity = "0";
    }  else {
        playAgainBtn.style.visibility = "visible";
        playAgainBtn.style.opacity = "1";
    }
}
function changeTurn() {
    if (winner !== null) {
        return;
    }
    boardFull = checkFullBoard();
    if (boardFull === true) {
        winner = "T"
        render();
    } else {
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
                return false;
            }
        }
    }
    return true;
}