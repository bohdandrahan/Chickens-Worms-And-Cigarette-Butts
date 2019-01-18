class Chicken extends Animal{

  setNutritionValues(values = [0.25]){
    this.nutritionValues = values // [worms]
  }
  setDnaLen(dnaLen = 1){
    this.dnaLen = dnaLen;
  }
  setHealthDrop(){
    this.healthDrop = 0.0015
  }

  setMaxSpeed(maxspeed = 2.3){
    this.maxspeed = maxspeed 
  }
  setDnaCeiling(){
    this.dnaCeiling = 2;
    this.dnaCeilingVision = 100
  }

  display() {
    // Draw a worm

    var theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);    rotate(theta);

    //dna 
    if (showDna.checked()){
    noFill()
    strokeWeight(1)
    stroke('pink')
    line(0,0,0, -this.dna[0]*50)
    ellipse(0,0, this.dna_vision[0]*2)
    }
    //body
    noStroke()
    fill(255, 204, 102)
    beginShape();
    vertex(0, -20);
    vertex(-10, 0);
    vertex(10, 0);
    endShape(CLOSE);

    fill('white')
    colorMode(HSB);
    stroke((80*this.health)%360, 100, 100)
    strokeWeight(4)
    ellipse(0,0,25)
    colorMode(RGB)
    noStroke()
    fill('red')
    ellipse(0, -5, 10)
    pop();
  }
}