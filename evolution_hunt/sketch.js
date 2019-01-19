// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/
let groups;
var showDna;
var area;
var standartArea;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  area = window.innerWidth * window.innerHeight
  standartArea = 200000
  wormsDensity = 10/standartArea
  chickensDensity = 5/standartArea
  cigaretteButtsDensity = 20/standartArea
  console.log(area * cigaretteButtsDensity)
  groups = new Groups([[Worm, area * wormsDensity], [Chicken, area * chickensDensity], [CigaretteButt, area * cigaretteButtsDensity]]);
  showDna = createCheckbox('Show DNA', true);
}

function draw() {
  background(77, 77, 77);
  groups.behave();
  groups.update();
  groups.display();

}
