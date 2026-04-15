/**
 * This is the helper file containing functions related to making purchases
 * 
 * Item list:
 * 	1. The items will be divided into categories of cheap, normal and expensive
 * 
 * Purchase guidelines:
 * 	1. Not too many, not too few - purchase and combine
 * 	2. Variety of costs - 60% cheap, 30% normal and 10% Expensive
 * 	3. Variety of items - avoid repeat purchases 
 * 
 * 
 * 
 * Implementation:
 * 	1. Pick an item
 * 		1.1. If you have 5 or less items always purchase a cheap item without merging.
 * 		1.2. Otherwise:
 * 			If cheap items are over 60% of your items combine into normal
 * 			If over normal items account for over 30% of your items combine into expensive
 * 			Else purchase a cheap item
 * 	2. Purchase the item
 * 		2.1. If you can afford it purchase it using combination if necessary
 * 		2.2. Otherwise wait until you can
 * 	3. REPEAT ON TICK
 */

import { itemList } from "./main.js";
import { state } from "./main.js";

function selectNextItem(itemList, inventory) {
	let nextItemType = null;

	if (itemList.length <= 5) nextItemType = "cheap"; // If we have 5 or less item buy a cheap item
	else {
		let invTypeSpread = getInvTypeSpread(inventory);

		if (invTypeSpread.cheap > 0.6) nextItemType = "normal"; // If over 60% of our items are cheap get a normal item
		else if (invTypeSpread.normal > 0.3) nextItemType = "expensive"; // If we have over 30% cheap items get an expensive
		else nextItemType = "cheap"; // In any other case just buy a cheap item
	}
	return selectLeastOwned(itemList, inventory, nextItemType);
}

function selectLeastOwned(itemList, inventory, type) {
	// TODO: select and item of type type of which you currently own the least
}

function getInvTypeSpread(inventory) {
	// TODO: return representation of percentages [0, 1] of item types in your inventory
	return {cheap: ..., normal: ..., expensive, ... };
}
