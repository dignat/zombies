// zombies model
class Zombies  {
  
    constructor (name, power) {
        this.name = name;
        this.power = power;
    }
    //method
     getName() {
        return this.name;
    }
    getPowers() {
        return this.power
    }
}

module.exports = Zombies;