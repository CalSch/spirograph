let screenWidth  = 600;
let screenHeight = 600;

/** @type {HTMLCanvasElement} */
let canvasEl = document.getElementById('screen');
canvasEl.width = screenWidth;
canvasEl.height = screenHeight;

let ctx = canvasEl.getContext('2d');

ctx.lineCap = "round";
ctx.lineWidth = 0.03

/** Position of the sticks @type {number[]} */
let sticks            = [];
/** Speeds of the sticks @type {number[]} */
let sticksSpeedRatio  = [];
/** Lengths of the sticks @type {number[]} */
let sticksLengthRatio = [];

function randomizeSticks() {
    sticks = [];
    sticksSpeedRatio = [];
    sticksLengthRatio = [];
    // Add 5 random sticks
    for (let i=0;i<5;i++) {
        sticks.push(0);
        sticksSpeedRatio.push( 2*(Math.random()-0.5));
        sticksLengthRatio.push(Math.random()*1.5);
    }
}

// Add 0.001 to prevent a moire pattern and to make things smooth
let sticksSpeed = 0.25 + 0.0001;
let sticksScale = 100;

const TraceType = {
    None: 0,
    Line: 1,
    Joint: 2,
    End: 3,
};

let traceMode = TraceType.Line;
let jointSize = 2;

let drawsPerFrame = 20;

let running = true;

function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,screenWidth,screenHeight);
}

function draw() {
    // ctx.fillStyle = "black";
    // ctx.fillRect(0,0,screenWidth,screenHeight);
    
    ctx.save();
    // Make (0,0) the center
    ctx.translate(screenWidth/2,screenHeight/2);

    let x = 0;
    let y = 0;
    let angle = 0;

    // Color options
    // ctx.strokeStyle = `hsl(${Math.random()*360}deg,100%,50%)`;
    ctx.strokeStyle = `hsl(${sticks[2]*sticksSpeed*2}deg,70%,55%)`;
    // ctx.strokeStyle = `rgba(210,210,255,1)`;

    ctx.beginPath();
    ctx.moveTo(x,y);

    // Draw each stick and move them
    for (let i=0;i<sticks.length;i++) {
        let pos = sticks[i];
        let length = sticksLengthRatio[i] * sticksScale;
        let speed = sticksSpeedRatio[i] * sticksSpeed;

        angle += pos;
        x += Math.cos(angle*Math.PI/180)*length;
        y += Math.sin(angle*Math.PI/180)*length;

        switch (traceMode) {
            case TraceType.Line:
                ctx.lineTo(x,y);
                break;
            case TraceType.Joint:
                ctx.moveTo(x,y);
                ctx.arc(x,y,jointSize,0,Math.PI*2);
                break;
            case TraceType.End:
                ctx.moveTo(x,y);
                if (i==sticks.length-1)
                    ctx.arc(x,y,jointSize,0,Math.PI*2);
                break;
            case TraceType.None:
            default:
                break;
        }

        // Move the stick
        sticks[i] += speed;
    }

    ctx.strokeStyle = `rgb(${((x/screenWidth)+0.5)*255},${((y/screenHeight)+0.5)*255},150)`;

    ctx.stroke();

    // Un-transform
    ctx.restore();
}

clear();
randomizeSticks();

setInterval(()=>{
    if (running) {
        // Draw 20 times per frame
        for (let i=drawsPerFrame;i--;)
            draw();
    }
},1000/60);

//#region config

let stepAmount = 1;

addButton("Start",(ev)=>{
    running = true;
});
addButton("Stop",(ev)=>{
    running = false;
});
addButton("Step",(ev)=>{
    for (let i=stepAmount;i--;)
    draw();
});

addLineBreak();

addNumber("Steps",(ev)=>{
    let value = parseInt(ev.target.value);
    if (value != NaN)
        stepAmount = value;
},stepAmount,1);


addButton("Clear",clear);
addButton("Reset",(ev)=>{
    clear();
    for (let i=0;i<sticks.length;i++) {
        sticks[i] = 0;
    }
    draw();
});

addSeparator();

addNumber("Total speed",(ev)=>{
    let value = parseFloat(ev.target.value);
    if (value != NaN)
        sticksSpeed = value;
},sticksSpeed,0.01);

addNumber("draw()'s per frame",(ev)=>{
    let value = parseInt(ev.target.value);
    if (value != NaN)
        drawsPerFrame = value;
},drawsPerFrame,1);

addNumber("Stick scale", (ev)=>{
    let value = parseFloat(ev.target.value);
    if (value != NaN)
        sticksScale = value;
},sticksScale,10);

addNumber("Line width", (ev)=>{
    let value = parseFloat(ev.target.value);
    if (value != NaN)
        ctx.lineWidth = value;
},ctx.lineWidth,0.01);

addSeparator();

addList("Stick speeds",(ev)=>{
    let value = JSON.parse(ev.target.value);
    if (value)
        sticksSpeedRatio = value;
},sticksSpeedRatio);
addList("Stick lengths",(ev)=>{
    let value = JSON.parse(ev.target.value);
    if (value)
        sticksLengthRatio = value;
},sticksLengthRatio);

//#endregion

/**
 * @typedef {{
 *  screenWidth: number,
 *  screenHeight: number,
 *  sticks: number[],
 *  sticksSpeedRatio: number[],
 *  sticksLengthRatio: number[],
 *  sticksScale: number,
 *  sticksSpeed: number,
 *  drawsPerFrame: number,
 *  lineWidth: number,
 *  traceMode: number,
 *  jointSize: number,
 *  }} SettingsObject
 */

/**
 * Get all the settings in one object
 * @returns {SettingsObject}
 */
function getSettingsObject() {
    return {
        screenWidth,
        screenHeight,
        sticks,
        sticksSpeedRatio,
        sticksLengthRatio,
        sticksScale,
        sticksSpeed,
        drawsPerFrame,
        lineWidth:ctx.lineWidth,
        traceMode,
        jointSize,
    };
}

/**
 * Set all the settings from one object
 * @param {SettingsObject} obj 
 */
function setSettingsFromObject(obj) {
    screenWidth = obj.screenWidth;
    screenHeight = obj.screenHeight;
    sticks = obj.sticks;
    sticksSpeedRatio = obj.sticksSpeedRatio;
    sticksLengthRatio = obj.sticksLengthRatio;
    sticksSpeed = obj.sticksSpeed;
    sticksScale = obj.sticksScale;
    drawsPerFrame = obj.drawsPerFrame;
    ctx.lineWidth = obj.lineWidth;
    traceMode = obj.traceMode;
    jointSize = obj.jointSize;
}

function save() {
    alert(JSON.stringify(getSettingsObject()));
}

function load() {
    let data = prompt("save data:");
    setSettingsFromObject(JSON.parse(data));
}