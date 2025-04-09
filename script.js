let minutesDisplay = document.getElementById("minutes");
let secondsDisplay = document.getElementById("seconds");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");

let isWorkTime = true;
let time = 25 * 60; // Start with 25 minutes
let timer = null;

function updateDisplay() {
  let mins = Math.floor(time / 60);
  let secs = time % 60;

  minutesDisplay.textContent = mins.toString().padStart(2, '0');
  secondsDisplay.textContent = secs.toString().padStart(2, '0');

  // Update the title of the tab with the time left
  document.title = `Pomodoro Timer - ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (timer !== null) return;

  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      timer = null;

      if (isWorkTime) {
        alert("Work session done! Time for a 5-minute break! ☕");
        isWorkTime = false;
        time = 5 * 60;
        updateDisplay();
        startTimer();
      } else {
        alert("Break over! Back to focus mode! 🔥");
        isWorkTime = true;
        time = 25 * 60;
        updateDisplay();
        // Comment out the next line if you don’t want it to auto-loop
        startTimer();
      }

      return;
    }

    time--;
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  isWorkTime = true;
  time = 25 * 60;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
