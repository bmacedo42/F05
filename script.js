let timer;
let totalTime;
let remainingTime;
let isRunning = false;

let currentSession = 1;
let totalSessions;
let isWork = true;

const timeDisplay = document.getElementById("time");
const progressBar = document.getElementById("progress");
const history = document.getElementById("history");

function updateDisplay() {

if(!totalTime) return;

let minutes = Math.floor(remainingTime / 60);
let seconds = remainingTime % 60;

timeDisplay.textContent =
`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;

let progress = (1 - remainingTime / totalTime) * 100;

progressBar.style.width = progress + "%";
}

function startTimer(){

if(isRunning) return;

const work = document.getElementById("workTime").value * 60;
const breakT = document.getElementById("breakTime").value * 60;

totalSessions = document.getElementById("sessions").value;

if(!remainingTime){

totalTime = isWork ? work : breakT;
remainingTime = totalTime;

progressBar.style.width = "0%";

}

isRunning = true;

timer = setInterval(()=>{

remainingTime--;

updateDisplay();

if(remainingTime <= 0){

clearInterval(timer);
isRunning = false;

if(isWork){

if(currentSession <= totalSessions){

logSession();

isWork = false;
remainingTime = 0;
startTimer();

}

}else{

isWork = true;
currentSession++;

remainingTime = 0;

if(currentSession <= totalSessions){
startTimer();
}

}

}

},1000);
}

function pauseTimer(){
clearInterval(timer);
isRunning=false;
}

function resetTimer(){

clearInterval(timer);

isRunning=false;
remainingTime = 0;
totalTime = 0;
progressBar.style.width = "0%";

currentSession=1;
isWork=true;

updateDisplay();
}

function logSession(){

let li=document.createElement("li");

let now=new Date();

li.textContent =
`Sessão ${currentSession} concluída - ${now.toLocaleString()}`;

history.appendChild(li);

}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

updateDisplay();


if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js")
.then(()=>console.log("Service Worker registado"));
}