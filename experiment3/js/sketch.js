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
    sound = loadSound('../music/Teddy-Swims-Lose-Control.mp3'); // Update path to your sound file
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
let explosionRate = 10; // Adjust this value to control the rate of explosions
function draw() {
    background(0);

    if (isSoundPlaying) {
        let spectrum = fft.analyze();

        // Create explosions for bass frequencies at a controlled rate
        let bassStart = 0; // Adjust the start index based on your spectrum
        let bassEnd = 20;  // Adjust the end index based on your spectrum

        if (frameCount % explosionRate === 0) {
            for (let i = bassStart; i < bassEnd; i += 5) {
                if (random() > 0.8) {
                    let radius = map(spectrum[i], 0, 255, 10, min(width, height) / 2);
                    let x = random(width);
                    let y = random(height);
                    createExplosion(x, y, radius, spectrum[i]); // Pass the spectrum value
                }
            }
        }

        // Draw equalizer bars with individual colors
        for (let i = 0; i < spectrum.length; i += 10) {
            let x = map(i, 0, spectrum.length, 0, width);
            let h = -height + map(spectrum[i], 0, 255, height, 0);

            // Interpolate the height for smoother transitions
            let prevH = i > 0 ? -height + map(spectrum[i - 10], 0, 255, height, 0) : h;
            h = lerp(prevH, h, 0.2);

            // Set the fill color based on the spectrum value
            let barColor = color(map(spectrum[i], 0, 255, 0, 360), 80, 90);
            fill(barColor);
            rect(x, height, width / spectrum.length, h);
        }
    }

    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}
function createExplosion(x, y, radius, spectrumValue) {
    let explosionColor = color(map(spectrumValue, 0, 255, 0, 360), 80, 90);

    for (let i = 0; i < 20; i++) {
        let angle = random(TWO_PI);
        let particle = new Particle(x, y, cos(angle) * radius, sin(angle) * radius, explosionColor);
        particles.push(particle);
    }
}
class Particle {
    constructor(x, y, vx, vy, explosionColor) {
        this.x = x;
        this.y = y;
        this.vx = vx * 0.02;
        this.vy = vy * 0.02;
        this.alpha = 255;
        this.color = explosionColor; // Set the color based on the explosion
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 2;
    }
    display() {
        noStroke();
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
        ellipse(this.x, this.y, 5, 5);
    }
}