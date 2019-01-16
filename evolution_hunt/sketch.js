// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/

let worm;
let food;

function setup() {
  createCanvas(640, 360);
  groups = new Groups([[Worm, 10]])
  food = new Food(100,100);

}

function draw() {
  background(51);

  food.display();

  groups.behave();
  groups.update();
  groups.display();

}
