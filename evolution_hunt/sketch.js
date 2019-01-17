// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/

let worm;
let food;

function setup() {
  createCanvas(640, 360);
  groups = new Groups([[Worm, 30]])
  food = new Food(30,10);

}

function draw() {
  background(77, 51, 25);

  food.update();
  food.display();

  groups.boundaries();
  groups.behave();
  groups.update();
  groups.display();

}
