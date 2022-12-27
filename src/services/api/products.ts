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
}) {
    const response = await axios.get(apiUrl, { params: query });
    return response.data.map((item: { _id: string; name: string; locationId: string; inStock: boolean; unit: string; quantity?: number;  useUp?: Date; alwaysInStock?: boolean; onShoppingList?: boolean; quantityOnShoppingList?: number; notes?: string; }) => {
        return {
            id: item._id,
            name: item.name,
            locationId: item.locationId,
            inStock: item.inStock,
            quantity: item.quantity || null,
            unit: item.unit,
            useUp: item.useUp || null,
            alwaysInStock: item.alwaysInStock || false,
            onShoppingList: item.onShoppingList || false,
            quantityOnShoppingList: item.quantityOnShoppingList || null,
            notes: item.notes || null
        }
    });
}

async function getProductsInStock() {
    const response = await axios.get(apiUrl + 'stock');
    return response.data.map((item: { _id: string; name: string; locationId: string; inStock: boolean; unit: string; quantity?: number;  useUp?: Date; alwaysInStock?: boolean; onShoppingList?: boolean; quantityOnShoppingList?: number; notes?: string; }) => {
        return {
            id: item._id,
            name: item.name,
            locationId: item.locationId,
            inStock: item.inStock,
            quantity: item.quantity || null,
            unit: item.unit,
            useUp: item.useUp || null,
            alwaysInStock: item.alwaysInStock || false,
            onShoppingList: item.onShoppingList || false,
            quantityOnShoppingList: item.quantityOnShoppingList || null,
            notes: item.notes || null
        }
    });
}

async function addProduct(product: { name: string; locationId: string; inStock: boolean; unit: string; quantity?: number;  useUp?: Date; alwaysInStock?: boolean; onShoppingList?: boolean; quantityOnShoppingList?: number; notes?: string; }) {
    const response = await axios.post(apiUrl, {
        name: product.name,
        locationId: product.locationId,
        inStock: product.inStock,
        unit: product.unit,
        quantity: product.quantity || null,
        useUp: product.useUp || null,
        alwaysInStock: product.alwaysInStock || false,
        onShoppingList: product.onShoppingList || false,
        quantityOnShoppingList: product.quantityOnShoppingList || null,
        notes: product.notes || null
    });
    return response.data._id;
  }

async function updateProduct(itemId: string) {
    await axios.delete(apiUrl + itemId);
}

async function removeProduct(itemId: string) {
    await axios.delete(apiUrl + itemId);
}

export {
    getProducts,
    getProductsInStock,
    addProduct,
    removeProduct
}