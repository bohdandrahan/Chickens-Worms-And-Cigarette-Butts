// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/

let vehicle;
let food;

function setup() {
  createCanvas(640, 360);
  vehicle = new Vehicle(width / 2, height / 2);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);

  food = new Food(10);
  }

}

function draw() {
  background(51);

  food.display();
  vehicle.hunt(food.apples);
  vehicle.update();
  vehicle.display();

}
