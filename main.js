import * as timer from "./timer.js";
import { selectNextItem } from "./purchase.js";
import { getItemList } from "./itemListParsing.js";


const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");
export const salaryInput = document.getElementById("salary-input")


export const state = {
	timerId: null, // Is null when the timer isn't running
	time: 0, // Number of elapsed seconds
	salary: 0, // Salary in $/s
	balance: 0,
	inventory: [],
	nextItem: null,
	nextId: 0,
	latestTime: 0,
	itemSet: "McDonalds"
};

export const DEBUG = true;
export const itemList = await getItemList(state.itemSet);

state.nextItem = selectNextItem(itemList, state.inventory);

// Event Listeners
btnPlay.addEventListener("click", timer.play);
btnPause.addEventListener("click", timer.pause);
btnReset.addEventListener("click", timer.reset);
salaryInput.addEventListener("blur", timer.changeSalary)

/**
 * ITEM SET SELECTOR
 * I'm using a custom UI so every option is essentially a button. We store the current itemSet
 * in state as a string which will be part of the path to locate the csv file and the images
 */