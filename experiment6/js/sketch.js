
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}
let gamesData;
let currentDisplayCount = 100;

function preload() {
    // Load the CSV file
    gamesData = loadTable('data/IGN.csv', 'csv', 'header');
  }
  
// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);
    console.log("Number of rows in CSV:", gamesData.getRowCount());

    // Call the displayTopGames function with the initial count
    displayTopGames(currentDisplayCount);
}

function displayTopGames(count) {
    // Display the top N games based on user input
    clear();
    textSize(14);
    textAlign(LEFT);

    for (let i = 0; i < count && i < gamesData.getRowCount(); i++) {
        const name = gamesData.getString(i, 'title');
        const score = gamesData.getNum(i, 'score');
        if (name !== null && !isNaN(score)) {
            const yPos = i * 20 + 30;
            text(`${name}: ${score}`, 20, yPos);
        }
    }
}

function displayRandomGames(count) {
    // Display a random selection of N games
    clear();
    textSize(14);
    textAlign(LEFT);

    for (let i = 0; i < count; i++) {
        const randomIndex = floor(random(gamesData.getRowCount()));
        const name = gamesData.getString(randomIndex, 'title');
        const score = gamesData.getNum(randomIndex, 'score');
        if (name !== null && !isNaN(score)) {
            const yPos = i * 20 + 30;
            text(`${name}: ${score}`, 20, yPos);
        }
    }
}


function displayTop100() {
    displayTopGames(100);
}

function displayTop200() {
    displayTopGames(200);
}

function displayTop300() {
    displayTopGames(300);
}

function displayRandom100() {
    displayRandomGames(100);
}

function displayRandom200() {
    displayRandomGames(200);
}
