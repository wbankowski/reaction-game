const lights = document.querySelectorAll(".light");
const timerDisplay = document.querySelector(".display-average");
const amountDisplay = document.querySelector(".display-amount");
const button = document.querySelector(".button");

let lastLight;
let activeLight;
let startTime;
let endTime;
let countdown;
let reactionTime = [];

button.addEventListener("click", startGame);
// window.addEventListener("onload", startGame());

function startGame() {
  lastLight = "";
  startTime = 0;
  endTime = 0;
  countdown = 0;
  reactionTime = [];
  onLight();
  addListener();
  startTimer();
  button.style.visibility = "hidden";
  // activeLight.classList.remove("green");
}

// Timer and displaying remaining time
function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;

  // Display initial amount of seconds
  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // Display remaining seconds to the end
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// Set amount of seconds the game will last
function startTimer() {
  const seconds = 10;
  timer(seconds);
}

//Displaying remaining time in title and div
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  // document.title = remainderSeconds == 0 ? "End game" : display;

  if (reactionTime.length !== 0) {
    const avg = reactionTime.reduce((total, amount, index, array) => {
      total += amount;
      if (index === array.length - 1) {
        return total / array.length;
      } else {
        return total;
      }
    });
    if (remainderSeconds == 0) {
      timerDisplay.textContent = `Your average reaction time:
      ${Math.round(avg)} ms`;
      amountDisplay.textContent = `Collected: ${reactionTime.length} fruits`;
      activeLight.classList.remove("green");
      activeLight.removeEventListener("click", removeClass);
      button.style.visibility = "visible";
    }
  }
  document.title = remainderSeconds == 0 ? "End game" : display;
}

// Choose randomly one light to be on
function randomLight(lights) {
  const index = Math.floor(Math.random() * lights.length);
  const light = lights[index];
  // Check if this light is not the last one - if TRUE - try again
  if (light === lastLight) {
    // console.log("Ooops, - random again");
    return randomLight(lights);
  }
  lastLight = light;
  return light;
}

// Removing class="green" from the div and invoking removeListener
function removeClass() {
  activeLight.classList.remove("green");
  // console.log("Class green removed");
  // Remove addEventListener from the div
  removeListener();
}

// Adding addEventListener to active div and start the timer
function addListener() {
  activeLight.addEventListener("click", removeClass);
  // console.log("Event listener added");
}

// Removing addEventListener from the div and stop the timer
function removeListener() {
  activeLight.removeEventListener("click", removeClass);
  // console.log("Event listener removed");
  endTime = Date.now();
  // Push reaction time to array
  reactionTime.push(endTime - startTime);
  // Start again
  return onLight();
}

// Displaying light on the grid by adding class="green" and adding addEventListener on that light
function onLight() {
  const light = randomLight(lights);
  light.classList.add("green");
  startTime = Date.now();
  // console.log("Added green class");
  activeLight = light;
  addListener();
}
