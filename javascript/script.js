
// Select HTML elements

const forge = document.getElementById("forge");
const heatDisplay = document.getElementById("heat-value");
const swordCountDisplay = document.getElementById("sword-count");
const statusDisplay = document.getElementById("forge-status");
const forgeImage = document.getElementById("forge-image");
const messageDisplay = document.getElementById("action-message");

// Select game controls

const heatInput = document.getElementById("heat-input");
const addHeatButton = document.getElementById("add-heat");
const makeSwordButton = document.getElementById("make-sword");
const resetForgeButton = document.getElementById("reset-forge");

// Game variables

let heat = 20;
let swordsMade = 0;


// Get the current forge status

function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return "Too cold";
  } else if (heatValue < 70) {
    return "Ready to forge";
  } else {
    return "Roaring fire";
  }
}


// Update the forge display

function updateForge() {
  const status = getForgeStatus(heat);

  heatDisplay.textContent = heat;
  swordCountDisplay.textContent = swordsMade;
  statusDisplay.textContent = status;

  forge.classList.remove("is-cold", "is-ready", "is-roaring");

  if (status === "Too cold") {
    forge.classList.add("is-cold");

    forgeImage.src = "assets/forge-cold.svg";
    forgeImage.alt = "A stone forge with dark coals and no flames";

  } else if (status === "Ready to forge") {
    forge.classList.add("is-ready");

    forgeImage.src = "assets/forge-ready.svg";
    forgeImage.alt = "A stone forge with a small orange fire";

  } else {
    forge.classList.add("is-roaring");

    forgeImage.src = "assets/forge-roaring.svg";
    forgeImage.alt = "A stone forge with tall bright flames and sparks";
  }
}


// Reset the forge

function resetForge() {
  heat = 20;
  swordsMade = 0;

  heatInput.value = "";
  messageDisplay.textContent = "";

  updateForge();
}


// Add heat to the forge

function heatForge(amount) {
  heat += amount;

  if (heat > 100) {
    heat = 100;
  }

  messageDisplay.textContent =
    `The forge is now ${getForgeStatus(heat).toLowerCase()}.`;

  updateForge();
}


// Make a sword

function makeSword() {
  if (heat >= 30) {
    heat -= 30;
    swordsMade += 1;

    messageDisplay.textContent = "A sword has been forged!";

  } else {
    messageDisplay.textContent =
      "The forge isn't hot enough to make a sword. Add more heat.";
  }

  updateForge();
}


// -----------------------------------------
// EVENT LISTENERS
// -----------------------------------------

// Add heat button

// Pseudocode:
// 1. Read the input value.
// 2. Convert the value into a number.
// 3. Check if it is a positive whole number.
// 4. Display an error if the input is invalid.
// 5. Otherwise call heatForge().

addHeatButton.addEventListener("click", function () {

  const amount = Number(heatInput.value);

  if (
    heatInput.value.trim() === "" ||
    !Number.isFinite(amount) ||
    !Number.isInteger(amount) ||
    amount <= 0
  ) {

    messageDisplay.textContent =
      "Please enter a positive whole number to add heat.";

    return;
  }

  heatForge(amount);

  heatInput.value = "";

});


// Make sword button

// Pseudocode:
// 1. Listen for a click.
// 2. Call the makeSword() function.
// 3. Update the forge.

makeSwordButton.addEventListener("click", function () {
  makeSword();
});


// Reset forge button

// Pseudocode:
// 1. Listen for a click.
// 2. Call resetForge().
// 3. Clear the input and feedback.

resetForgeButton.addEventListener("click", function () {
  resetForge();
});


// Initialize the game when the page loads

resetForge();
