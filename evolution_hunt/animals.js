// http://natureofcode.com
// The "Animal" class
class Groups {
  constructor(dataAboutGroups = [[Worm, 10]]) {
    //dataAboutGroups - array where each element is [name, qty]
    this.animals = []
    dataAboutGroups.forEach((group, index) =>{
      this.animals[index] = []
      for (let i = 0; i < group[1]; i++){
        let x = random(width);
        let y = random(height);
        this.animals[index].push(new group[0](x,y));
      }
    })
  }
  boundaries(){
    this.animals.forEach((animals, i) => {
      this.animals[i].forEach((animal, j) => {
          animal.boundaries()
      })
    })
  }
  behave(){
    this.animals[0].forEach((worm, index) => {
      worm.behavior([food.apples, food.poisonedApples], [])
    })
  }
  update() {
    this.animals.forEach((animals, i) => {
      this.animals[i].forEach((animal, j) => {
        animal.update();
        if (animal.isDead()){
          this.animals[i].splice(j, 1);
        }
      })
    })
  }
  display() {
    this.animals.forEach((animals, index) => {
      this.animals[index].forEach((animal, index) => {
        animal.display()
      })
    })
  }
}


class Animal {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.position = createVector(x, y);
    this.r = 6;
    this.setMaxSpeed();
    this.velocity = createVector(random(this.maxspeed), random(this.maxspeed));
    this.setMaxForce();
    this.setDnaLen();
    this.setNutritionValues();
    this.setDna();
    this.health = 1;
  }
  setNutritionValues(){
    this.nutritionValues = [0.1, -0.1]
  }
  setMaxSpeed(maxspeed = 3){
    this.maxspeed = maxspeed 
  }

  setMaxForce(maxforce = 0.4) {
    this.maxforce = maxforce
  }
  setDnaLen(dnaLen = 2){
    this.dnaLen = dnaLen
  }
  setDna(){
    this.dna = [];
    for (let i = 0; i < this.dnaLen; i++){
      this.dna.push(random(-2, 2));
    }

    this.dna_vision = [];
    for (let i = 0; i < this.dnaLen; i++){
      this.dna_vision.push(random(0, 100));
    }
  }
  // Method to update location
  update() {  
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);

    this.health -= 0.003
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY

  behavior(groupsToEat, groupsToAvoid){
    var steers = []
    groupsToEat.forEach((group, index) =>{
      steers[index] = this.hunt(group, this.nutritionValues[index], this.dna_vision[index])
    })
    groupsToAvoid.forEach((group, index) =>{
      let steer = this.avoid(group)
      steers.push(steer)
    })
    steers.forEach((steer, index) =>{
      steer.mult(this.dna[index]);
      this.applyForce(steer);
    })
  }

  hunt(preys, nutrition, vision){
    let nearest = this.findNearest(preys)
    if (nearest){
      if(this.distanceTo(nearest) < this.maxspeed){
        this.eat(preys, nearest, nutrition)
        return createVector(0,0);
      }else  if (this.distanceTo(nearest) < vision){
        return this.seek(nearest.position);
      }
      else {
        return createVector(0,0)
      }
    }else {
      return createVector(0,0);
    }
  }
  eat(preys, prey, nutrition){
    preys.splice(preys.indexOf(prey), 1);
    this.health += nutrition
  }

  avoid(group){
    let nearest = this.findNearest(group)
    if (nearest){
        this.seek(nearest.position);
    }
  }

  findNearest(preys) {
    let record = Infinity;
    let nearest = null;
    for (var i = 0; i < preys.length; i++) {
      let d = this.distanceTo(preys[i]);
      if (d < record){
        record = d;
        nearest = preys[i];
      }
    }
    return nearest;
  }

  isDead(){
    return (this.health < 0)
  }

  distanceTo(object) {
    return this.position.dist(object.position);
  }

  seek(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  }

  boundaries() {
    let d = 25;

    let desired = null;

    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }



  getHealthColor(){
    return lerpColor(color(255,0,0),color(0,255,0),this.health)
  }


  display() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

}

class Worm extends Animal{

  setNutritionValues(values = [0.1, -0.5]){
    this.nutritionValues = values // [apples, poisonedApples]
  }

  setMaxSpeed(maxspeed = 2){
    this.maxspeed = maxspeed;
  }
  setMaxForce(maxforce = 0.1) {
    this.maxforce = maxforce;
  }
  setDnaLen(dnaLen = 2){
    this.dnaLen = dnaLen;
  }

  display() {
    // Draw a worm


    var theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    noFill()
    strokeWeight(1)
    stroke('green')
    line(0,0,0, -this.dna[0]*50)
    ellipse(0,0, this.dna_vision[0]*2)


    strokeWeight(1)
    stroke('red')
    line(0,0,0, -this.dna[1]*10)
    ellipse(0,0, this.dna_vision[1]*2)

    //body
    stroke('pink');
    strokeWeight(4);
    line(0, -this.r * 2, 0, this.r * 2);

    //healthBar
    colorMode(HSB);
    stroke((80*this.health)%360, 100, 100)
    strokeWeight(2)
    line(5, this.health*10, 5, -this.health*10)
    colorMode(RGB)
    pop();
  }
}