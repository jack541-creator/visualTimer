// This file contains code for the timer portion of the page

import {purchase, selectNextItem } from "./purchase.js"
import {renderTimerDisplay, renderInv} from "./render.js"


import { state, itemList, DEBUG } from "./main.js"

const timeDisplay = document.getElementById("time-display");
const earningsDisplay = document.getElementById("earnings-display");

/**
 * Actions by the program every set interval (1 second). This function links the timer to the wider functionality of the program by attempting to make purhcases and rendering then when succesful.
 */
export function tick() {
	state.time += 1;
	state.balance += state.salary;
	if (purchase(state.nextItem)) {
		state.nextItem = selectNextItem(itemList, state.inventory);
		renderInv(); // Makes purchase if possible and if so rerenders the inventory.
	}
	renderTimerDisplay(state.time, state.salary);

	if (DEBUG) console.log(`Current balance: ${state.balance}\n\n`); // debug
}

/**
 * Starts the timer.
 * @returns 
 */
export function play() {
	if (DEBUG) console.log("\nPlaying\n");

	if (state.timerId) return; // Does nothing if the timer is running
	state.timerId = setInterval(tick, 1000) // Refresh rate in miliseconds
}

/**
 * Pauses the timer.
 * @returns 
 */
export function pause() {
	if (DEBUG) console.log("\nPausing\n");

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

	if (DEBUG) console.log("\nRestting\n");

	renderTimerDisplay(state.time, state.salary); // Resets the time display
	state.inventory = []; // Resets inventory
	renderInv(); // Resets inventory display
	state.nextItem = selectNextItem();
}
