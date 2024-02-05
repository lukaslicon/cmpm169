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
let particles = [];

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

    // Draw equalizer bars
    for (let i = 0; i < spectrum.length; i += 10) {
        let x = map(i, 0, spectrum.length, 0, canvas.width);
        let h = -canvas.height + map(spectrum[i], 0, 255, canvas.height, 0);
        rect(x, canvas.height, canvas.width / spectrum.length, h);
    }

    // Create explosions for low notes
    let lowStart = 20;
    let lowEnd = 120;

    for (let i = lowStart; i < lowEnd; i += 5) {
        if (random() > 0.8) { // Adjust the probability as needed
            let radius = map(spectrum[i], 0, 255, 10, min(canvas.width, canvas.height) / 2);
            let x = random(canvas.width);
            let y = random(canvas.height);
            createExplosion(x, y, radius);
        }
    }

    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

function createExplosion(x, y, radius) {
    // Create a burst of particles for the explosion
    for (let i = 0; i < 20; i++) {
        let angle = random(TWO_PI);
        let particle = new Particle(x, y, cos(angle) * radius, sin(angle) * radius);
        particles.push(particle);
    }
}

class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.alpha = 255;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 2;
    }

    display() {
        noStroke();
        fill(255, this.alpha);
        ellipse(this.x, this.y, 5, 5);
    }
}