// http://natureofcode.com
// Implements Craig Reynold's autonomous steering behaviors
// See: http://www.red3d.com/cwr/
let groups;
var info, showDna;
var area;
var standartArea;

info = document.getElementById("info");
showDna = true;


function setup() {
  height = 0.95 * windowHeight;
  width = 0.95 * windowWidth;
  let canvas = createCanvas(width, height);
  canvas.parent('sketch-holder')

  area = width * window.height
  standartArea = 200000
  wormsDensity = 10/standartArea
  chickensDensity = 5/standartArea
  cigaretteButtsDensity = 20/standartArea
  groups = new Groups([[Worm, area * wormsDensity], [Chicken, area * chickensDensity], [CigaretteButt, area * cigaretteButtsDensity]]);
}

function draw() {
  background(77, 77, 77);
  groups.behave();
  groups.update();
  groups.display();

}
function windowResized() {
  width = 0.95 * windowWidth;
  height = 0.95 * windowHeight
  resizeCanvas(width, height);
}

info.addEventListener("change", function(e){
	showDna = !showDna;
});
