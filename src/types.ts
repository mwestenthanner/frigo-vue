export interface Product {
    id: string
    name: string
    locationId: string 
    unit: string
    inStock: boolean
    status: string
    quantity: number | null // Quantity should be optional
    useUp: Date | null
    alwaysInStock: boolean
    onShoppingList: boolean
    markedAsBought: boolean
    buyAgain: boolean
    quantityOnShoppingList: number | null // also optional
    notes: string | null
}

export interface Recipe {
    id: string
    name: string
    description: string
    img: string
    categories: Array<string>
    ingredients: Array<{ quantity: string, unit: string, ingr: string }>
    instructions: Array<{ step: number, instr: string }>
}

export interface Location {
    id: string,
    name: string
}

export interface KeyValuePair {
    key: string
    value: string | number
}