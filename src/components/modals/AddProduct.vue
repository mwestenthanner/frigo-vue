<template>
    <div id="modal-overlay" @click="$emit('close-modal')">
  
      <div id="modal" @click.stop>
            <h2>Add product to stock</h2>

            <ErrorMessage message="Please fill all values out before submitting." v-if="error" />

            <label for="product-select">Product</label>
            <Multiselect
                id="product-select"
                v-model="productId"
                placeholder="Product"
                label="name"
                :options="getOptions(products as any)"
                :searchable="true"
            />

            <label for="location-select">Location</label>
            <Multiselect
                id="location-select"
                v-model="locationId"
                placeholder="Location"
                label="name"
                :options="getOptions(locations as any)"
                :searchable="true"
            />

            <input v-model="noExpiry" type="checkbox" name="toggle-expiry" id="toggle-expiry"><label for="toggle-expiry">Product does not expire</label>
            <label for="expiry" v-if="!noExpiry">Use Up Date</label>
            <input v-model="expiry" type="date" name="expiry" id="expiry" v-if="!noExpiry">
        
            <div class="buttons">
              <button type="submit" @click="addProduct()">Save</button>
              <button type="button" @click="$emit('close-modal')">Cancel</button>
            </div>
            
      </div>
  
    </div>
  
</template>
  
<script lang="ts" setup>
import Multiselect from '@vueform/multiselect'
import { ref, defineEmits } from 'vue';
import { useLocationStore } from '@/stores/locations';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/products';
import { useStock } from '@/stores/stock';
import { getOptions } from '@/services/helpers/multiselect';
import ErrorMessage from '../common/ErrorMessage.vue';

const productId = ref();
const locationId = ref();
const expiry = ref();

const noExpiry= ref(true);
const error= ref(false);

const store = useProductStore();
const stock = useStock();
const locationStore = useLocationStore();

const { products } = storeToRefs(store);
const { locations } = storeToRefs(locationStore);

const emit = defineEmits(['close-modal'])

function addProduct() {
    if (!productId.value || !locationId.value) {
        error.value = true;
    } else {
        stock.addStoreProduct(productId.value, locationId.value)
        emit('close-modal');
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
  
<style scoped>

h2 {
    margin-bottom: 2rem;
}

input[type=date] {
  display: block;
  margin-bottom: 1rem;
  width: 95%;
}

.multiselect, input[type=date] {
    margin: 1rem 0;
}

select {
  width: 100%;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

button {
    width: 100%;
}

label[for="expiry"] {
    display: block;
}

#toggle-expiry {
    margin-top: 1rem;
}

label[for="toggle-expiry"] {
    margin-left: 1rem;
}
</style>