const playerStatus = document.querySelector('.player-status');
const boxes = document.querySelectorAll('.box');
const btn = document.querySelector('.btn');

let grid;
let currentPlayer;

gameInit();

function gameInit() {
    grid = ['','','','','','','','','']
    currentPlayer = 'X';
    playerStatus.innerText = `Player Turn - ${currentPlayer}`;
    playerStatus.classList.remove('winning-status');
    boxes.forEach(box => {
        box.innerText = '';
        box.style.cursor = 'pointer';
        box.style.pointerEvents = 'all';
        box.style.backgroundColor = 'transparent';

    });
    btn.classList = 'btn';
}


function handleGrid(box, index) {
    let status = gameStatus();
    if (status == 0) {
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }
        playerStatus.innerText = `Player Turn - ${currentPlayer}`;
    }
    else if (status == 2) {
        playerStatus.innerText = `Game Tied !`;
        btn.classList = 'btn active';
    }
    else {
        boxes.forEach(box => {
            box.style.pointerEvents = 'none';
        });
        playerStatus.innerText = `WINNER - ${currentPlayer}`;
        playerStatus.classList.add('winning-status');
        btn.classList = 'btn active';
        colorWin(status);
        return;
    }
}

function gameStatus() {

    // return 0 : game in progress
    // return 1 : game won
    // return 2 : game tied

    winningCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (const condition of winningCondition) {
        if (grid[condition[0]] != '' && grid[condition[0]] == grid[condition[1]] && grid[condition[1]] == grid[condition[2]]) {
            return condition;
        }
    };
    // winningCondition.forEach(condition => {
    //     if (grid[condition[0]] != '' && grid[condition[0]] == grid[condition[1]] && grid[condition[1]] == grid[condition[2]]) {
    //         console.log('won')
    //         return 1;
    //     }
    // });
    for (const box of grid) {
        if (box == '') {
            return 0;
        }
    }
    // grid.forEach(box => {
    //     if (box == '') {
    //         return 0;
    //     }
    // });
    return 2;
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        box.innerText = currentPlayer;
        grid[index] = currentPlayer;
        box.style.pointerEvents = 'none';
        handleGrid(box, index);
    })
});

btn.addEventListener('click', () => {
    gameInit();
});

function colorWin(condition) {
    for (const index of condition) {
        boxes[index].style.backgroundColor = 'rgb(33 37 41)';
    }
}