import axios from 'axios'

const apiUrl = 'http://localhost:3000/api/products/'

async function getProducts(query?: { 
    page?: number, 
    limit?: number, 
    q?: string,
    locationId?: string,
    inStock?: boolean,
    quantity?: number, 
    onShoppingList?: boolean,
    markedAsBought?: boolean,
    buyAgain?: boolean
}) {
    const response = await axios.get(apiUrl, { params: query });
    return response.data.map((item: { 
        _id: string; name: string; 
        locationId: string; 
        inStock: boolean; 
        unit: string; 
        quantity?: number; 
        useUp?: Date; 
        alwaysInStock?: boolean; 
        onShoppingList?: boolean; 
        markedAsBought?: boolean; 
        buyAgain?: boolean; 
        quantityOnShoppingList?: number; 
        notes?: string; 
    }) => {
        return {
            id: item._id,
            name: item.name,
            locationId: item.locationId,
            inStock: item.inStock,
            quantity: item.quantity || null,
            unit: item.unit,
            useUp: item.useUp ? new Date(item.useUp) : null,
            alwaysInStock: item.alwaysInStock || false,
            onShoppingList: item.onShoppingList || false,
            markedAsBought: item.markedAsBought || false,
            buyAgain: item.buyAgain || false,
            quantityOnShoppingList: item.quantityOnShoppingList || null,
            notes: item.notes || null
        }
    });
}

async function getProductsInStock(query?: { 
    page?: number, 
    limit?: number, 
    q?: string,
    locationId?: string,
    quantity?: number, 
    onShoppingList?: boolean,
    sort?: string,
    sortBy?: string
}) {
    const response = await axios.get(apiUrl + 'stock', { params: query });
    return response.data.map((item: { 
        _id: string; 
        name: string; 
        locationId: string; 
        inStock: boolean; 
        unit: string; 
        quantity?: number;  
        useUp?: Date; 
        alwaysInStock?: boolean; 
        onShoppingList?: boolean;
        markedAsBought?: boolean;
        buyAgain?: boolean; 
        quantityOnShoppingList?: number; 
        notes?: string; }) => {
        return {
            id: item._id,
            name: item.name,
            locationId: item.locationId,
            inStock: item.inStock,
            quantity: item.quantity || null,
            unit: item.unit,
            useUp: item.useUp ? new Date(item.useUp) : null,
            alwaysInStock: item.alwaysInStock || false,
            onShoppingList: item.onShoppingList || false,
            markedAsBought: item.markedAsBought || false,
            buyAgain: item.buyAgain || false,
            quantityOnShoppingList: item.quantityOnShoppingList || null,
            notes: item.notes || null
        }
    });
}

async function addProduct(
    product: { 
        name: string; 
        locationId: string; 
        inStock: boolean; 
        unit: string; 
        quantity?: number;
        useUp?: Date; 
        alwaysInStock?: boolean; 
        onShoppingList?: boolean; 
        markedAsBought?: boolean;
        buyAgain?: boolean; 
        quantityOnShoppingList?: number; 
        notes?: string; 
    }) {
    const response = await axios.post(apiUrl, {
        name: product.name,
        locationId: product.locationId,
        inStock: product.inStock,
        unit: product.unit,
        quantity: product.quantity || null,
        useUp: product.useUp || null,
        alwaysInStock: product.alwaysInStock || false,
        onShoppingList: product.onShoppingList || false,
        markedAsBought: product.markedAsBought || false,
        buyAgain: product.buyAgain || false,
        quantityOnShoppingList: product.quantityOnShoppingList || null,
        notes: product.notes || null
    });
    return response.data._id;
  }

async function updateProduct(itemId: string, updateObj: Object) {
    await axios.put(apiUrl + itemId, updateObj);
}

async function removeProduct(itemId: string) {
    await axios.delete(apiUrl + itemId);
}

export {
    getProducts,
    getProductsInStock,
    addProduct,
    updateProduct,
    removeProduct
}