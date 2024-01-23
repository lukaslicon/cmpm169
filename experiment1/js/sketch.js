// sketch.js

// Constants - User-servicable parts
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
let insideColor; // Variable to store the initial inside color

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
var drawMode = 1;

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");

    $(window).resize(function () {
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    myInstance = new MyClass(VALUE1, VALUE2);

    // Set the initial inside color to a random shade of blue
    insideColor = color(random(50, 150), random(100, 200), random(150, 255));
}

function draw() {
    clear();
    noFill();

    count = mouseX / 10 + 10;
    var para = mouseY / height;

    var tileWidth = width / 2;  // Set the tile width to half of the canvas width
    var tileHeight = height / 2; // Set the tile height to half of the canvas height

    var posX = width / 2;
    var posY = height / 2;

    push();
    translate(posX, posY);

    let colorChangeRate = 0.005;

    switch (drawMode) {
      case 1:
        // Fill quad with black color
        fill(0);

        for (var i = 0; i < count; i++) {
            // Different color for each border
            let borderColor = color(frameCount % 255, (frameCount * 2 + i * 10) % 255, (frameCount * 3 + i * 20) % 255);
            stroke(borderColor);

            // Draw diamond shape
            quad(-tileWidth / 2, 0, 0, -tileHeight / 2, tileWidth / 2, 0, 0, tileHeight / 2);
            scale(1 - 3 / count);
            rotate(para * 0.1);
        }
          break;
        // Other cases...
        case 2:
            noStroke();
            for (var i = 0; i < count; i++) {
                // Slowly changing color
                var lerpValue = (i / count + frameCount * colorChangeRate) % 1;
                var blueShade = lerpColor(color(0, 130, 164), color(255), lerpValue);
                fill(blueShade, 170);

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

function keyReleased() {
    if (key == '1') drawMode = 1;
    if (key == '2') drawMode = 2;
}
