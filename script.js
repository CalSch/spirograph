let screenWidth = 640;
let screenHeight = 640;

/** @type {HTMLCanvasElement} */
let canvasEl = document.getElementById('screen');
canvasEl.width = screenWidth;
canvasEl.height = screenHeight;

let ctx = canvasEl.getContext('2d');

ctx.lineCap = "round";

/** Position of the sticks @type {number[]} */
let sticks            = [];
/** Speeds of the sticks @type {number[]} */
let sticksSpeedRatio  = [];
/** Lengths of the sticks @type {number[]} */
let sticksLengthRatio = [];

// Add 5 random sticks
for (let i=0;i<5;i++) {
    sticks.push(0);
    sticksSpeedRatio.push( 2*(Math.random()-0.5));
    sticksLengthRatio.push(Math.random()*1.5);
}

// Add 0.001 to prevent a moire pattern and to make things smooth
let sticksSpeed = 0.75 + 0.001;
let sticksScale = 180;

const TraceType = {
    None: 0,
    Line: 1,
    Joint: 2,
    End: 3,
};

let traceMode = TraceType.Line;
let jointSize = 2;

ctx.fillStyle = document.getElementById('bgInput').value;
ctx.fillRect(0,0,screenWidth,screenHeight);

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
    if (document.getElementById("gradInput").checked){
        ctx.strokeStyle = `hsl(${sticks[2]*sticksSpeed/8}deg,70%,55%)`;
    }
    else {
    ctx.strokeStyle = document.getElementById('colorInput').value;
    }

    ctx.lineWidth = document.getElementById('lineWidthInput').value;
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

    ctx.stroke();

    // Un-transform
    ctx.restore();
}

setInterval(()=>{
    // Draw 20 times per frame
    for (let i=20;i--;)
        draw();
},1000/60);

function clearScreen() {
    ctx.fillStyle = document.getElementById('bgInput').value;
    ctx.fillRect(0,0,screenWidth,screenHeight);
}