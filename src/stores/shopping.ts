import { defineStore } from 'pinia'
import type { Product } from '@/types';
import { ref } from 'vue';

export const useShoppingListStore = defineStore('shopping', () => {
  // State values
  const entries = ref<[Product]>();

  // Getters

  // Actions
  function addProduct(product: Product) {
    entries.value?.push(product);
  }

  function removeProduct(productId: string) {
    const index = entries.value?.findIndex(i => i.id === productId);
    if (index) {
      entries.value?.splice(index, 1);
    }
  }

  return { 
    entries,
    addProduct,
    removeProduct
  }
})