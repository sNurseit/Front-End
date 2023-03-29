

//Для игкрока номер один
let score0 = document.querySelector('#score-0');
let current0 = document.querySelector('#current-0');
let panel0 = document.querySelector('.player-0-panel');

//Для игкрока номер два
let score1 = document.querySelector('#score-1');
let current1 = document.querySelector('#current-1');
let panel1 = document.querySelector('.player-1-panel');

//основные
let dice = document.querySelector('.dice');
let btnRoll = document.querySelector('.btn-roll');
let btnHold = document.querySelector('.btn-hold')
let btnNewGame = document.querySelector('.btn-new');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
btnRoll.addEventListener('click', (event) => {
    let result = Math.floor(Math.random() * 6) + 1;
    //Выбор кости
    dice.innerHTML=result;

    // Если выпол один то меняем
    if(result == 1) {
        currentScore = 0;
        clearCurrent(activePlayer);
        activePlayer = activePlayer == 0 ? 1 : 0;
        switchPlayer(activePlayer);

    } else
    //если нет прибавляем 
    {
        currentScore += result;
        if((scores[activePlayer] + currentScore) >= 100) {
            setWinner(activePlayer);
            scores = [0, 0];
            currentScore = 0;
        }else {
            if(activePlayer == 0) {
                current0.textContent = currentScore;
            } else {
                current1.textContent = currentScore;
            }
        }
    }
});

btnHold.addEventListener('click', (event) => {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    updateScore(activePlayer);
    clearCurrent(activePlayer);
    activePlayer = activePlayer == 0 ? 1 : 0;
    switchPlayer(activePlayer);

});


btnNewGame.addEventListener('click', (event) => {
    scores = [0, 0];
    currentScore = 0;
    score0.textContent = 00;
    score1.textContent = 00;
    current0.textContent = 0;
    current1.textContent = 0;
    panel0.classList = 'player-0-panel active';
});

function switchPlayer(player) {
    if(player == 0) {
        panel1.classList = 'player-1-panel';
        panel0.classList = 'player-0-panel active';
    } else {
        panel0.classList = 'player-0-panel';
        panel1.classList = 'player-1-panel active';
    }
}

function clearCurrent(player) {
    if (player == 0) {
        current0.textContent = 0;
    }else {
        current1.textContent = 0;
    }
}

function updateScore(player) {
    if (player == 0) {
        score0.textContent = scores[player];
    }else {
        score1.textContent = scores[player];
    }
}


function setWinner(player) {
    if (player == 0) {
        score0.textContent = 'WINNER';
    }else {
        score1.textContent = 'WINNER';
    }
}
