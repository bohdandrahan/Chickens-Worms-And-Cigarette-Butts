// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/

let worm;
let food;

function setup() {
  createCanvas(640, 640);
  groups = new Groups([[Worm, 100]])
  food = new Food(600,200);

}

function draw() {
  background(77, 51, 25);

  food.update();
  food.display();

  groups.behave();
  groups.update();
  groups.display();

}
