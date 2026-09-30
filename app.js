// 1. ESTADO DEL JUEGO EN MEMORIA
let estadoTablero = ['', '', '', '', '', '', '', '', ''];
let turnoActual = 'X';
let juegoActivo = true;

// Combinaciones ganadoras posibles (3 filas, 3 columnas, 2 diagonales)
const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

// 2. SELECCIÓN DE ELEMENTOS DEL DOM
const celdas = document.querySelectorAll('.celda');
const textoEstado = document.querySelector('#estado-juego');
const spanJugador = document.querySelector('#jugador-actual');
const btnReiniciar = document.querySelector('#btn-reiniciar');

// 3. LÓGICA DE INTERACCIÓN Y EVENTOS DESACOPLADOS

function manejarClickCelda(e) {
    const celdaClickeada = e.target;
    const indice = parseInt(celdaClickeada.getAttribute('data-indice'));

    // Si la celda ya fue ocupada o el juego terminó, ignoramos el clic
    if (estadoTablero[indice] !== '' || !juegoActivo) {
        return;
    }

    // Actualizamos el estado en memoria y la interfaz visual
    estadoTablero[indice] = turnoActual;
    celdaClickeada.textContent = turnoActual;

    // Verificamos si hay un ganador o empate
    evaluarEstadoJuego();
}

// Función para evaluar si hay ganador o empate
function evaluarEstadoJuego() {
    let hayGanador = false;

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (
            estadoTablero[a] !== '' &&
            estadoTablero[a] === estadoTablero[b] &&
            estadoTablero[a] === estadoTablero[c]
        ) {
            hayGanador = true;
            break;
        }
    }

    if (hayGanador) {
        textoEstado.textContent = `¡Jugador ${turnoActual} ganó! :D`;
        juegoActivo = false;
        return;
    }

    if (!estadoTablero.includes('')) {
        textoEstado.textContent = "Empate._.";
        juegoActivo = false;
        return;
    }

    // Cambiamos turno si no hay ganador ni empate
    turnoActual = turnoActual === 'X' ? 'O' : 'X';
    spanJugador.textContent = turnoActual;
    textoEstado.textContent = `Turno del jugador: ${turnoActual}`;
}

// Reiniciar juego
function reiniciarJuego() {
    estadoTablero = ['', '', '', '', '', '', '', '', ''];
    juegoActivo = true;
    turnoActual = 'X';
    spanJugador.textContent = turnoActual;
    textoEstado.textContent = "Turno del jugador: X";
    celdas.forEach(celda => celda.textContent = '');
}

// 4. EVENTOS
celdas.forEach(celda => celda.addEventListener('click', manejarClickCelda));
btnReiniciar.addEventListener('click', reiniciarJuego);
