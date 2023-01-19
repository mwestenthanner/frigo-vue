import { defineStore } from 'pinia'
import type { Product } from '@/types';
import { getProducts, updateProduct } from '@/services/api/products';
import { ref } from 'vue';

export const useShoppingListStore = defineStore('shopping', () => {
  // State values
  const shoppingList = ref<[Product]>();

  // Getters

  // Actions
  async function setShoppingList() {
    console.log('setting')
    const query = { onShoppingList: true }
    const list = await getProducts(query);
    list.forEach((product: Product) => {
      product.buyAgain = isBuyAgain(product);
    });

    shoppingList.value = list;
  }

  async function checkItem(productId: string) {
    await updateProduct(productId, { inStock: true, markedAsBought: true });
    await setShoppingList();
  }

  async function uncheckItem(productId: string, isBuyAgain: boolean) {
    // do not modify stock if buying again
    if (isBuyAgain) {
      await updateProduct(productId, { markedAsBought: false });
    } else await updateProduct(productId, { inStock: false, markedAsBought: false });
    await setShoppingList();
  }

  async function clearChecked() {
    const checkedItems = await getProducts({ markedAsBought: true });
    checkedItems.forEach(async (product: Product) => {
      await updateProduct(product.id, { onShoppingList: false, markedAsBought: false });
    })
    await setShoppingList();
  }
  
  async function removeFromShoppingList(productId: string) {
    await updateProduct(productId, { onShoppingList: false, markAsBought: false, buyAgain: false });
    await setShoppingList();
  }

  function isBuyAgain(product: Product) {
    if (product.buyAgain) return true;
    else if (product.inStock && product.onShoppingList) return true;
    else return false;
  }

  return { 
    shoppingList,
    setShoppingList,
    checkItem,
    uncheckItem,
    removeFromShoppingList,
    clearChecked
  }
})