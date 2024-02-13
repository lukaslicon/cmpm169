let helixRadius = 50;
let sphereRadius = 12;
let numSpheres = 16;
let helixHeight = 300;
let rotationSpeed = 0.02;
let padding = 50;

let canvasContainer;
let spherePositions = [];
let sphereColors = [];
let breakApartActive = false;

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");

  $(window).resize(function () {
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
    updateSpherePositions();
  });

  updateSpherePositions();
}

function draw() {
background(0);

  rotateX(frameCount * rotationSpeed);
    ambientLight(25);
    pointLight(255, 255, 255, 0, 0, 0);
    pointLight(255, 255, 255, -canvasContainer.width(), 0, 0);
    pointLight(255, 255, 255, canvasContainer.width(), 0, 0);

  for (let i = 0; i < spherePositions.length; i++) {
    let position = spherePositions[i];
    let x = position.x;
    let y = position.y;
    let z = position.z;

    if (breakApartActive) {
      x += random(-10, 10);
      y += random(-10, 10);
      z += random(-10, 10);
    }

    push();
    translate(x, y, z);

    fill(sphereColors[i]);
    ambientMaterial(sphereColors[i]); 

    noStroke();
    sphere(sphereRadius);
    pop();
  }
}

function updateSpherePositions() {
  spherePositions = [];

  let numHelixX = Math.floor((width - padding) / (2 * (helixRadius + padding)));
  let numHelixY = Math.floor((height - padding) / (4 * (helixRadius + padding)));

  for (let j = 0; j < numHelixY; j++) {
    for (let i = 0; i < numHelixX; i++) {
      for (let k = 0; k < numSpheres; k++) {
        let angle1 = map(k, 0, numSpheres, 0, TWO_PI);
        let x1 = i * (2 * helixRadius + padding) + helixRadius * cos(angle1) - ((numHelixX - 1) * (2 * helixRadius + padding)) / 2;
        let z1 = j * (4 * helixRadius + padding) + helixRadius * sin(angle1) - ((numHelixY - 1) * (4 * helixRadius + padding)) / 2;
        let y1 = map(k, 0, numSpheres, -helixHeight / 2, helixHeight / 2);
        spherePositions.push(createVector(x1, y1, z1));

        let angle2 = angle1 + PI;
        let x2 = i * (2 * helixRadius + padding) + helixRadius * cos(angle2) - ((numHelixX - 1) * (2 * helixRadius + padding)) / 2;
        let z2 = j * (4 * helixRadius + padding) + helixRadius * sin(angle2) - ((numHelixY - 1) * (4 * helixRadius + padding)) / 2;
        let y2 = y1;
        spherePositions.push(createVector(x2, y2, z2));
      }
    }
  }

  sphereColors = [];
  for (let i = 0; i < spherePositions.length; i++) {
    sphereColors[i] = color(random(255), random(255), random(255));
  }
}

function toggleBreakApart() {
  breakApartActive = !breakApartActive;
}

function toggleRandomColors() {
  for (let i = 0; i < spherePositions.length; i++) {
    sphereColors[i] = color(random(255), random(255), random(255));
  }
}

function toggleRotationSpeedUp() {
  rotationSpeed += 0.01;
}

function toggleRotationSpeedDown() {
  rotationSpeed -= 0.01;
  rotationSpeed = max(rotationSpeed, 0);
}

function increaseNumSpheres() {
  numSpheres += 5;
  updateSpherePositions();
}

function decreaseNumSpheres() {
  numSpheres -= 5;
  numSpheres = max(numSpheres, 5);
  updateSpherePositions();
}

function increasePadding() {
  padding += 10;
  padding = min(padding, 80);
  updateSpherePositions();
}

function decreasePadding() {
  padding -= 10;
  padding = max(padding, 10);
  updateSpherePositions();
}

function increaseHelixRadius() {
  helixRadius += 5;
  updateSpherePositions();
}

function decreaseHelixRadius() {
  helixRadius -= 5;
  helixRadius = max(helixRadius, 5);
  updateSpherePositions();
}

function increaseSphereRadius() {
  sphereRadius += 2;
  updateSpherePositions();
}

function decreaseSphereRadius() {
  sphereRadius -= 2;
  sphereRadius = max(sphereRadius, 2);
  updateSpherePositions();
}
