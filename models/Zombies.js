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
// some comment to test a git flow - rebase locally but merge remotely
// another one comment to double check