<template>
    <div id="modal-overlay" @click="$emit('close-modal')">
  
      <div id="modal" @click.stop>
            <h2>Add product to stock</h2>

            <div class="error" v-if="error">
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"/></svg>
                <span>Please fill all values before submitting.</span>
            </div>

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
                @select="test()"
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

function test() {
   // console.log(locationValue.value)
}

function getOptions(object: any) {
    const options: any[] = [];

    object.forEach((element: any) => {
        options.push({
            name: element.name,
            value: element.id
        });
    });

    return options;
}

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

.error {
    color: var(--error);
    border: 1px solid var(--error);
    border-radius: 0.5rem;
    padding: 0.5rem 0.8rem;
    margin-bottom: 1rem;
    font-size: 90%;
    display: flex;
    gap: 0.5rem;
}

.error svg {
    height: 1rem; 
    width: auto;
    fill: var(--error);
}
</style>