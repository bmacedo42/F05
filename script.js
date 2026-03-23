let workTime = prompt("Tempo de trabalho (minutos):", 25);
let breakTime = prompt("Tempo de descanso (minutos):", 5);
let sessions = prompt("Número de sessões:", 4);

workTime = parseInt(workTime) * 60;
breakTime = parseInt(breakTime) * 60;
sessions = parseInt(sessions);

let currentSession = 1;

let timeLeft = workTime;
let totalTime = workTime;

let isRunning = false;
let isWork = true;
let interval = null;

const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateProgress() {
  let percent = ((totalTime - timeLeft) / totalTime) * 100;
  progressBar.style.width = percent + "%";
}

function startPause() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  } else {
    interval = setInterval(timer, 1000);
    isRunning = true;
  }
}

function timer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
    updateProgress();
  } else {
    // terminou um ciclo
    if (isWork) {
      alert("Descanso!");
      timeLeft = breakTime;
      totalTime = breakTime;
    } else {
      currentSession++;

      if (currentSession > sessions) {
        alert("Terminaste todas as sessões!");
        clearInterval(interval);
        return;
      }

      alert("Nova sessão de trabalho!");
      timeLeft = workTime;
      totalTime = workTime;
    }

    isWork = !isWork;

    // 🔥 IMPORTANTE (corrige a barra)
    progressBar.style.width = "0%";
    updateDisplay();
  }
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;

  currentSession = 1;
  isWork = true;

  timeLeft = workTime;
  totalTime = workTime;

  progressBar.style.width = "0%";
  updateDisplay();
}

// inicializar
updateDisplay();