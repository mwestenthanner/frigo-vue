import { defineStore } from 'pinia'
import type { Product } from '@/types';
import { getProductsInStock } from '@/services/api/products';
import { ref } from 'vue';
import { parseQueryWithStatus } from '@/services/helpers/status';

export const useStock = defineStore('stock', () => {
  // State values
  const stock = ref<[Product]>()

  // Getters
  function getProductFromId (id: string) {
    return stock.value?.find((product) => product.id === id)
  }

  function getProductFromName (name: string) {
    return stock.value?.find((product) => product.name === name)
  }

  // Actions
  async function setProducts(query?: any) {
    if (query && query.status) {
      query = parseQueryWithStatus(query);
    }
    stock.value = await getProductsInStock(query);
  }

  function addProduct(product: Product) {
    stock.value?.push(product);
  }

  function removeProduct(productId: string) {
    const index = stock.value?.findIndex(i => i.id === productId);
    if (index) {
      stock.value?.splice(index, 1);
    }
  }

  return { 
    stock,
    getProductFromId,
    getProductFromName,
    setProducts,
    addProduct,
    removeProduct
  }
})