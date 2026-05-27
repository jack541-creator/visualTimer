/**
 * This is a helper file for functions related to loading the initial state of the front and backend.
 */

import { DEBUG, state } from "./main.js";

/**
 * Parses csv files into a properly formated item lists. Adds a tag to each item to specify type (cheap / normal / expensive).
 * @returns Formatted item list.
 */
export async function getItemList(itemListName) {
	const parsedData = await new Promise((resolve) => {
		Papa.parse(`/itemSets/${itemListName}.csv`, {
			download: true,
			header : true,
			complete: resolve
		});
	});

	let toNumberData = parsedData.data.map(item => ({ // Convert the price to number type
		name: item.name,
		price: Number(item.price)
	}))
	let sortedData = toNumberData.sort((a, b) => a.price - b.price); // Sort by price
	let cheapLimit = sortedData.length * 0.3;
	let normalLimit = sortedData.length * 0.6;

	let itemList = {
		cheap: [],
		normal: [],
		expensive: []
	};

	for (let i = 0; i < sortedData.length; i++) {
		if (i < cheapLimit) {
			sortedData[i].type = "cheap";
			itemList["cheap"].push(sortedData[i]);
		}
		else if (i < normalLimit) {
			sortedData[i].type = "normal";
			itemList["normal"].push(sortedData[i]);
		}
		else {
			sortedData[i].type = "expensive";
			itemList["expensive"].push(sortedData[i]);
		}
	}

	if (DEBUG) {
		console.log("Item list parsed");
		console.log(itemList);
	}

	return itemList;
}

/**
 * Loads itemSet options and renders them as part of the itemSet menu dropdown. It reads from
 * itemSets/itemSets.json.
 */
export async function loadItemSetOptions() {
	const res = await fetch("itemSets/itemSets.json");
	const itemSets = await res.json();

	if (DEBUG) console.log(`Item sets found: ${itemSets}`);

	let dropdownMenu = document.getElementById("item-set-dropdown-menu");

	// For each set in the list we append a new button to our dropdown menu
	for (let i = 0; i < itemSets.length; i++) {
		let set = itemSets[i];

		// Create the link item
		let a = document.createElement("a");
		a.id = `dropdown-item-${set}`;
		a.classList.add("dropdown-item")
		a.textContent = set;

		// If it is the first item we activate it and add it to state
		if (i == 0) {
			a.classList.add("dropdown-active");
			document.getElementById("item-set-button").textContent = set;
			state.itemSet = set;
		}

		// Now we append this a element to a new li element
		let li = document.createElement("ul");
		li.appendChild(a);

		// Now we add the li element to the dropdown menu
		document.getElementById("item-set-dropdown-menu").appendChild(li);
	}
}