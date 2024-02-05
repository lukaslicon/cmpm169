// sketch.js - purpose and description here
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
let sound;
let isSoundPlaying = false;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}
function preload() {
    sound = loadSound('../music/Undertale-Megalovania-Song-Sound-Effect.mp3'); // Update path to your sound file
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
    fft = new p5.FFT();

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(0);

    let spectrum = fft.analyze();
    noStroke();
    fill(255);

    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, canvas.width); // Use canvas.width instead of canvas.width / spectrum.length
        let h = -canvas.height + map(spectrum[i], 0, 255, canvas.height, 0);
        rect(x, canvas.height, canvas.width / spectrum.length, h);
    }
}

// mousePressed() function is called once after every time a mouse button is pressed

function toggleSound() {
    if (isSoundPlaying) {
        sound.pause();
    } else {
        sound.loop();
    }
    isSoundPlaying = !isSoundPlaying;
}

function loadCustomSound() {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];

    if (file) {
        sound.stop(); // Stop the current sound if it's playing

        // Load the new sound file
        sound = loadSound(URL.createObjectURL(file));
        isSoundPlaying = false; // Reset the play state
    }
}

function uploadButtonClick() {
    let fileInput = document.getElementById('fileInput');
    fileInput.click(); // Trigger the click event on the file input
}