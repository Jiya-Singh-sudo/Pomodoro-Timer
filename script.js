const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const statusDisplay = document.getElementById('status');
const cycleCounter = document.getElementById('cycleCounter');

let WORK_MIN = 0.2;
let BREAK_MIN = 0.1;
let breakDuration = BREAK_MIN * 60;
let workDuration = WORK_MIN * 60;
let isWorkTime = true;
let timeLeft = workDuration;
let timer = null;
let cycleCount = 0;


function updateTimerDisplay(){
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2,"0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateCycleDisplay(){
    cycleCounter.textContent = `Cycles Completed ${cycleCount}`;
}

function toggleStatus(){
    isWorkTime = !isWorkTime;
    if(!isWorkTime){
        cycleCount++;
        updateCycleDisplay();
    }
    
    timeLeft = isWorkTime ? workDuration : breakDuration;
    statusDisplay.textContent = isWorkTime ? "Focus Time" : "Break Time";
}

function startTimer(){
    timer = setInterval(() => {
        if(timeLeft > 0){
            timeLeft--;
            updateTimerDisplay();
        } else{
            stopTimer();
            toggleStatus();
            updateTimerDisplay();
            startTimer();
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(timer);
    timer=null;

}

function pauseTimer(){
    stopTimer();
}

function resetTimer(){
    stopTimer();
    timeLeft = workDuration;
    updateTimerDisplay();
    cycleCount = 0;
    updateCycleDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay();
updateCycleDisplay();