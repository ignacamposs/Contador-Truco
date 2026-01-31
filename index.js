function increment(team) {
    const teamInput = document.getElementById(team);
    let currentValue = parseInt(teamInput.value);
    if (currentValue < 30) {
        teamInput.value = currentValue + 1;
    }
}

function decrement(team) {
    const teamInput = document.getElementById(team);
    teamInput.value = parseInt(teamInput.value) - 1;
    if (teamInput.value < 0) {
        teamInput.value = 0;
    }
}

function reset() {
    document.getElementById("team1").value = 0;
    document.getElementById("team2").value = 0;
}

/*LOGICA DE PESTAÑAS*/
function showGame(gameId) {
    // 1. Ocultar todos los juegos
    document.getElementById('truco').classList.add('hidden');
    document.getElementById('tateti').classList.add('hidden');
    
    // 2. Mostrar el elegido
    document.getElementById(gameId).classList.remove('hidden');
}

/*LOGICA TA-TE-TI*/
let currentPlayer = "🧉";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""]; //tablero vacío

// Combinaciones ganadoras (Filas, Columnas, Diagonales)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

// Escuchamos el clic en cada celda
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // Sacamos el número de celda (0 al 8) del HTML
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Si la celda ya está ocupada o terminó el juego, no hacemos nada
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // 1. Escribimos en el tablero (lógica y visual)
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // 2. Chequeamos si ganó
    checkResult();
}

function checkResult() {
    let roundWon = false;

    // Recorremos todas las combinaciones ganadoras
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Si hay vacíos, seguimos mirando
        }
        if (a === b && b === c) {
            roundWon = true; // ¡Tres iguales!
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `¡Ganó ${currentPlayer}! 🎉`;
        gameActive = false;
        return;
    }

    // Empate (si no hay vacíos y nadie ganó)
    if (!gameState.includes("")) {
        statusDisplay.textContent = "¡Empate! 🤝";
        gameActive = false;
        return;
    }

    // Si nadie ganó, cambiamos turno
    currentPlayer = currentPlayer === "🧉" ? "🥐" : "🧉";
    statusDisplay.textContent = `Turno de: ${currentPlayer}`;
}

function resetTateti() {
    gameActive = true;
    currentPlayer = "🧉";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Turno de: ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
}