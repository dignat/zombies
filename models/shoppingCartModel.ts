

export type ShoppingItems = {
    item: string,
    price: number,
    specialPrice: string
}
export type ShoppingCartItems = {
    itemName: string,
    qty: number,
    totalForItem: number,
    specialPrice: string
}
export type ShoppingCart = {
    items: ShoppingItems[]
    qtyOfItems: ShoppingCartItems[]
    totalToPay: number
}

export type ShoppinError = {
    type: string,
    message: string
}