
class Food {
	constructor(N) {
		this.apples = []
		for (let i = 0; i < N; i++){
			let x = random(width);
			let y = random(height);
			this.apples.push(new Apple(x, y));
		}
	}

	display() {
		for (let i = 0; i < this.apples.length; i++) {
			this.apples[i].display();
		}
	}
}

class Apple {
	constructor (x, y) {
		this.position = createVector(x, y);
		this.diameter = 8;
	}

	display() {
		fill(0, 255, 0);
		noStroke();
		ellipse(this.position.x, this.position.y, this.diameter);
	}
}