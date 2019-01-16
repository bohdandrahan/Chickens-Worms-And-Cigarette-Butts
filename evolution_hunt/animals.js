// http://natureofcode.com
// The "Vehicle" class
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
  behave(){
    this.animals[0].forEach((worm, index) => {
      worm.behavior([food.apples, food.poisonedApples], [])
    })
  }
  update() {
    this.animals.forEach((animals, index) => {
      this.animals[index].forEach((animal, index) => {
        animal.update()
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


class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
    this.r = 6;
    this.setMaxSpeed();
    this.setMaxForce();
    this.setDnaLen();
    this.dna = []
    for (let i = 0; i < this.dnaLen; i++){
      this.dna.push(random(-5, 5))
    }
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
  // Method to update location
  update() {  
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
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
      steers[index] = this.hunt(group)
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

  hunt(preys){
    let nearest = this.findNearest(preys)
    if (nearest){
      if(this.distanceTo(nearest) < 5){
        preys.splice(preys.indexOf(nearest), 1);
        return this.seek(this.position);
      }else {
        return this.seek(nearest.position);
      }
    }else {
      return this.seek(this.position);
    }
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

class Worm extends Vehicle{

  setMaxSpeed(maxspeed = 2){
    this.maxspeed = maxspeed;
  }
  setMaxForce(maxforce = 0.02) {
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

    strokeWeight(2)
    stroke('green')
    line(0,0,0, -this.dna[0]*10)

    strokeWeight(2)
    stroke('red')
    line(0,0,0, -this.dna[1]*10)


    stroke('pink');
    strokeWeight(4);
    line(0, -this.r * 2, 0, this.r * 2);
    pop();
  }
}