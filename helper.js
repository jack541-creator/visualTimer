// Returns the most expensive item from itemList that can be purchase with balance. If none can be purchased returns null
export function findBest(spendable) {
	let bestItem = null
	let i = 0;

	while (itemList[i].price <= spendable && i < itemList.length) {
		bestItem = itemList[i];
		i++;
	}
	return bestItem;
}

// Calculates the value of all purchased items. Returns the value.
export function calculateValue(purchasedItems) {
	let value = 0;
	for (const item of purchasedItems) value += item.price;
	return value;
}

// Makes the appropriate purchase or combines items to purchase something better. Returns the updated balance and list of purchased items.
// 
export function makePurchase(balance, purchasedItems) {
	// Iterate over possible merges of current items, starting by all together and removing the last as you go
	let i = 0;
	let complete = false;

	while (i < purchasedItems.length && !complete) {
		let subList = i === 0 ? purchasedItems : purchasedItems.slice(0, -i);

		let currentValue = calculateValue(subList);
		let newItem = findBest(balance + currentValue);

		if (!newItem) complete = true;

		if (!complete && newItem.price > purchasedItems[purchasedItems.length - 1].price) { // If the item we could buy is more expensive than our most expensive item so far we combine and purchase
			purchasedItems.splice(0, purchasedItems.length - i); // Remove items that we are combining
			purchasedItems.splice(purchasedItems.length - 1 - i, 0, {id:`item_${nextId}`, name:newItem.name, price:newItem.price}); // Add in the new item
			nextId++; // Update the idcounter
			balance = balance + currentValue - newItem.price; // Update our balance

			complete = true;
		}
		i++;
	}
	return [balance, purchasedItems];
}