// This file contains code for the timer portion of the page

import { state } from "./main.js"

const timeDisplay = document.getElementById("time-display");
const earningsDisplay = document.getElementById("earnings-display");

/**
 * Starts the timer.
 * @returns 
 */
export function play() {
	if (state.timerId) return; // Does nothing if the timer is running
	state.timerId = setInterval(tick, 1000) // Refresh rate in miliseconds
}


/**
 * Pauses the timer.
 * @returns 
 */
export function pause() {
	if (!state.timerId) return; // Does nothing if the timer isn't running
	clearInterval(state.timerId);
	state.timerId = null;
}

/**
 * Resets the timer.
 */
export function reset() {
	pause();

	state.time = 0;
	renderTimerDisplay(state.time, state.salary); // Resets the display
}

/**
 * Actions by the program every set interval (1 second). This function links the timer to the wider functionality of the program.
 */
export function tick() {
	state.time += 1;
	state.balance += state.salary;
	//[state.balance, state.placedItems] = tryPurchase(state.balance, state.placedItems);
	renderTimerDisplay(state.time, state.salary);
}

/**
 * Updates the timer display in the html.
 * @param {*} time Time to display in seconds.
 * @param {*} salary $/s to calculate total earnings.
 */
function renderTimerDisplay(time, salary) {
	let hours = Math.trunc(time / 3600);
	time %= 3600;

	let minutes = Math.trunc(time / 60);
	let seconds = time % 60;

	let displayTimeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

	let earnings = time * salary;
	let displayEarningsString = `\$${earnings.toFixed(2)}`

	timeDisplay.textContent = displayTimeString;
	earningsDisplay.textContent = displayEarningsString;
}
