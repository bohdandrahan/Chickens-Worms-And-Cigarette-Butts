class Groups {
  constructor(dataAboutGroups = [[Worm, 10]]) {
    //dataAboutGroups - array where each element is [name, qty]
    this.animals = []
    console.log(dataAboutGroups)
    this.dataAboutGroups = dataAboutGroups
    this.dataAboutGroups.forEach((name_qty, index) =>{
      this.animals[index] = []
      console.log('uaoeu')
      for (let i = 0; i < name_qty[1]; i++){
        this.addNewAnimal(this.animals[index], name_qty[0])
      }
    })
  }
  addNewAnimal(group, name, x = random(width), y = random(height)){
    group.push(new name(x,y));
  }

  addAnimal(group, animal){
    group.push(animal)
  }

  behave(){
    //worms
    this.animals[0].forEach((worm) => {
      worm.behavior([], [])
    });
    //chickens
    this.animals[1].forEach((chicken) => {
      let worms = this.animals[0]
      chicken.behavior([worms],[])
    })
  }
  update() {
    this.animals.forEach((animals, i) => {
      this.children = []
      animals.forEach((animal, j) => {
        animal.update();
        if (animal.isDead()){
            // food.addNewApple(animal.position.x + random(-10,10), animal.position.y + random(-10,10))
          animals.splice(j, 1);
        }

        if (animal.health > 1.5){
          animal.health -= 1
          let child = animal.getChild()
          this.children.push(child)
        }
      })
      if (this.children.length > 0){
        this.children.forEach((child) =>{
          this.addAnimal(animals, child)
        })
      }
    })

    //Worms
    this.wormsBirth()
  }
  wormsBirth() {
    let worms = this.animals[0]
    let initNumOfWorms = this.dataAboutGroups[0][1]
    if(worms.length === 0){
      this.addNewAnimal(worms, Worm)
    }
    worms.forEach((worm) => {
      let birthProb = 0.03/worms.length
      if (random() < birthProb){
        let newDna = worm.getMutatedDna()
        let newSpeed = min((worm.maxspeed + random(-0.1,0.1)), 1.7)
        let x = random(width)
        let y = random(height)
        let newWorm = new Worm(x,y)
        newWorm.setDna(newDna)
        newWorm.setMaxSpeed(newSpeed)
        this.addAnimal(worms, newWorm)
      }
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