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

function updateNumber(name) {
	let prop = configProperties[name];
	prop.element.value = prop.value;
}

function updateList(name) {
	let prop = configProperties[name];
	prop.element.value = JSON.stringify(prop.value,null,2);
}