export const captureAndLog = (itemsToLog: unknown, message: string) => {
    console.info(itemsToLog, message)
}

export type ShoppingBasketError = {
    type: string,
    message: string
}

export type MyTestType = {
    __typename: string,
    message: string
}

export type Dodo = {
    type: string
}