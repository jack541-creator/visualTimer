import * as timer from "./timer.js";
import { selectNextItem } from "./purchase.js";
import { getItemList } from "./itemListParsing.js";


const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");


export const DEBUG = true;

export const itemList = await getItemList();
/*
export const itemList = {
	cheap: [
		{name: "ketchup", price: 0.5, type: "cheap"},
		{name: "drink", price: 2, type: "cheap"},
		{name: "fries", price: 3, type: "cheap"}
	],
	normal: [
		{name: "bigMac", price: 5, type: "normal"},
		{name: "nuggets", price: 7, type: "normal"},
		{name: "happyMeal", price: 8, type: "normal"}
	],
	expensive: [
		{name: "deluxe_bigMac", price: 10, type: "expensive"},
		{name: "doubleBacon&Cheese", price: 12, type: "expensive"},
		{name: "deluxe_ultraHamburger", price: 20, type: "expensive"}
	]
};
*/

export const state = {
	timerId: null, // Is null when the timer isn't running
	time: 0, // Number of elapsed seconds
	salary: 50, // Salary in $/s
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