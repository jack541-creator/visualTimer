// This file contains functions related to parsting itemLists
import { DEBUG } from "./main.js";

/**
 * NEED TO UPDATE FOR FUTURE LISTS. Parses csv files into a properly formated item lists. Adds a tag to each item to specify type (cheap / normal / expensive).
 * @returns Formatted item list.
 */
export async function getItemList() {
	const parsedData = await new Promise((resolve) => {
		Papa.parse("/itemLists/McDonalds.csv", {
			download: true,
			header : true,
			complete: resolve
		});
	});

	let sortedData = parsedData.data.sort((a, b) => Number(a.price) - Number(b.price)); // Sort by price
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

	if (DEBUG) console.log(itemList);

	return itemList;
}