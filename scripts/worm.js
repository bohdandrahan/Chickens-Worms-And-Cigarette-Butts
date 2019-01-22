class Worm extends Animal{

  setMaxSpeed(maxspeed = random(2)){
    this.maxspeed = maxspeed 
  }
  setNutritionValues(values = []){
    this.nutritionValues = values 
  }
  setDnaLen(dnaLen = 0){
    this.dnaLen = dnaLen;
  }
  setHealthDrop(hD = 0){
    this.healthDrop = hD
  }
  behavior(groupsToEat, groupsToAvoid){
  }

  display() {
    // Draw a worm

    var theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    //dna[0]
    noFill()
    strokeWeight(0.5)
    stroke('white')
    line(0,0,0, -this.dna[0]*50)
    ellipse(0,0, this.dna_vision[0]*2)

    //dna[1]
    strokeWeight(1)
    stroke('red')
    line(0,0,0, -this.dna[1]*10)
    ellipse(0,0, this.dna_vision[1]*2)

    //body
    stroke(255, 153, 204);
    strokeWeight(4);
    line(0, -this.r * 2, 0, this.r * 2);
    pop();
  }
}