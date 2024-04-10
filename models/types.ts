export const captureAndLog = (itemsToLog: unknown, message: string) => {
    console.info(itemsToLog, message)
}

export type ShoppingBasketError = {
    type: string,
    message: string
}