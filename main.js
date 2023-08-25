// select the grid size for the art pad and generate artpad
const bitButtons = document.querySelectorAll(".bit-button");

const colors = document.querySelectorAll('.color');
var selectedColor = 'black';

// subsection -> select color
colors.forEach(color => {
    color.addEventListener('click', (e) => {
        selectedColor = color.style.backgroundColor;
        for (let i = 0; i < colors.length; i++){
            colors[i].style.border = 'none';
        }
        color.style.border = '1px black solid';
        console.log(selectedColor);
    })
})

// subsection -> select eraser
const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', () => {
    selectedColor = 'white';
})

// subsection -> select remove
const remove = document.querySelector('.remove');
remove.addEventListener('click', () => {
    const grids = document.querySelectorAll('.grid');
    console.log(grids);
        grids.forEach(grid => {
            grid.style.backgroundColor = 'white';
        });
});

var checkedBitButton = 16;
bitButtons.forEach(button => {
    button.addEventListener('change', ()=> {
        if(button.checked){
            checkedBitButton = button.value;
            console.log(checkedBitButton);
            generateArtpad();
        }
    })
});



// artpad generator using selected grid size
const gridContainer = document.querySelector(".grid-container");

function generateArtpad(){
    gridContainer.style.gridTemplateColumns = `repeat(${checkedBitButton}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${checkedBitButton}, 1fr)`;
    gridContainer.innerHTML = '';
    
    for (let i = 0; i < checkedBitButton*checkedBitButton; i++){
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('grid'); 
        gridContainer.appendChild(gridDiv);
    }

    
    // draw on artpad
    const grids = document.querySelectorAll(".grid");

    let isDrawing = false;
    let stateHistory = [];
    let currentState = -1;
    
    grids.forEach(grid => {
        grid.addEventListener('mousedown', (e) => {
            grid.style.backgroundColor = selectedColor;
            isDrawing = true;
        })
        grid.addEventListener('mousemove', (e) => {
            if (isDrawing) grid.style.backgroundColor = selectedColor;
        })
        grid.addEventListener('mouseup', (e) => {
            isDrawing = false;
        }) 
    })
}


