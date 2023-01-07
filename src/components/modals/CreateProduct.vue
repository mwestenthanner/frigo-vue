<template>
    <div id="modal-overlay" @click="$emit('close-modal')">
  
      <div id="modal" @click.stop>
            <h2>Create new product</h2>

            <ErrorMessage message="Please fill all values out before submitting." v-if="error" />

            <label for="name">Name</label>
            <input id="name" type="text" v-model="productName" />

            <label for="location-select">Default location</label>
            <Multiselect
                id="location-select"
                v-model="location"
                placeholder="Location"
                label="name"
                :options="getOptions(locations as any)"
                :searchable="true"
            />

            <label for="unit">Unit</label>
            <input id="unit" type="text" v-model="unit" />

            <input v-model="inStock" type="checkbox" name="toggle-stock" id="toggle-stock"><label for="toggle-stock">In stock</label>

            <div class="buttons">
              <button type="submit" @click="createProduct()">Save</button>
              <button type="button" @click="$emit('close-modal')">Cancel</button>
            </div>
            
      </div>
  
    </div>
  
</template>
  
<script lang="ts" setup>
import Multiselect from '@vueform/multiselect'
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import { ref } from 'vue';
import { getOptions } from '@/services/helpers/multiselect';
import { useLocationStore } from '@/stores/locations';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/products';

const productName = ref();
const location = ref();
const unit = ref();
const inStock = ref(true);
const error = ref(false);

const locationStore = useLocationStore();
const productStore = useProductStore();
const { locations } = storeToRefs(locationStore);

const emit = defineEmits(['close-modal'])

async function createProduct() {
    if (!productName.value || !location.value || !unit.value) {
        error.value = true;
    } else {
        await productStore.addProductToStore({ name: productName.value, locationId: location.value, inStock: inStock.value, unit: unit.value });
        emit('close-modal'); 
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
  
<style scoped>

h2 {
    margin-bottom: 2rem;
}

input:not([type="checkbox"]) {
    display: block;
    margin-bottom: 1rem;
    width: 95%;
}

input[type="checkbox"] {
    margin-right: 0.5rem;
}

.multiselect, input {
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

label:not([for="toggle-stock"]) {
    display: block;
}
</style>