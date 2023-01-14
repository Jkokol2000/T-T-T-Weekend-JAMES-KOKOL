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

/*----- event listeners -----*/

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