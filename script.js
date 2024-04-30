let screenWidth = 640;
let screenHeight = 640;

/** @type {HTMLCanvasElement} */
let canvasEl = document.getElementById('screen');
canvasEl.width = screenWidth;
canvasEl.height = screenHeight;

let ctx = canvasEl.getContext('2d');

ctx.lineCap = "round";

let sticks            = [];
let sticksSpeedRatio  = [];
let sticksLengthRatio = [];

for (let i=0;i<5;i++) {
    sticks.push(0);
    sticksSpeedRatio.push( 2*(Math.random()-0.5));
    sticksLengthRatio.push(2*(Math.random()-0.5));
}

let sticksSpeed = 0.75 + 0.001;
let sticksScale = 180;

ctx.fillStyle = "black";
ctx.fillRect(0,0,screenWidth,screenHeight);

function draw() {
    // ctx.fillStyle = "black";
    // ctx.fillRect(0,0,screenWidth,screenHeight);
    
    ctx.save();
    ctx.translate(screenWidth/2,screenHeight/2);

    let x = 0;
    let y = 0;
    let angle = 0;

    // ctx.strokeStyle = `hsl(${Math.random()*360}deg,100%,50%)`;
    // ctx.strokeStyle = `hsl(${sticks[2]*sticksSpeed/2}deg,70%,55%)`;
    ctx.strokeStyle = `white`;
    ctx.lineWidth = 0.02;
    ctx.beginPath();
    ctx.moveTo(x,y);

    for (let i=0;i<sticks.length;i++) {
        let pos = sticks[i];
        let length = sticksLengthRatio[i] * sticksScale;
        let speed = sticksSpeedRatio[i] * sticksSpeed;
        angle += pos;
        x += Math.cos(angle*Math.PI/180)*length;
        y += Math.sin(angle*Math.PI/180)*length;
        ctx.lineTo(x,y);

        sticks[i] += speed + (Math.random()-0.5)*0;
    }

    ctx.stroke();

    ctx.restore();
}

setInterval(()=>{
    for (let i=20;i--;)
        draw();
},1000/60);