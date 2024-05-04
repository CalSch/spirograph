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
 * Round a number to the given decimal place
 * @param {number} number 
 * @param {number} place 
 * @returns {number}
 */
function roundToPlace(number,place) {
	let scalar = 10**place;
	return Math.round(number*scalar)/scalar;
}

/**
 * Add an <hr> element to the config area
 */
function addSeparator() {
	let el = document.createElement("hr");
	configContainer.appendChild(el);
}

/**
 * Add an <br> element to the config area
 */
function addLineBreak() {
	let el = document.createElement("br");
	configContainer.appendChild(el);
}

/**
 * Add a number config element
 * @param {string} name property name
 * @param {(ev:Event)=>void} onchange onChange callback
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
	addLineBreak();

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
 * @param {(ev:Event)=>void} onchange onChange callback
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

	configContainer.appendChild(label);
	addLineBreak();
	configContainer.appendChild(el);
	addLineBreak();
	
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
 * Add a boolean config element
 * @param {string} name property name
 * @param {(ev:Event)=>void} onchange onChange callback
 * @param {boolean} value initial value
 */
function addBool(name,onchange,value) {
	let el = document.createElement("input");
	el.type = "checkbox"
	el.onchange = onchange;
	el.name = name;

	let label = document.createElement("label");
	label.setAttribute("for",name);
	label.innerText=`${name}: `;

	configContainer.appendChild(label);
	configContainer.appendChild(el);
	
	let prop = {
		name,
		onchange,
		value,
		type: "boolean",
		element: el
	}
	configProperties[name]=prop;
	updateBool(name);
}

/**
 * Add a button config element
 * @param {string} name property name
 * @param {(ev:Event)=>void} onclick onClick callback
 */
function addButton(name,onclick) {
	let el = document.createElement("button");
	el.onclick = onclick;
	el.name = name;
	el.innerText = name;

	configContainer.appendChild(el);
}

/**
 * Set a config property's value
 * @param {string} name property name
 * @param {any} value 
 */
function setPropertyValue(name,value) {
	configProperties[name].value = value;
}

/**
 * Update a number property display
 * @param {string} name property name
 */
function updateNumber(name) {
	let prop = configProperties[name];
	prop.element.value = roundToPlace(prop.value,5);
}

/**
 * Update a list property display
 * @param {string} name property name
 */
function updateList(name) {
	let prop = configProperties[name];
	prop.element.value = JSON.stringify(prop.value,null,2);
}

/**
 * Update a boolean property display
 * @param {string} name property name
 */
function updateBool(name) {
	let prop = configProperties[name];
	prop.element.value = prop.value;
}