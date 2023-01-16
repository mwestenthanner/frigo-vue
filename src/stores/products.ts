import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStock } from './stock';
import { getProducts, addProduct, removeProduct, updateProduct } from '@/services/api/products';
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
    await addProduct(product);
    products.value = await getProducts();
  }

  async function updateStoreProduct(productId: string, updateData: any, refreshStock = false) {
    await updateProduct(productId, updateData)
    products.value = await getProducts();
    if (refreshStock) {
      useStock().setStoreProducts();
    }
  }

  async function removeProductFromStore(productId: string) {
    await removeProduct(productId);
    products.value = await getProducts();
  }


  return { 
    products,
    getProductFromId,
    getProductFromName,
    setProducts,
    addProductToStore,
    updateStoreProduct,
    removeProductFromStore
   }
})
