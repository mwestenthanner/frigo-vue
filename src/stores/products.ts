import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getProducts, addProduct, removeProduct } from '@/services/api/products';
import type { Product, Location } from '@/types';

export const useProductStore = defineStore('products', () => {
  const products = ref<[Product]>();

  // Getters
  function getProductFromId (id: string) {
    return products.value?.find((product) => product.id === id)
  }

  function getProductFromName (name: string) {
    return products.value?.find((product) => product.name === name)
  }

  // Actions
  async function setProducts() {
    products.value = await getProducts();
  }

  async function addProductToStore(product: { name: string; locationId: string; inStock: boolean; unit: string; quantity?: number;  useUp?: Date; alwaysInStock?: boolean; onShoppingList?: boolean; quantityOnShoppingList?: number; notes?: string }) {
    const productId = await addProduct(product);
    products.value?.push({
        id: productId,
        name: product.name,
        locationId: product.locationId,
        inStock: product.inStock,
        quantity: product.quantity || null,
        unit: product.unit,
        useUp: product.useUp || null,
        alwaysInStock: product.alwaysInStock || false,
        onShoppingList: product.onShoppingList || false,
        quantityOnShoppingList: product.quantityOnShoppingList || null,
        status: getProductStatus(),
        notes: product.notes || null
    });
  }

  async function removeProductFromStore(productId: string) {
    const index = products.value?.findIndex(i => i.id === productId);
    if (index) {
        products.value?.splice(index, 1);
    }
    await removeProduct(productId);
  }

  function getProductStatus() {
    return "None"
  }

  return { 
    products,
    getProductFromId,
    getProductFromName,
    setProducts,
    addProductToStore,
    removeProductFromStore
   }
})
