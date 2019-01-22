class CigaretteButt extends Animal{//??really, Animal :)

  setMaxSpeed(maxspeed = 0){
    this.maxspeed = maxspeed 
  }
    setDnaLen(dnaLen = 0){
    this.dnaLen = dnaLen;
  }
    setHealthDrop(hD = 0){
    this.healthDrop = hD
  }
  setDirection(){
  	this.direction = createVector(random(-1,1), random(-1,1))
  }

  display() {
    // Draw a worm

    var theta = this.direction.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    //body
    stroke('white');
    strokeWeight(4);
    line(0, -12, 0, 12);
    stroke('orange')
    line(0,-12,0, -4)
    stroke('black')
    line(0, 10, 0, 12)
    pop();
  }

}