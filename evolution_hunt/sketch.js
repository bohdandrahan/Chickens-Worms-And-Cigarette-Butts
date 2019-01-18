// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/

let groups;

var showDna;

function setup() {
  createCanvas(640, 320);
  groups = new Groups([[Worm, 10], [Chicken, 5]])
  showDna = createCheckbox();
}

function draw() {
  background(0, 77, 0);

  groups.behave();
  groups.update();
  groups.display();

}
