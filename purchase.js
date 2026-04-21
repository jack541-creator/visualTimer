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

import { state, DEBUG } from "./main.js";

/**
 * Selects the next item that should be purchased with the following guidelines.
 * If we have 5 or less item buy a cheap item.
 * If over 60% of our items are cheap get a normal item.
 * If we have over 30% cheap items get an expensive item.
 * In any other case just buy a cheap item.
 * @param {object} itemList  List of dictionaries of item types available for purchase.
 * @param {array} inventory List of currently owned items.
 * @returns Returns the next item to be purchased (dictionary.)
 */
export function selectNextItem(itemList, inventory) {
	if (DEBUG) console.log("Selecting next item to purchase"); // debug

	let nextItemType = null;

	if (itemList.length <= 5) nextItemType = "cheap"; // If we have 5 or less item buy a cheap item
	else {
		let invTypeSpread = getInvTypeSpread(inventory);

		if (invTypeSpread.cheap > 0.6) nextItemType = "normal"; // If over 60% of our items are cheap get a normal item
		else if (invTypeSpread.normal > 0.3) nextItemType = "expensive"; // If we have over 30% cheap items get an expensive item
		else nextItemType = "cheap"; // In any other case just buy a cheap item
	}
	return selectLeastOwned(itemList, inventory, nextItemType);
}

/**
 * Attempts to purchase an item. If we can afford it the function returns true makes the purchase.
 * Otherwise returns false implying we need to wait to make the purchase.
 * @param {object} item The item (dictionary) to purchase.
 * @returns true / false
 */
export function purchase(item) {
	if (DEBUG) console.log("Attempting to purchase item"); // debug

	let purchased = null;

	// Check if we can afford an item. If so we purchase it.
	if (item.type === "cheap") {
		if (state.balance >= item.price) {
			makePurchase(item);
			purchased = true;
		}
		else purchased = false;
	}
	else if (item.type === "normal") {
		if (state.balance + getInvValueByType(state.inventory, "cheap") >= item.price) {
			makePurchase(item);
			purchased = true;
		}
		else purchased = false;
	}
	else {
		if (state.balance + getInvValueByType(state.inventory, "normal") >= item.price) {
		makePurchase(item);
		purchased = true;
		}
		else purchased = false;
	}

	// If we can't we wait.
	return purchased;
}
/**
 * Return the sum of the value of the intentory by type of item.
 * @param {array} inventory List of currently owned items.
 * @param {string} type Type of item to filter currently owned items (cheap / normal / expensive)
 * @returns Sum of values.
 */
function getInvValueByType(inventory, type) {
	let value = 0;
	for (item of inventory.type) value += item.value;
	return value;
}

/**
 * Completes the purchase changing values in the db (does not render the new set of items. For this use renderInv).
 * @param {object} item The item (dict) to purchase.
 */
function makePurchase(item) {
	if (DEBUG) console.log("Making purchase."); // debug

	// Sell items of lower type until we can afford the item.
	// Presumably if the item is cheap then we should be able to afford it at this point without selling.
	let sellType = null;
	if (item.type === "normal") sellType = "cheap";
	else sellType = "normal";

	while (state.balance < item.value) {
		let i = 0;
		while (state.inventory[i].type != sellType) i++; // Find next item of sellable type. Presumably if we need to sell at this point then there will be items to sell.
		state.balance += state.inventory[i].value; // Get the money;
		state.inventory.splice(i, 1); // Remove the item
	}

	// Once we can afford the item we purchase it
	state.balance -= item.value; // Spend the money
	let newItem = item;
	newItem.id = `item_${state.nextIdx}`; // We make a version of the purchased item with an index to keep track of it.
	state.nextIdx++; // We update the master index.
	state.inventory.pop(newItem);

	if (DEBUG) console.log(`Current Inventory: ${state.inventory}`); // debug

}


/**
 * Returns the item of a given type in itemList list of which we have the least of in inventory.
 * If there is 1 or more items that we do not currently own it returns the first of these.
 * @param {array} itemList List of dictionaries of item types available for purchase.
 * @param {array} inventory List of currently owned items.
 * @param {string} type Type of item to filter currently owned items.
 * @returns The item that we either don't currenly own or own the least of (dictionary).
 */
function selectLeastOwned(itemList, inventory, type) {
	let reducedItemList = itemList[type];
	let leastOwned = null;
	let i = 0;
	let ownedAmount = new Array(reducedItemList.length).fill(0); // Create a list to store the amounts owned of each item.

	// Select the first found item that we don't already own. Else keep track of how many we own.
	while (!leastOwned && i < reducedItemList.length) {
		if (!inInventory(reducedItemList[i], inventory)) leastOwned = reducedItemList[i];
		else ownedAmount[i]++;
		i++;
	}

	// If we haven't found an item that we don't own then we select the item that we have the least of.
	if (!leastOwned) leastOwned = reducedItemList[ownedAmount.indexOf(Math.min(...ownedAmount))];

	return leastOwned;
}

/**
 * Returns the percentages of each type of item in our inventory.
 * @param {array} inventory List of currently owned items.
 * @returns Inventory spread: {cheap: ... , noraml: ... , expensive: ...}
 */
function getInvTypeSpread(inventory) {
	let cheapAmnt = 0;
	let normalAmnt = 0;
	let expensiveAmnt = 0;

	for (item of inventory) {
		if (item.type === "cheap") cheapAmnt++;
		else if (item.type === "normal") normalAmnt++;
		else expensiveAmnt++;
	}

	let cheapPerc = cheapAmnt / inventory.length;
	let normalPerc = normalAmnt / inventory.length;
	let expensivePerc = expensiveAmnt / inventory.length;
	
	return {cheap: cheapPerc, normal: normalPerc, expensive: expensivePerc};
}

/**
 * Returns true if item is in our inventory.
 * @param {object} item An item dictionary.
 * @param {list} inventory List of currently owned items.
 * @returns true / false
 */
function inInventory(item, inventory) {
	let inItemList = false;
	let i = 0;

	while (!inItemList && i < inventory.length) {
		if (inventory[i].name === item.name)
			inItemList = true;
	}

	return inItemList;
}
