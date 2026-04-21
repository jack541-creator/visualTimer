// This file contains functions relevant to rendering.

import { state, DEBUG } from "./main.js"

const itemDisplay = document.getElementById("item-display");
const timeDisplay = document.getElementById("time-display");
const earningsDisplay = document.getElementById("earnings-display");

/**
 * Renders the current inventory in the html.
 */
export function renderInv() {
	if (DEBUG) console.log("Rending inventory"); // debug

	// Note: renderedItem and renderedInv refer to html elements as opposed to item and inventory which are data structures.
	let renderedInv = itemDisplay.children;

	// We remove all rendered items we no longer own.
	for (let i = renderInv.length - 1; i >= 0; i--) {
		let renderedItem = renderInv[i];
		if (!isOwnedRendered(renderedItem, state.inventory)) {
			renderedItem.remove();
		}
	}

	// We render all items that we own which aren't rendered.
	for (let item of state.inventory) {
		if (!isRendered(item, renderedInv)) renderItem(item);
	}
}

/**
 * TEMP VERSION. Appends the item on the html as a div with text.
 * @param {*} item The item to be rendered.
 */
function renderItem(item) { // TEMP version
	if (DEBUG) console.log(`Rendering ${item.name}: ${item.id}`); // debug

	const renderedItem = document.createElement("p");

	renderedItem.textContent = `${item.name}\n${item.id}`;
	renderedItem.id = item.id;

	itemDisplay.appendChild(renderedItem);
}

/**
 * Updates the timer display in the html.
 * @param {*} time Time to display in seconds.
 * @param {*} salary $/s to calculate total earnings.
 */
export function renderTimerDisplay(time, salary) {
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

/**
 * Returns true if an html item has the same id as an item in our inventory.
 * @param {*} renderedItem The html element for the item.
 * @param {*} inventory List of purchased items.
 * @returns true / false
 */
function isOwnedRendered(renderedItem, inventory) {
	let owned = false;
	let i = 0;

	while (!owned && i < inventory) {
		if (renderedItem.id === inventory[i].id) owned = true;
		else i++;
	}

	return owned;
}

/**
 * Returns true if the item is already shown as an img in the html.
 * @param {*} item The item from our inventory.
 * @param {*} renderedInv The list of html elements representing items.
 * @returns true / false
 */
function isRendered(item, renderedInv) {
	let rendered = false;
	let i = 0;

	while (!rendered && i < renderedInv.length) {
		if (item.id == renderedInv[i].id) rendered = true;
		else i++;
	}

	return rendered;
}