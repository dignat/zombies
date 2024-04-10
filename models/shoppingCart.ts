import { ShoppingCartItems, ShoppingCart, ShoppingItems } from "./shoppingCartModel";
//import { captureAndLog } from "./types";

export class ShoppingBasket {
    private items;
    constructor(items: ShoppingItems[]) {
        this.items = items;

    }

    extractNumberFromString(string: string) {
        const match: (string)[] | null = string.match(/(\d+)/g);
        return {qty: Number(match?.[0]), price: Number(match?.[1])}
    }

    precalculateTotal(items: ShoppingCartItems[]): ShoppingCartItems[] {
        return items.map((item) => {
            if (item.specialPrice) {
                const convertedSpecialPrice = this.extractNumberFromString(item.specialPrice);
                if (item.qty > convertedSpecialPrice.qty) {
                    const outstandingQty = (item.qty - convertedSpecialPrice.qty);
                    const outstandingPrice = (item.totalForItem / item.qty);
                    item.totalForItem = (outstandingQty * outstandingPrice) + convertedSpecialPrice.price;
                }
                return item;
            } 
            return item;
        });
    }


    updateShoppingCart(shoppingCart: ShoppingCart) {
      if (shoppingCart.items.length === 0) {
        shoppingCart.items = this.items;
      }
     const accumulateItems = this.items.reduce((acc: Record<string, ShoppingCartItems>, current: ShoppingItems) => {
        const {item} = current;
        acc[item] = {itemName: item, totalForItem: (item in acc ? acc[item].totalForItem : 0) + current.price, 
            qty: (item in acc ? acc[item].qty : 0) + 1, specialPrice: current.specialPrice}
        return acc;
      }, {} as Record<string, ShoppingCartItems>);
       //accumilation works
      const modifiedQtyItems = this.precalculateTotal(Object.values(accumulateItems))
     // captureAndLog(accumulateItems, 'lemon')
      let total = 0;
      modifiedQtyItems.forEach((item) => {
        total += item.totalForItem;
      });
      shoppingCart.qtyOfItems = modifiedQtyItems;
    
      shoppingCart.totalToPay = total;
      

      return shoppingCart;
    }

} 