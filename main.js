import * as timer from "./timer.js";

const itemDisplay = document.getElementById("item-display")
const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");


// TEMP: TODO create functions to parse this from csv data
export const ItemList = {
	cheap: [
		{name: "ketchup", price: 0.5, type: "cheap"},
		{name: "drink", price: 2, type: "cheap"},
		{name: "fries", price: 3, type: "cheap"}
	],
	normal: [
		{name: "bigMac", price: 5, type: "normal"},
		{name: "nuggets", price: 7, type: "normal"},
		{name: "happyMeal", price: 8, type: "normal"}
	],
	expsensive: [
		{name: "deluxe_bigMac", price: 10, type: "expensive"},
		{name: "doubleBacon&Cheese", price: 12, type: "expensive"},
		{name: "deluxe_ultraHamburger", price: 20, type: "expensive"}
	]
};

const nextId = 0; // A global to keep track of IDs

export const state = {
	timerId: null, // Is null when the timer isn't running
	time: 0, // Number of elapsed seconds
	salary: 0.004, // Salary in $/s
	balance: 0,
	inventory: []
};






// Attemps to purchase a new item or combine current items and balance into a more expensive item
function tryPurchase(balance, placedItems) {

	
	return [balance, placedItems]
}

// Randomly selects the next item to purchase. Avoids selecting the same item two times in a row
function selectNewItem(nextItem) {
	// WIP
}

// Displays the next item on screen
function display(nextItem) {
	console.log("Appending item"); // DELETE
	const img = document.createElement("img");

	img.src = `images/${nextItem.name}.jpg`;
	img.classList.add("img-fluid")


	itemDisplay.appendChild(img);

	//selectNewItem()
}

// Event Listeners
btnPlay.addEventListener("click", timer.play);
btnPause.addEventListener("click", timer.pause);
btnReset.addEventListener("click", timer.reset);