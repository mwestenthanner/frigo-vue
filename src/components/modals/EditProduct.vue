<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Edit {{ props.product.name }}</h2>
        <div class="best-before-setting">
          <h4>Best Before Date</h4>
          <input v-show="!doesNotExpire" v-model="useUp" type="date" name="expiry" id="expiry">
          <input v-model="doesNotExpire" type="checkbox" name="toggle-expiry" id="toggle-expiry"><label for="toggle-expiry">No date set</label>
        </div>

        <div class="detail-setting">
          <h4>Other</h4>
          <div class="detail-input">
            <input v-model="inStock" type="checkbox" name="toggle-mandatory" id="toggle-mandatory"><label for="toggle-mandatory">In stock</label>
          </div>
          <div class="detail-input">
            <input v-model="onShoppingList" type="checkbox" name="toggle-mandatory" id="toggle-mandatory"><label for="toggle-mandatory">On shopping list</label>
          </div>
          <div class="detail-input">
            <input v-model="alwaysInStock" type="checkbox" name="toggle-mandatory" id="toggle-mandatory"><label for="toggle-mandatory">Should always be in stock</label>  
          </div>  
        </div>

        <div class="buttons">
              <button type="submit" @click="saveChanges(); $emit('close-modal')">Save</button>
              <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>

    </div>

  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Multiselect from '@vueform/multiselect'
import type { Product } from '../../types'
import { useStock } from '@/stores/stock';

const props = defineProps<{
  product: Product
}>()

const stock = useStock();

const useUp = ref(props.product.useUp?.toISOString().split('T')[0]);
const doesNotExpire = ref(!(useUp.value));
const inStock = ref(props.product.inStock);
const onShoppingList = ref(props.product.onShoppingList);
const alwaysInStock = ref(props.product.alwaysInStock);

function saveChanges() {
  const updateObj = {} as any;

  if (!doesNotExpire.value && useUp.value) {
    updateObj.useUp = useUp.value; 
  } 

  if (doesNotExpire.value) {
    updateObj.useUp = null;
  }

  if (inStock.value) {
    updateObj.inStock = true;
  } else updateObj.inStock = false;

  if (onShoppingList.value) {
    updateObj.onShoppingList = true;
  } else updateObj.onShoppingList = false;

  if (alwaysInStock.value) {
    updateObj.alwaysInStock = true;
  } else updateObj.alwaysInStock = false;

  stock.updateStoreProduct(props.product.id, updateObj);
}

</script>

<style scoped>

h2 {
    margin-bottom: 1rem;
}

h4 {
  margin: 1rem 0;
}

input[type=date] {
  display: block;
  margin-bottom: 1rem;
  width: 90%;
}

label {
  padding-left: 1rem;
}

select {
  width: 100%;
}

#locations {
    width: 100%;
    margin: 1rem 0;
}

.detail-input {
  display: flex;
  margin-bottom: 0.5rem;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

button {
    width: 100%;
}

</style>