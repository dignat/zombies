const Zombies = require('../models/Zombies');
jest.mock('../models/Zombies');

test('test1', () => {
   const zombi =  new Zombies('Lili');
   const addSpy = jest.spyOn(zombi, 'getName');
   // configure the spy behaviour
    addSpy.mockReturnValue('Lili');
   const name = zombi.getName();
   
    expect(zombi.getName()).toBe('Lili');

    addSpy.mockRestore();

});