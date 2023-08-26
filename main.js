// select the grid size for the art pad and generate artpad
const bitButtons = document.querySelectorAll(".bit-button");

var checkedBitButton;
bitButtons.forEach(button => {
    button.addEventListener('change', ()=> {
        if(button.checked){
            checkedBitButton = button.value;
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
}

// select color
const colors = document.querySelectorAll('.color');
var selectedColor = 'rgba(0, 0, 0, 1)';
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

// elect eraser
const eraser = document.querySelector('.eraser');
eraser.addEventListener('click', () => {
    selectedColor = 'white';
})

// select remove
const remove = document.querySelector('.remove');
remove.addEventListener('click', () => {
    const grids = document.querySelectorAll('.grid');
        grids.forEach(grid => {
            grid.style.backgroundColor = 'white';
        });
});

// select lighten
const lightenButton = document.querySelector('.lighten');
lightenButton.addEventListener("click", () => {
    lightenButton.classList.toggle("active");
    if(lightenButton.classList.contains("active")){
        darkenButton.classList.remove("active");
        rainbowButton.classList.remove("active");
    }
})

// select darken
const darkenButton = document.querySelector('.darken');
darkenButton.addEventListener("click", () => {
    darkenButton.classList.toggle("active");
    if(darkenButton.classList.contains("active")){
        lightenButton.classList.remove("active");
        rainbowButton.classList.remove("active");
    }
})

// select rainbow
const rainbowButton = document.querySelector('.rainbow');
rainbowButton.addEventListener("click", () => {
    rainbowButton.classList.toggle("active");
    if(darkenButton.classList.contains("active")){
        lightenButton.classList.remove("active");
        darkenButton.classList.remove("active");
    }
})

//lighten darken rainbow functions
function lightenColor(color) {
    const rgbValues = color.match(/\d+/g).map(Number);
    const newRgbValues = rgbValues.map(value => Math.min(255, value + 25));
    return `rgb(${newRgbValues[0]}, ${newRgbValues[1]}, ${newRgbValues[2]})`;
}

function darkenColor(color) {
    const rgbValues = color.match(/\d+/g).map(Number);
    const newRgbValues = rgbValues.map(value => Math.max(0, value - 25));
    return `rgb(${newRgbValues[0]}, ${newRgbValues[1]}, ${newRgbValues[2]})`;
}

function randomizeColor(color){
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);
    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

// draw on artpad
gridContainer.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('grid')) {
        const currentColor = e.target.style.backgroundColor;
        if (lightenButton.classList.contains('active')) {
            e.target.style.backgroundColor = lightenColor(currentColor);
        } else if (darkenButton.classList.contains('active')) {
            e.target.style.backgroundColor = darkenColor(currentColor);
        } else if (rainbowButton.classList.contains('active')) {
            e.target.style.backgroundColor = randomizeColor(currentColor);
        } else {
            e.target.style.backgroundColor = selectedColor;
        }
        isDrawing = true;
    }
});

gridContainer.addEventListener('mousemove', (e) => {
    if (isDrawing && e.target.classList.contains('grid')) {
        const currentColor = e.target.style.backgroundColor;
        if (lightenButton.classList.contains('active')) {
            e.target.style.backgroundColor = lightenColor(currentColor);
        } else if (darkenButton.classList.contains('active')) {
            e.target.style.backgroundColor = darkenColor(currentColor);
        } else if (rainbowButton.classList.contains('active')) {
            e.target.style.backgroundColor = randomizeColor(currentColor);
        } else {
            e.target.style.backgroundColor = selectedColor;
        }
    }
});

gridContainer.addEventListener('mouseup', (e) => {
    isDrawing = false;
});


//save
const saveButton = document.querySelector(".save-button");

saveButton.addEventListener("click", () => {
    // Use html2canvas to capture the gridContainer
    html2canvas(gridContainer).then(canvas => {
        // Convert the canvas to a data URL (JPG format)
        const imageDataURL = canvas.toDataURL("image/png");

        // Create a download link and trigger the download
        const link = document.createElement("a");
        link.href = imageDataURL;
        link.download = "artpad.jpg";
        link.click();
    });
});

