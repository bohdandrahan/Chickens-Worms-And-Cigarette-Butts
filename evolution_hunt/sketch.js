// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/

let worm;
let food;

function setup() {
  createCanvas(640, 360);
  worm = new Worm(width / 2, height / 2);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);

  food = new Food(100,100);
  }

}

function draw() {
  background(51);

  food.display();

  worm.behavior([food.apples, food.poisonedApples],[]);
  // worm.hunt(food.poisonedApples);

  worm.update();
  worm.display();

}
