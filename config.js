let configContainer = document.getElementById("config");

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