import { defineStore } from 'pinia'
import type { Product } from '@/types';
import { getProductsInStock, updateProduct } from '@/services/api/products';
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
  async function setStoreProducts(query?: any) {
    if (query && query.status) {
      query = parseQueryWithStatus(query);
    }
    stock.value = await getProductsInStock(query);
  }

  async function addStoreProduct(productId: string, locationId?: string, useUp?: Date ) {
    let updateData = { inStock: true } as any

    if (locationId) updateData.locationId = locationId;
    if (useUp) updateData.useUp = useUp;

    await updateProduct(productId, updateData)
    stock.value = await getProductsInStock();
  }

  async function updateStoreProduct(productId: string, updateData: any ) {
    await updateProduct(productId, updateData)
    stock.value = await getProductsInStock();
  }

  async function removeProductFromStock(productId: string) {
    await updateProduct(productId, { inStock: false});
    stock.value = await getProductsInStock();
  }

  async function addProductToShoppingList(productId: string) {
    await updateProduct(productId, { onShoppingList: true });
    stock.value = await getProductsInStock();
  }

  async function moveProductLocation(productId: string, locationId: string) {
    await updateProduct(productId, { locationId: locationId });
    stock.value = await getProductsInStock();
  }

  return { 
    stock,
    getProductFromId,
    getProductFromName,
    setStoreProducts,
    addStoreProduct,
    updateStoreProduct,
    removeProductFromStock,
    addProductToShoppingList,
    moveProductLocation
  }
})