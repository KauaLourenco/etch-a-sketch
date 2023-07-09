const html = document.querySelector('html');
const header = document.querySelector('header');
const sizeBtn = document.querySelector('#size');
const sizeMenu = document.querySelector('.size-menu');
const sizeRange = document.querySelector('#size-range');

const eraserBtn = document.querySelector('#eraser');
const fillBtn = document.querySelector('#fill-color');
const clearBtn = document.querySelector('#clear');

const modeBtn = document.querySelector('#modes');
const modeMenu = document.querySelector('.mode-menu');
const darkMode = document.querySelector('#dark');
const rainbowMode = document.querySelector('#rainbow');

const main = document.querySelector('main');
const grid = document.querySelector('.grid');

// Menu animations

let options = document.querySelectorAll('button');

for (let option of options) {
    option.addEventListener('click', () => {
        if (option.style.backgroundColor === 'var(--bg-color)') {
            option.style.backgroundColor = 'transparent';
        } else {
            option.style.backgroundColor = 'var(--bg-color)';
        }
    });
};

window.addEventListener('click', function (e) {
    let target = e.target;

    if (target === header || target === main || target === grid) {
        sizeMenu.style.bottom = '-20rem';
        modeMenu.style.bottom = '-20rem';
        sizeBtn.style.backgroundColor = 'transparent';
        modeBtn.style.backgroundColor = 'transparent';
    };
});

sizeBtn.addEventListener('click', () => {
    if (sizeMenu.style.bottom === '0px') {
        sizeMenu.style.bottom = '-20rem';
    } else {
        modeMenu.style.bottom = '-20rem';
        modeBtn.style.backgroundColor = 'transparent';
        sizeMenu.style.bottom = '0px';
    }
});

modeBtn.addEventListener('click', () => {
    if (modeMenu.style.bottom === '0px') {
        modeMenu.style.bottom = '-20rem';
    } else {
        sizeMenu.style.bottom = '-20rem';
        sizeBtn.style.backgroundColor = 'transparent';
        modeMenu.style.bottom = '0px';
    }
});

// Grid creation

function createGridItems() {
    for (let i = 1; i <= sizeRange.value ** 2; i++) {
        const gridItem = document.createElement('div');
        let flexBasisValue = (Math.trunc((10 / sizeRange.value) * 1000)) / 100 + '%';

        gridItem.classList.add('gridItem');
        gridItem.style.backgroundColor = 'white';
        gridItem.style.flexBasis = flexBasisValue;
        gridItem.addEventListener('mousedown', changeColor);
        gridItem.addEventListener('mouseover', changeColor);
        grid.appendChild(gridItem);
    };
};

createGridItems();

function deleteGridItems() {
    let item = grid.lastElementChild;

    while (item) {
        grid.removeChild(item);
        item = grid.lastElementChild;
    };
};

sizeRange.addEventListener('input', () => {
    let sizeLabel = sizeMenu.children[1];

    sizeLabel.textContent = `${sizeRange.value} x ${sizeRange.value}`;

    deleteGridItems();
    createGridItems();
});

// Drawing

let eraserFunction = 'off';
let fillFunction = 'off';

let mouseDown = false;
main.onmousedown = () => (mouseDown = true);
main.onmouseup = () => (mouseDown = false);

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    } else if (eraserFunction === 'on') {
        e.target.style.backgroundColor = 'white';
    } else if (fillFunction === 'on') {
        fillGrid();
    } else {
        e.target.style.backgroundColor = 'black';
    };
};

// Eraser

eraserBtn.addEventListener('click', () => {
    if (eraserFunction === 'off') {
        eraserFunction = 'on';
    } else {
        eraserFunction = 'off';
    };
});

// Fill

fillBtn.addEventListener('click', () => {
    if (fillFunction === 'off') {
        fillFunction = 'on';
        eraserFunction = 'off';
        eraserBtn.style.backgroundColor = 'transparent';
    } else {
        fillFunction = 'off';
    };
});

function fillGrid() {
    for (let i = 0; i <= sizeRange.value ** 2 - 1; i++) {
        if (grid.children[i].style.backgroundColor !== 'white') {
        } else {
            grid.children[i].style.backgroundColor = 'var(--secondary-color)';
        };
    };

    fillFunction = 'off';
    fillBtn.style.backgroundColor = 'transparent';
};

// Clear

clearBtn.addEventListener('click', () => {
    for (let i = 0; i <= sizeRange.value ** 2 - 1; i++) {
        grid.children[i].style.backgroundColor = 'white';
    }
    clearBtn.style.backgroundColor = 'transparent';

    fillFunction = 'off';
    eraserFunction = 'off';

    fillBtn.style.backgroundColor = 'transparent';
    eraserBtn.style.backgroundColor = 'transparent';
});