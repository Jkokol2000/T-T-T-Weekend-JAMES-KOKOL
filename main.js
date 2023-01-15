/*----- constants -----*/
const SHAPES = {
    '0' : '',
    '1' : 'X',
    '-1' : 'O'
}


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
    zone.addEventListener("click", function() {
        
        let coordfinder = event.target.id.split("");
        let boardCol = parseInt([coordfinder[5]]);
        let boardRow = parseInt([coordfinder[7]]);
        if (board[boardCol][boardRow] !== 0) {
            return
        } else {
            board[boardCol][boardRow] = turn;
        }
        render();
        changeTurn();
    })
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
            cellEl.innerHTML = SHAPES[cellVal];
        });
    });
}

function renderMessage() {
    return messageEl.innerHTML = `${SHAPES[turn]}'s Turn!`;
}
function changeTurn() {
    turn = turn * -1;
    renderMessage();
}

