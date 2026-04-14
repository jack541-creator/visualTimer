const timeDisplay = document.getElementById("time-display");
const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const itemDisplay = document.getElementById("item-display")

// TEMP -- IMPORTANT: All item lists must be sorted by price
const ItemList = [
	{name: "drink", price: 2},
	{name: "fries", price: 3},
	{name: "bigMac", price: 5},
	{name: "bigMac_menu", price: 10}
];

const nextId = 0; // A global to keep track of IDs

const state = {
	timerId: null, // Is null when the timer isn't running
	time: 0, // Number of elapsed seconds
	salary: 1, // Salary in $/s
	balance: 0,
	purchasedItems: []
};

// Starts the timer
function play() {
	if (state.timerId) return; // Does nothing if the timer is running
	state.timerId = setInterval(tick, 1000) // Refresh rate in miliseconds
}

// Pauses the timer
function pause() {
	if (!state.timerId) return; // Does nothing if the timer isn't running
	clearInterval(state.timerId);
	state.timerId = null;
}

function tick() {
	state.time += 1;
	state.balance += state.salary;
	[state.balance, state.placedItems] = tryPurchase(state.balance, state.placedItems);
	renderTime(state.time);
	console.log(`balance: ${state.balance}`); // DELETE
}

// Formats and displays the time
function renderTime(time) {
	let hours = Math.trunc(time / 3600);
	time %= 3600;

	let minutes = Math.trunc(time / 60);
	let seconds = time % 60;

	let displayString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

	timeDisplay.textContent = displayString; // Update the display timer
}

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
btnPlay.addEventListener("click", play);
btnPause.addEventListener("click", pause);