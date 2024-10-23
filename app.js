const commitBtn = document.querySelector('#start');
const clearBtn = document.querySelector('#clear');

const jumpInput = document.querySelector('#jump-number');
const speedInput = document.querySelector('#speed');
const jumpAmountSpan = document.querySelector('#jump-amount');
const currSpeedSpan = document.querySelector('#curr-speed');

const jumpsMadeSpan = document.querySelector('#jumps-made');
const timeSpentSpan = document.querySelector('#time-spent');

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#triangle');
const ctx = canvas.getContext('2d');

const drawTriangle = () => {
    const sideLength = 600;
    const height = (Math.sqrt(3) / 2) * sideLength;

    const x1 = canvas.width / 2;
    const y1 = (canvas.height - height) / 2;

    const x2 = x1 - sideLength / 2;
    const y2 = y1 + height;

    const x3 = x1 + sideLength / 2;
    const y3 = y2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f5f5f5';
    ctx.stroke();

    const corners = [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: x3, y: y3 },
    ];

    return corners;
};

let jumps = jumpInput.value;
let speed = speedInput.value;

let currentPosition;

const corners = drawTriangle();

let interval;
let timer;

const drawJumps = () => {
    let i = 0;
    let seconds = 0;
    interval = setInterval(() => {
        i++;
        if (i == jumps) {
            clearInterval(interval);
        }
        const selectedCorner = corners[Math.floor(Math.random() * 3)];
        currentPosition.x = (currentPosition.x + selectedCorner.x) / 2;
        currentPosition.y = (currentPosition.y + selectedCorner.y) / 2;
        ctx.fillStyle = '#fff';
        ctx.fillRect(currentPosition.x, currentPosition.y, 2, 2);

        jumpsMadeSpan.textContent = `skoki: ${i}`;
    }, 1000 / speed);

    timer = setInterval(() => {
        seconds++;
        if (i == jumps) {
            clearInterval(timer);
        }
        console.log(seconds, i);
        timeSpentSpan.textContent = `czas: ${seconds}s`;
    }, [1000]);
};

const clearCanvas = () => {
    jumpsMadeSpan.textContent = 'skoki: 0';
    timeSpentSpan.textContent = 'czas: 0s';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(interval);
    clearInterval(timer);
    drawTriangle();
};

jumpInput.addEventListener('input', e => {
    jumps = e.target.value;
    jumpAmountSpan.textContent = jumps;
});

speedInput.addEventListener('input', e => {
    speed = e.target.value;
    currSpeedSpan.textContent = `${speed}/s`;
});

clearBtn.addEventListener('click', () => {
    clearCanvas();
});

commitBtn.addEventListener('click', () => {
    clearCanvas();

    currentPosition = {
        x: Math.floor(Math.random() * 800),
        y: Math.floor(Math.random() * 800),
    };

    ctx.fillStyle = '#f00';
    ctx.fillRect(currentPosition.x, currentPosition.y, 4, 4);

    drawJumps();
});
