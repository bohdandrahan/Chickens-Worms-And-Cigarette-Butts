// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/

let groups;

var showDna;

function setup() {
  createCanvas(640, 320);
  groups = new Groups([[Worm, 10], [Chicken, 5], [CigaretteButt, 20]])
  showDna = createCheckbox('Show DNA', true);
}

function draw() {
  background(77, 77, 77);
  groups.behave();
  groups.update();
  groups.display();

}
