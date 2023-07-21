const Zombies = require('../models/Zombies');

test('zombi class', () => {
    class MockZombie extends Zombies {
        getName () {
            return this.name;
        }
    }
    const zombie = new MockZombie('Lili');
    const name = zombie.getName();
    
    expect(name).toEqual('Lili');
})