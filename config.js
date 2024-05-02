let configContainer = document.getElementById("config");
// document.body.innerHTML=1
/**
 * @typedef {{
 * name:string,
 * onchange:Function,
 * value:any,
 * type:string,
 * element:HTMLElement
 * }} Property
 * 
 * @type {Object.<string,Property>}
 */
let configProperties = {};

function addNumber(name,onchange,value) {
	let el = document.createElement("input");
	el.type = "number";
	el.onchange = onchange;
	el.value = value;
	configContainer.appendChild(el);
	let prop = {
		name,
		onchange,
		value,
		type: "number",
		element: el
	}
	configProperties[name]=prop;
	updateNumber(name);
}
function addList(name,onchange,value) {
	let el = document.createElement("input");
	el.type = "text";
	el.pattern = "(-?\\d+(\\.\\d*)?,)*(-?\\d+(\\.\\d*)?),?"; // list of numbers regex (no brackets)
	el.onchange = onchange;
	configContainer.appendChild(el);
	let prop = {
		name,
		onchange,
		value,
		element: el
	}
	configProperties[name]=prop;
}

function updateNumber(name) {
	let prop = configProperties[name];
	prop.element.value = prop.value;
}

function updateList(name) {
	let prop = configProperties[name];
	prop.element.value = prop.value.toString();
}