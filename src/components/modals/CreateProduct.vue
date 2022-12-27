<template>
    <div id="modal-overlay" @click="$emit('close-modal')">
  
      <div id="modal" @click.stop>
            <h2>Create new product</h2>

            <label for="location-select">Default location</label>
            <Multiselect
                id="location-select"
                v-model="locationValue"
                :options="getOptions(locationOptions)"
                />

            <div class="buttons">
              <button type="submit" @click="addProduct();">Save</button>
              <button type="button" @click="$emit('close-modal')">Cancel</button>
            </div>
            
      </div>
  
    </div>
  
</template>
  
<script lang="ts" setup>
import Multiselect from '@vueform/multiselect'
import { computed, ref, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { addProductToStock } from '@/services/api';

const store = useStore();

const productValue = ref('');
const locationValue = ref('');
const expiry = ref('');

const noExpiry= ref(false);

const productOptions = computed(() => store.getters.getProducts);
const locationOptions = computed(() => store.getters.getLocations);

const emit = defineEmits(['close-modal'])

function getOptions(property: {
[x: string]: any; value: any[]; 
}) {
    const options: any[] = [];

    property.forEach((element: any) => {
        options.push(element.name);
    });

    return options;
}

function addProduct() {

    // Fill expiry if box is checked
    if (noExpiry.value == true) {
        expiry.value = '2099-12-31';
    }

    // Check if all fields are filled 
    if (!productValue.value || !expiry.value || !locationValue.value) {
        alert('Please fill all values');
    } else {

        const productId = computed(() => store.getters.getProductIdFromName(productValue.value));
        const locationId = computed(() => store.getters.getLocationIdFromName(locationValue.value));

        addProductToStock(productId.value, 999, locationId.value, expiry.value);
        
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