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
                placeholder="Product"
                label="name"
                :options="options"
                :searchable="true"
                />
        </div>
        <p>Do you want to add it to your shopping list?</p>
        <div class="buttons">
            <button type="submit" @click="saveChanges(true)">Yes</button>
            <button type="button" @click="saveChanges(false)">No</button>
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
const emit = defineEmits(['close-modal'])

if (props.product) {
  productValue.value = props.product.id
}

function saveChanges(shoppingList: boolean) {
  if (!productValue.value) {
    error.value = true;
  } else {
    store.removeProductFromStock(productValue.value);

    if (shoppingList) {
      store.addProductToShoppingList(productValue.value);
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

</style>