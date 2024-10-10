const gridContainer = document.getElementById('grid-container');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('best');
const difficultySelect = document.getElementById('difficulty');

let numbers = [];
let time = 0;
let interval;
let gridSize = 5; // 默认困难模式为5x5
let totalNumbers = 25; // 默认困难模式有25个数字

// 监听难度选择
difficultySelect.addEventListener('change', (e) => {
    switch (e.target.value) {
        case 'easy':
            gridSize = 3; // 简单模式3x3
            totalNumbers = 9;
            break;
        case 'medium':
            gridSize = 4; // 中等模式4x4
            totalNumbers = 16;
            break;
        case 'hard':
            gridSize = 5; // 困难模式5x5
            totalNumbers = 25;
            break;
    }
});

startBtn.addEventListener('click', startGame);

function startGame() {
    resetGame();
    generateGrid();
    startTimer();
}

function resetGame() {
    gridContainer.innerHTML = '';
    numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
    time = 0;
    clearInterval(interval);
    timerDisplay.textContent = '时间: 0 秒';
}

function generateGrid() {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // 动态调整列数
    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach(num => {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.textContent = num;
        div.addEventListener('click', () => handleClick(num, div));
        gridContainer.appendChild(div);
    });
}

function startTimer() {
    interval = setInterval(() => {
        time++;
        timerDisplay.textContent = `时间: ${time} 秒`;
    }, 1000);
}

let nextNumber = 1;

function handleClick(num, div) {
    if (num === nextNumber) {
        div.classList.add('clicked');
        nextNumber++;
        if (nextNumber > totalNumbers) {
            clearInterval(interval);
            alert(`完成！用时: ${time} 秒`);
            updateBestTime();
        }
    }
}

function updateBestTime() {
    const bestTime = localStorage.getItem('bestTime') || Infinity;
    if (time < bestTime) {
        localStorage.setItem('bestTime', time);
        bestTimeDisplay.textContent = `${time} 秒`;
    }
}
