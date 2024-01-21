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

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}


var count = 0;
var tileCountX = 6;
var tileCountY = 6;

var drawMode = 1;

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
    
}
// inspiration/template https://editor.p5js.org/generative-design/sketches/P_2_1_3_04

function draw() {
  clear();
  noFill();

  count = mouseX / 10 + 10;
  var para = mouseY / height;

  var tileWidth = width / tileCountX;
  var tileHeight = height / tileCountY;

  for (var gridY = 0; gridY <= tileCountY; gridY++) {
    for (var gridX = 0; gridX <= tileCountX; gridX++) {

      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileHeight / 2;

      push();
      translate(posX, posY);

      // switch between modules
      switch (drawMode) {
        case 1:
          stroke(0);
          for (var i = 0; i < count; i++) {
            triangle(-tileWidth / 2, tileHeight / 2, tileWidth / 2, tileHeight / 2, 0, -tileHeight / 2);
            scale(1 - 3 / count);
            rotate(para * 0.1);
          }
          break;
        case 2:
          noStroke();
          for (var i = 0; i < count; i++) {
            var gradient = lerpColor(color(0, 0), color(166, 141, 5), i / count);
            fill(gradient, i / count * 200);
            rotate(PI / 3); // 60 degrees in radians (QUARTER_PI)
            triangle(-tileWidth / 2, tileHeight / 2, tileWidth / 2, tileHeight / 2, 0, -tileHeight / 2);
            scale(1 - 3 / count);
            rotate(para * 1.5);
          }
          break;
        case 3:
          noStroke();
          for (var i = 0; i < count; i++) {
            var gradient = lerpColor(color(0, 130, 164), color(255), i / count);
            fill(gradient, 170);

            push();
            translate(4 * i, 0);
            triangle(-tileWidth / 8, tileHeight / 8, tileWidth / 8, tileHeight / 8, 0, -tileHeight / 4);
            pop();

            push();
            translate(-4 * i, 0);
            triangle(-tileWidth / 8, tileHeight / 8, tileWidth / 8, tileHeight / 8, 0, -tileHeight / 4);
            pop();

            scale(1 - 1.5 / count);
            rotate(para * 1.5);
          }
          break;
      }

      pop();

    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
  if (key == '3') drawMode = 3;
  if (keyCode == DOWN_ARROW) tileCountY = max(tileCountY - 1, 1);
  if (keyCode == UP_ARROW) tileCountY += 1;
  if (keyCode == LEFT_ARROW) tileCountX = max(tileCountX - 1, 1);
  if (keyCode == RIGHT_ARROW) tileCountX += 1;
}


// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}