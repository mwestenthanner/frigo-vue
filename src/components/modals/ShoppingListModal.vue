<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2 v-if="!onShoppingList">Add product to shopping list</h2>
        <h2 v-else>Remove product from shopping list</h2>
        <ErrorMessage message="Please choose a product before submitting." v-if="error"/>

        <div class="choose-product">
          <label for="shopping-select">Select product</label>
            <Multiselect
                id="shopping-select"
                v-model="productValue"
                placeholder="Product"
                label="name"
                :options="getOptions(products)"
                :searchable="true"
                />
        </div>
        <div class="remove" v-if="productInStock && !onShoppingList">
          <input v-model="removeFromStock" type="checkbox" name="toggle-stock" id="toggle-stock"><label for="toggle-stock">Remove product from stock</label>
        </div>
        <div class="buttons">
            <button type="submit" @click="saveChanges(removeFromStock)">Confirm</button>
            <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Multiselect from '@vueform/multiselect'
import ErrorMessage from '../common/ErrorMessage.vue';
import { getOptions } from '@/services/helpers/multiselect';
import type { Product } from '../../types'
import { useProductStore } from '@/stores/products';
import { storeToRefs } from 'pinia';
import { useStock } from '@/stores/stock';

const store = useProductStore();
const stock = useStock();
const { products } = storeToRefs(store);
const emit = defineEmits(['close-modal'])

const props = defineProps<{
  product?: Product
}>()

const productValue = ref();
const onShoppingList = ref(false);
const productInStock = ref(false);
const removeFromStock = ref(true);
const error = ref(false);

if (props.product) {
  productValue.value = props.product.id
  productInStock.value = props.product.inStock;
  onShoppingList.value = props.product.onShoppingList;
} 

function saveChanges(useUp: boolean) {
  if (!productValue.value) {
    error.value = true;
  } else {
    if (onShoppingList.value) {
      store.updateStoreProduct(productValue.value, { onShoppingList: false }, true)
    } else if (useUp) {
      store.updateStoreProduct(productValue.value, { inStock: false, onShoppingList: true }, true)
    } else {
      store.updateStoreProduct(productValue.value, { onShoppingList: true }, true);
    }

    emit('close-modal');
  }
}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>

h2, p {
  margin-bottom: 1rem;
}

.multiselect {
    margin: 1rem 0;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

button {
    width: 100%;
}

label[for="toggle-stock"] {
    margin-left: 1rem;
}

</style>