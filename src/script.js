/* eslint-disable no-unused-vars */
const incrementTotalBtn = document.querySelector("#incrementTotal");
const incrementSecRateBtn = document.querySelector("#incrementSecRate");
const incrementClickRateBtn = document.querySelector("#incrementClickRate");

const totalDisplayEl = document.querySelector("#total");
const secRateDisplayEl = document.querySelector("#ratePerSec");
const secRateDisplayNum = secRateDisplayEl.querySelector("#secRateNum");
const clickRateDisplayEl = document.querySelector("#ratePerClick");
const clickRateDisplayNum = clickRateDisplayEl.querySelector("#clickRateNum");

let total, duration, msLast, secRate, clickRate, secInterval;

if (localStorage.length === 0) {
  // Initial values if user has not played before
  total = 0;
  clickRate = 1;
  secRate = 0;
} else {
  total = parseInt(localStorage.total);
  clickRate = parseInt(localStorage.clickRate);
  secRate = parseInt(localStorage.secRate);
  msLast = parseInt(localStorage.msLast);
  duration = new Date() - new Date(msLast);
  total += (duration / 1000) * secRate;
}

// Call initial display functions to update the interface with these
// initial values
updateTotalEl(total);
updateClickRateEl(clickRate);
updateSecRateEl(secRate);
initAutoClick();

function saveStats() {
  // Save all the user data into local storage
  localStorage.setItem("total", total);
  localStorage.setItem("secRate", secRate);
  localStorage.setItem("clickRate", clickRate);
  localStorage.setItem("msLast", new Date().getTime());
}

function updateTotalEl(value) {
  // Update the global total value
  total = value;
  totalDisplayEl.innerText = total.toLocaleString("en-US");
}

function updateSecRateEl(value) {
  // Update the global sec rate value
  secRate = value;
  secRateDisplayNum.innerText = secRate.toLocaleString("en-US");
}

function updateClickRateEl(value) {
  // Update the global click rate value
  clickRate = value;
  clickRateDisplayNum.innerText = clickRate.toLocaleString("en-US");
}

function initAutoClick() {
  if (secRate !== 0) {
    secInterval = setInterval(() => {
      updateTotalEl(parseInt(total) + 1);
    }, 1000 / secRate);
  }
}

function incrementTotal() {
  // Increase the total by the rate and update the element
  updateTotalEl(parseInt(total) + clickRate);
}

function incrementClickRate() {
  // Increase the click rate by 1 and update the element
  updateClickRateEl(parseInt(clickRate) + 1);
}

function incrementSecRate() {
  // Increase the sec rate by 1 and update the element
  updateSecRateEl(parseInt(secRate) + 1);
  clearInterval(secInterval);
  secInterval = setInterval(() => {
    updateTotalEl(parseInt(total) + 1);
  }, 1000 / secRate);
}

function restart() {
  secRate = 0;
  clickRate = 1;
  total = 0;
  clearInterval(secInterval);
  updateTotalEl(total);
  updateSecRateEl(secRate);
  updateClickRateEl(clickRate);
  localStorage.clear();
}

window.addEventListener("pagehide", saveStats);
incrementTotalBtn.addEventListener("click", incrementTotal);
incrementClickRateBtn.addEventListener("click", incrementClickRate);
incrementSecRateBtn.addEventListener("click", incrementSecRate);
