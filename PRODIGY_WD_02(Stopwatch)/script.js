let startTime, updatedTime, difference, tInterval, isRunning = false;
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const timeDisplay = document.getElementById('timeDisplay');
const laps = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    isRunning = true;
    startStopBtn.textContent = 'Pause';
    lapBtn.disabled = false;
    resetBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(tInterval);
    isRunning = false;
    startStopBtn.textContent = 'Start';
}

function resetTimer() {
    clearInterval(tInterval);
    isRunning = false;
    timeDisplay.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps.innerHTML = '';
    difference = 0;
}

function recordLap() {
    const lapTime = document.createElement('li');
    lapTime.textContent = timeDisplay.textContent;
    laps.appendChild(lapTime);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));
    timeDisplay.textContent =
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 100 ? (milliseconds < 10 ? '00' : '0') : '') + milliseconds;
}

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);