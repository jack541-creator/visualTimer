import * as timer from "./timer.js";
import { selectNextItem } from "./purchase.js";
import { getItemList, loadItemSetOptions } from "./setup.js";
import { sellInventory, purchase } from "./purchase.js";
import { renderInv } from "./render.js";


const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");
const btnDropdown = document.getElementById("item-set-button")
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
	itemSet: null,
	itemList: []
};

export const DEBUG = true;
await loadItemSetOptions();
state.itemList = await getItemList(state.itemSet);
state.nextItem = selectNextItem(state.itemList, state.inventory);

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

for (const itemSetOption of document.getElementsByClassName("dropdown-item")) {
	itemSetOption.addEventListener("click", async () => {

		let newItemSet = itemSetOption.textContent
		if (DEBUG) console.log(`Changing itemSet to ${itemSetOption.textContent}`);

		state.itemSet = newItemSet; // Assign new set in backend

		 // Assign selection visually
		btnDropdown.textContent = newItemSet;
		document.getElementsByClassName("dropdown-active")[0].classList.remove("dropdown-active");
		itemSetOption.classList.add("dropdown-active");

		sellInventory();
		renderInv();

		// Change backend item list
		state.itemList = await getItemList(newItemSet);
		state.nextItem = selectNextItem(state.itemList, state.inventory);

		// Restock Inventory
		let purchasing = true;
		while(purchasing) { // Purchase and select new nextItem as many times as possible.
			if (purchase(state.nextItem)) {
				state.nextItem = selectNextItem(state.itemList, state.inventory); // Only select a new item if you purchase
			}
			else purchasing = false;
		}

		renderInv();
	})
} 