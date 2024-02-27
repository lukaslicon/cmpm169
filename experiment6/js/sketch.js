// Constants - User-servicable parts
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
let gamesData;
let currentDisplayCount = 100;
let colorScale;

// Number of rows and columns in the heatmap grid
let rows, cols;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas if the page is resized
    $(window).resize(function () {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
        displayRandomHeatmap(currentDisplayCount);
    });

    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);
    console.log("Number of rows in CSV:", gamesData.getRowCount());

    // Initialize colorScale here
    colorScale = chroma.scale(['#edf8b1', '#2c7fb8']).mode('lab').colors(10); // You can adjust the color scale
    console.log("Color Scale:", colorScale); // Log colorScale to check if it's defined correctly

    // Set rows and cols based on the currentDisplayCount
    rows = Math.ceil(currentDisplayCount / 10); // You can customize the division factor
    cols = 10; // You can customize the number of columns

    // Call the displayHeatmap function
    displayRandomHeatmap(currentDisplayCount);
}


function displayRandomHeatmap(count) {
    currentDisplayCount = count; // Update the global variable
    clear();

    // Adjust cell size based on canvas size and data dimensions
    let cellWidth = width / cols;
    let cellHeight = height / rows;

    textSize(12); // Set the font size for the score
    const titleFontSize = 10; // Set the font size for the title

    for (let i = 0; i < currentDisplayCount; i++) {
        const randomIndex = floor(random(gamesData.getRowCount()));
        const title = gamesData.getString(randomIndex, 'title');
        const score = gamesData.getNum(randomIndex, 'score');

        if (!isNaN(score)) {
            const row = floor(i / cols);
            const col = i % cols;

            const xPos = col * cellWidth;
            const yPos = row * cellHeight;
            const rectWidth = cellWidth;
            const rectHeight = cellHeight;

            const hue = map(score, 0, 10, 0, 360);
            const saturation = 100;
            const lightness = 50; 

            const fillColor = chroma.hsl(hue, saturation, lightness).hex();

            noStroke();
            fill(fillColor);
            rect(xPos, yPos, rectWidth, rectHeight);

            fill(0); 
            textAlign(CENTER, CENTER);

            textSize(titleFontSize);
            text(title, xPos + rectWidth / 2, yPos + rectHeight / 2 - 10); 

            textSize(12); 
            text(score.toFixed(2), xPos + rectWidth / 2, yPos + rectHeight / 2 + 10); 
        }
    }
}


function displayRandom100() {
    displayRandomHeatmap(100);
}

function preload() {
    // Load the CSV file
    gamesData = loadTable('data/IGN.csv', 'csv', 'header');
}
