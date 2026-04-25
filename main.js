import * as timer from "./timer.js";
import { selectNextItem } from "./purchase.js";
import { getItemList } from "./itemListParsing.js";


const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");


export const DEBUG = true;
export const itemList = await getItemList();


export const state = {
	timerId: null, // Is null when the timer isn't running
	time: 0, // Number of elapsed seconds
	salary: 1, // Salary in $/s
	balance: 0,
	inventory: [],
	nextItem: null,
	nextId: 0
};

state.nextItem = selectNextItem(itemList, state.inventory);

// Event Listeners
btnPlay.addEventListener("click", timer.play);
btnPause.addEventListener("click", timer.pause);
btnReset.addEventListener("click", timer.reset);