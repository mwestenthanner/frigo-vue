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
    quantityOnShoppingList: number | null // also optional
    notes: string | null
}

export interface Recipe {
    id: string
    name: string
    description: string
    img: string
    categories: Array<string>
    ingredients: Array<string>
    instructions: Array<string>
    nutritionalValue?: Array<KeyValuePair>
}

export interface Location {
    id: string,
    name: string
}

export interface KeyValuePair {
    key: string
    value: string | number
}