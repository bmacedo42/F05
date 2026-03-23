let workTime = parseInt(prompt("Tempo de trabalho (min):", 25)) * 60;
let breakTime = parseInt(prompt("Tempo de descanso (min):", 5)) * 60;
let sessions = parseInt(prompt("Número de sessões:", 4));

let currentSession = 1;
let timeLeft = workTime;
let totalTime = workTime;

let isRunning = false;
let isWork = true;
let interval;

const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const sessionInfo = document.getElementById("sessionInfo");
const historyList = document.getElementById("history");

function updateDisplay() {
  let m = Math.floor(timeLeft / 60);
  let s = timeLeft % 60;
  s = s < 10 ? "0" + s : s;

  timerDisplay.textContent = `${m}:${s}`;
  sessionInfo.textContent = `Sessão ${currentSession} de ${sessions}`;
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

    if (isWork) {
      alert("Descanso!");
      timeLeft = breakTime;
      totalTime = breakTime;
    } else {
      currentSession++;

      if (currentSession > sessions) {
        finishPomodoro();
        return;
      }

      alert("Nova sessão!");
      timeLeft = workTime;
      totalTime = workTime;
    }

    isWork = !isWork;
    progressBar.style.width = "0%";
    updateDisplay();
  }
}

function finishPomodoro() {
  clearInterval(interval);
  alert("Terminaste!");

  let now = new Date();
  let record = `${now.toLocaleString()} - ${sessions} sessões`;

  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(record);
  localStorage.setItem("history", JSON.stringify(history));

  loadHistory();
}

function loadHistory() {
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function resetTimer() {
  clearInterval(interval);

  currentSession = 1;
  isWork = true;

  timeLeft = workTime;
  totalTime = workTime;

  progressBar.style.width = "0%";
  updateDisplay();
}

updateDisplay();
loadHistory();

// SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}