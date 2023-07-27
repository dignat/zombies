const Zombies = require('../models/Zombies');
jest.mock('../models/Zombies');

test('test1', () => {
   const zombi =  new Zombies('Lili');
   const addSpy = jest.spyOn(zombi, 'getName');
   // configure the spy behaviour
    addSpy.mockReturnValue('Lili');
   const name = zombi.getName();
   
    expect(name).toBe('Lili');

    addSpy.mockRestore();

});
test('test powers', () => {
    const zombi = new Zombies('Nesi', 'kung-fu');
    const addSpy = jest.spyOn(zombi, 'getPowers');

    addSpy.mockReturnValue('kung-fu');
    const power = zombi.getPowers();
    expect(power).toEqual('kung-fu');
    addSpy.mockRestore();
})