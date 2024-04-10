import {describe, it, vi, expect, beforeEach} from 'vitest';
import { ShoppingBasket } from './shoppingCart';
import { ShoppingCart, ShoppingItems } from './shoppingCartModel';
describe.skip('shoppingCart', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })
    const items = [
        {item: 'apple', price: 3, specialPrice: '3 for 6'},
        {item: 'apple', price: 3, specialPrice: '3 for 6'},
        {item: 'lemon', price: 2, specialPrice: ''}] as ShoppingItems[]
    const basket = new ShoppingBasket(items);
    const shoppingCart: ShoppingCart = {items: items, 
    qtyOfItems: [{itemName: 'apple', qty: 2, totalForItem: 6,specialPrice: '3 for 6'},
    {itemName: 'lemon', qty: 1, totalForItem: 2, specialPrice: ''}], totalToPay: 6}
    it('should extract number from string', async () => {
        expect(basket.extractNumberFromString('3 for 5')).toEqual({qty: 3, price: 5})
    });
    it('should push items into shoppingCart', async () => {
        expect(basket.updateShoppingCart({items:[], qtyOfItems: 
            [{itemName: '', qty: 0, totalForItem: 0, specialPrice: ''}], totalToPay: 0} )).toEqual(
                expect.objectContaining({items: 
                    expect.arrayContaining([
                        {item: 'apple', price: 3, specialPrice: '3 for 6'},
                         {item: 'apple', price: 3, specialPrice: '3 for 6'},
                         {item: 'lemon', price: 2, specialPrice: ''}
            
        ])}));
    })
    it('should accumulate price and qty of items', () => {
        expect(basket.updateShoppingCart({...shoppingCart, qtyOfItems: []})).toEqual(expect.objectContaining({
            qtyOfItems: expect.arrayContaining([
                {itemName: 'apple', qty: 2, totalForItem: 6, specialPrice: '3 for 6'},
                {itemName: 'lemon', qty: 1, totalForItem: 2, specialPrice: ''}
            ])
        }))
    });
    it('should calculate total price', () => {
        const newBasket = new ShoppingBasket([
            {item: 'apple', price: 1, specialPrice: '3 for 6'},
        {item: 'apple', price: 1, specialPrice: '3 for 6'},
        {item: 'lemon', price: 2, specialPrice: ''}])
        expect(newBasket.updateShoppingCart({...shoppingCart, qtyOfItems: []}))
        .toEqual(expect.objectContaining({totalToPay: 4}))
    });
    it('should calculate correctly total price with applied special price', () => {
        const res = basket.precalculateTotal([
            {itemName: 'apple', qty: 3, totalForItem: 9, specialPrice: '2 for 3'},
                {itemName: 'lemon', qty: 1, totalForItem: 2, specialPrice: ''}
        ]);
        expect(res).toEqual(expect.objectContaining([
            {itemName: 'apple', qty: 3, totalForItem: 6, specialPrice: '2 for 3'},
                {itemName: 'lemon', qty: 1, totalForItem: 2, specialPrice: ''}
        ]))
    })
    it('should respect special Price rule and adjust price', () => {
        const newBasket = new ShoppingBasket([
            {item: 'apple', price: 3, specialPrice: '2 for 3'},
        {item: 'apple', price: 3, specialPrice: '2 for 3'},
        {item: 'apple', price: 3, specialPrice: '2 for 3'},
        {item: 'lemon', price: 2, specialPrice: ''}])
        expect(newBasket.updateShoppingCart({...shoppingCart, qtyOfItems: []})).toEqual(expect.objectContaining({totalToPay: 8}))
    });
 
});
