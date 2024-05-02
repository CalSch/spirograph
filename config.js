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

/**
 * Add a number config element
 * @param {string} name property name
 * @param {(Event)=>void} onchange onChange callback
 * @param {number} value initial value
 * @param {number?} step Input step @default 1
 */
function addNumber(name,onchange,value,step) {
	step = step || 1;
	let el = document.createElement("input");
	el.type = "number";
	el.name = name;
	el.onchange = onchange;
	el.value = value;
	el.step = step;

	let label = document.createElement("label");
	label.setAttribute("for",name);
	label.innerText=`${name}: `;

	configContainer.appendChild(label);
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

/**
 * Add a list config element
 * @param {string} name property name
 * @param {(Event)=>void} onchange onChange callback
 * @param {any[]} value initial value
 */
function addList(name,onchange,value) {
	let el = document.createElement("textarea");
	el.cols = 40;
	el.rows = 8;
	// el.pattern = "\[(-?\\d+(\\.\\d*)?,)*(-?\\d+(\\.\\d*)?),?\]"; // list of numbers regex (no brackets)
	el.onchange = onchange;
	el.name = name;

	let label = document.createElement("label");
	label.setAttribute("for",name);
	label.innerText=`${name}: `;

	let separator = document.createElement("br");

	configContainer.append(separator);
	configContainer.appendChild(label);
	configContainer.appendChild(el);
	
	let prop = {
		name,
		onchange,
		value,
		type: "list",
		element: el
	}
	configProperties[name]=prop;
	updateList(name);
}

/**
 * Add a button config element
 * @param {string} name property name
 * @param {(Event)=>void} onclick onClick callback
 */
function addButton(name,onclick) {
	let el = document.createElement("button");
	el.onclick = onclick;
	el.name = name;
	el.innerText = name;

	configContainer.appendChild(el);
}

/**
 * Update a number property display
 * @param {string} name property name
 */
function updateNumber(name) {
	let prop = configProperties[name];
	prop.element.value = prop.value;
}

/**
 * Update a list property display
 * @param {string} name property name
 */
function updateList(name) {
	let prop = configProperties[name];
	prop.element.value = JSON.stringify(prop.value,null,2);
}