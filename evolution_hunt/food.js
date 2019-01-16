class Food {
	constructor(num_of_apples, num_of_poisoned_apples) {
		this.apples = []
		this.poisonedApples = []
		for (let i = 0; i < num_of_apples; i++){
			let x = random(width);
			let y = random(height);
			this.apples.push(new Apple(x, y));
		}
		for (let i = 0; i < num_of_poisoned_apples; i++){
			let x = random(width);
			let y = random(height);
			this.poisonedApples.push(new PoisonedApple(x,y))
		}
	}

	display() {
		for (let i = 0; i < this.apples.length; i++) {
			this.apples[i].display();
		}
		for (let i = 0; i < this.poisonedApples.length; i++) {
			this.poisonedApples[i].display();
		}
	}
}

class AbstractApple {
	constructor (x, y) {
	this.position = createVector(x, y);
	this.diameter = 8;
	this.setColor()
	}		

	display() {
		fill(this.clr);
		noStroke();
		ellipse(this.position.x, this.position.y, this.diameter);
	}
}

class Apple extends AbstractApple {
	setColor(){
		this.clr = ['green']
	}
}

class PoisonedApple extends AbstractApple{
	setColor(){
		this.clr = ['red']
	}
}