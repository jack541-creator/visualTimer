const timeDisplay = document.getElementById("time-display");
const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");

let timerId = null; // Is null when the timer isn't running
let time = 0; // Number of elapsed seconds

let salary = 1; // Salary in $/s
let balance = 0;
nextItem = {"name":"BigMac", "price":10.0} // To fix: function that selects the next item


// Starts the timer
function play() {
	if (timerId) return; // Does nothing if the timer is running
	timerId = setInterval(tick, 1000) // Refresh rate in miliseconds
}

// Pauses the timer
function pause() {
	if (!timerId) return; // Does nothing if the timer isn't running
	clearInterval(timerId);
	timerId = null;
}

function tick() {
	time += 1;
	balance = salary * time;
	checkBalance();
	renderTime(time);
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

// Checks if the user has enough for a new item. If so displays it updates balance
function checkBalance(balance) {
	if (!nextTime) selectNewItem() // Selects a new item if there is none

	while (balance > nextItem[prime]) { // While we are able, get new items
		display(nextItem);
		balance -= nextItem[price];
		//selectNewItem()
	}
}

// Randomly selects the next item to purchase. Avoids selecting the same item two times in a row
function selectNewItem(nextItem) {
	// WIP
}

// Displays the next item on screen
function display(nextItem) {
	// WIP
}

btnPlay.addEventListener("click", play);
btnPause.addEventListener("click", pause);