const commitBtn = document.querySelector('#start');
const clearBtn = document.querySelector('#clear');

const jumpInput = document.querySelector('#jump-number');
const speedInput = document.querySelector('#speed');
const jumpAmountLabel = document.querySelector('#jump-amount');
const currSpeedLabel = document.querySelector('#curr-speed');

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

    // Rysowanie trójkąta
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

let jumps = 10_000;
let speed = 1000;

let currentPosition = {
    x: Math.floor(Math.random() * 800),
    y: Math.floor(Math.random() * 800),
};

ctx.fillStyle = '#f00';
ctx.fillRect(currentPosition.x, currentPosition.y, 2, 2);

const corners = drawTriangle();

let stop = false;
let interval;

const drawJumps = () => {
    let i;
    interval = setInterval(() => {
        i++;
        const selectedCorner = corners[Math.floor(Math.random() * 3)];
        currentPosition.x = (currentPosition.x + selectedCorner.x) / 2;
        currentPosition.y = (currentPosition.y + selectedCorner.y) / 2;
        ctx.fillStyle = '#fff';
        ctx.fillRect(currentPosition.x, currentPosition.y, 2, 2);
    }, 1000 / speed);
};

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(interval);
    drawTriangle();
};

jumpInput.addEventListener('input', e => {
    jumps = e.target.value;
    jumpAmountLabel.textContent = jumps;
});

speedInput.addEventListener('input', e => {
    speed = e.target.value;
    currSpeedLabel.textContent = `${speed}/s`;
});

clearBtn.addEventListener('click', () => {
    clearCanvas();
});

commitBtn.addEventListener('click', () => {
    clearInterval(interval);
    clearCanvas();
    drawJumps();
});
