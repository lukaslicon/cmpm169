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
let charColors;
const size = 15;
let chars = [" ", "-", ".", "~", ":", "=", "+"], // These could be whatever... try something like [" ", "^", "*", ")", "%", "$", "#", "&"], or [" ", "•", "●", "⬤"]
		data,
		particles = [];

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
    let canvasWidth = canvasContainer.width();
    let canvasHeight = canvasContainer.height();
    
    if (canvasWidth <= 0 || canvasHeight <= 0) {
        console.error("Invalid canvas dimensions.");
        return;
    }
    
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvas-container");
    // resize canvas if the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;

    textFont("monospace", size * 2);
    let arrayLength = Math.floor((canvasWidth / size) * (canvasHeight / size));
    data = new Array(arrayLength).fill(0);
    charColors = {
        " ": color(0, 0, 0),           // Black color for space
        "-": color(80, 80, 80),        // Dark gray color for "-"
        ".": color(70, 130, 180),      // Steel Blue color for "."
        "~": color(0, 128, 0),         // Green color for "~"
        ":": color(0, 0, 128),         // Navy Blue color for ":"
        "=": color(100, 149, 237),     // Cornflower Blue color for "="
        "+": color(0, 255, 255),       // Cyan color for "+"
        // Add more characters and their corresponding colors as needed
    };
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
	background(0);
	const ps = particles.sort((a, b) => a.vel.magSq()-b.vel.magSq());
	let p;
	for(let i = 0; i < data.length; i ++){
		fill(charColors[chars[data[i]]]);
		text(chars[data[i]], i % (width/size) * size, Math.floor(i / (width/size)) * size);
		let d = new p5.Vector(i % (width/size) * size, Math.floor(i / (width/size)) * size);
		p = ps.filter(z => z.pos.dist(d) < 100); // Not ideal, but performance-wise it is a must
		data[i] = 0
		if(!p.length) continue;
		for(let part of p){
			ds = part.pos.dist(d)/5;
			data[i] += Math.round((chars.length-1)/(ds < 1 ? 1 : ds));
		}
		if(data[i] > chars.length-1) data[i] = chars.length-1
	}
	
	for(let p of particles) {
		p.pos.add(p.vel);
		p.vel.rotate(noise(p.pos.x/100, p.pos.y/100)-0.5);
		if(p.pos.x < -20) p.pos.x = width+20
		if(p.pos.x > width+20) p.pos.x = -20
		if(p.pos.y < -20) p.pos.y = height+20
		if(p.pos.y > height+20) p.pos.y = -20
	}
}

function mouseDragged(){
	if(new p5.Vector(mouseX-pmouseX, mouseY-pmouseY).mag() > 5) particles.push({pos: new p5.Vector(mouseX, mouseY), vel: new p5.Vector(mouseX-pmouseX, mouseY-pmouseY).div(4)})
}
function resetSketch() {
    particles = [];
    // Add any additional reset logic here
}

function explode() {
    const explosionCenter = createVector(width / 2, height / 2);
    const numParticles = 200;

    for (let i = 0; i < numParticles; i++) {
        const angle = random(TWO_PI);
        const speed = random(2, 5);
        const vel = createVector(cos(angle) * speed, sin(angle) * speed);
        const pos = explosionCenter.copy();
        particles.push({ pos, vel });
    }
}