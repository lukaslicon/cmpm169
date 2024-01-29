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
let resetButton;
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

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;
    // Create initial particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(random(width), random(height)));
    }
  
    // Create reset button
    resetButton = createButton('Reset Particles');
    resetButton.position(canvasContainer.position().left + 50, canvasContainer.position().top);
    resetButton.mousePressed(resetParticles);
  }
  
  function draw() {
    background(255);
  
    // Apply behaviors and update particles
    for (let particle of particles) {
      let alignmentForce = particle.align(particles);
      let cohesionForce = particle.cohere(particles);
      let separationForce = particle.separate(particles);
  
      particle.applyForce(alignmentForce);
      particle.applyForce(cohesionForce);
      particle.applyForce(separationForce);
  
      particle.update();
      particle.checkBoundaries();
      particle.display();
      particle.drawTrail(); // Draw the particle's trail
    }
  }
  
  function resetParticles() {
    // Reset the positions and velocities of the particles to their initial random values
    for (let particle of particles) {
      particle.position.x = random(width);
      particle.position.y = random(height);
      particle.velocity = createVector(random(-2, 2), random(-2, 2));
    }
  }
  
  class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-2, 2), random(-2, 2));
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 15;
      this.size = 15;
      this.perceptionRadius = 50;
      this.trail = [];
    }
  
    align(particles) {
      let sum = createVector(0, 0);
      let count = 0;
  
      for (let other of particles) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other !== this && d < this.perceptionRadius) {
          sum.add(other.velocity);
          count++;
        }
      }
  
      if (count > 0) {
        sum.div(count);
        sum.setMag(this.maxSpeed);
        sum.sub(this.velocity);
        sum.limit(0.1);
      }
  
      return sum;
    }
  
    cohere(particles) {
      let sum = createVector(0, 0);
      let count = 0;
  
      for (let other of particles) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other !== this && d < this.perceptionRadius) {
          sum.add(other.position);
          count++;
        }
      }
  
      if (count > 0) {
        sum.div(count);
        return this.seek(sum);
      } else {
        return createVector(0, 0);
      }
    }
  
    separate(particles) {
      let sum = createVector(0, 0);
      let count = 0;
  
      for (let other of particles) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other !== this && d < this.perceptionRadius) {
          let diff = p5.Vector.sub(this.position, other.position);
          diff.normalize();
          diff.div(d);
          sum.add(diff);
          count++;
        }
      }
  
      if (count > 0) {
        sum.div(count);
        sum.setMag(this.maxSpeed);
        sum.sub(this.velocity);
        sum.limit(0.5);
      }
  
      return sum;
    }
  
    seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(0.1);
      return steer;
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    checkBoundaries() {
      if (this.position.x < 0) this.position.x = width;
      if (this.position.x > width) this.position.x = 0;
      if (this.position.y < 0) this.position.y = height;
      if (this.position.y > height) this.position.y = 0;
    }
  
    display() {
      noStroke();
      fill(0, 150, 255);
      ellipse(this.position.x, this.position.y, this.size, this.size);
    }
  
    drawTrail() {
        for (let i = this.trail.length - 1; i >= 0; i--) {
          let alpha = map(i, 0, this.trail.length - 1, 100, 0);
          alpha *= sin(map(i, 0, this.trail.length - 1, 0, PI / 2)); // Apply sine fade
    
          fill(0, 150, 255, alpha);
          ellipse(this.trail[i].x, this.trail[i].y, this.size * 2, this.size * 2);
        }
    
        this.trail.push(createVector(this.position.x, this.position.y));
    
        if (this.trail.length > 10) {
          this.trail.shift();
        }
      }
    }
  