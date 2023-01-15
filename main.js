/*----- constants -----*/
const SHAPES = {
    '0' : '',
    '1' : 'X',
    '-1' : 'O'
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
    zone.addEventListener("click", function() {
        if (winner !== null) {
            return
        } else {
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
    renderPlayAgain();
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
function renderMessage(){
    findWinner();
    if(winner !== null) {
    return messageEl.innerHTML = `${SHAPES[winner]} Wins!`;
} else if (winner === "T") {
    return messageEl.innerHTML = "It's a tie???"
} else {
    return messageEl.innerHTML = `${SHAPES[turn]}'s Turn!`;
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
    turn = turn * -1;
    renderMessage();
    renderPlayAgain();
}
function findWinner() {
    for (let i =  0; i < WINSTATES.length; i++) {
        let winstate = WINSTATES[i];
        let a = board[winstate[0][0]][winstate[0][1]];
        let b = board[winstate[1][0]][winstate[1][1]];
        let c = board[winstate[2][0]][winstate[2][1]];
        if (a === b && b === c && a !== 0) {
            winner = a;
            break;
        }
    }
    if (!winner) {
        let isDraw = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    isDraw = false;
                    break;
                }
            }
        }
        if (isDraw) winner = "T";
    }
}


