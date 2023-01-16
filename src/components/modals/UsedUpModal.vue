<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Use up product</h2>

        <ErrorMessage message="Please choose a product before submitting." v-if="error"/>

        <div class="choose-product">
          <label for="product-select">Select product</label>
            <Multiselect
                id="product-select"
                v-model="productValue"
                :options="options"
                placeholder="Product"
                label="name"
                :searchable="true"
                />
        </div>
        <p>Do you want to add it to your shopping list?</p>
        <div class="buttons">
            <button type="submit" @click="saveChanges(true); $emit('close-modal')">Yes</button>
            <button type="button" @click="saveChanges(false); $emit('close-modal')">No</button>
            <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import Multiselect from '@vueform/multiselect'
import ErrorMessage from '../common/ErrorMessage.vue';
import { ref } from 'vue'
import { getOptions } from '@/services/helpers/multiselect';
import { useStock } from '@/stores/stock';
import { storeToRefs } from 'pinia';

const props = defineProps(['product']);
const store = useStock();
const { stock } = storeToRefs(store);

const productValue = ref('');
const error = ref(false);

const options = getOptions(stock.value)

if (props.product) {
  productValue.value = props.product.id
}

function saveChanges(shoppingList: boolean) {
  store.removeProductFromStock(productValue.value);

  if (shoppingList) {
    store.addProductToShoppingList(productValue.value);
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

</style>