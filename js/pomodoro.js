let timer;
let timeRemaining = 25 * 60; // 25 minutes in seconds
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-pomodoro');
const pauseButton = document.getElementById('pause-pomodoro');
const resetButton = document.getElementById('reset-pomodoro');

// Function to start the timer
function startPomodoro() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert('Pomodoro session complete!');
    }
  }, 1000);
}

// Function to pause the timer
function pausePomodoro() {
  clearInterval(timer);
  isRunning = false;
}

// Function to reset the timer
function resetPomodoro() {
  clearInterval(timer);
  timeRemaining = 25 * 60; // Reset to 25 minutes
  isRunning = false;
  updateTimerDisplay();
}

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Event listeners for buttons
startButton.addEventListener('click', startPomodoro);
pauseButton.addEventListener('click', pausePomodoro);
resetButton.addEventListener('click', resetPomodoro);




// const currentTaskElement = document.getElementById('current-task');
// const taskSelector = document.getElementById('selected-task');

// // Update the current task display when the selected task changes
// function updateCurrentTask() {
//   const selectedTask = taskSelector.value;
//   currentTaskElement.textContent = selectedTask ? `Current Task: ${selectedTask}` : 'No task selected';
// }

// // Event listener for task selection
// taskSelector.addEventListener('change', updateCurrentTask);

// // Initialize with the default selection
// updateCurrentTask();