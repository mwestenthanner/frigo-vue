<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Move Product</h2>
        <ErrorMessage message="Please choose a location before submitting." v-if="error"/>
        <p>{{ product.name }} currently is in <b>{{ locationFrom?.name }}</b>. Move to:</p>
        <Multiselect
                id="location-select"
                v-model="locationTo"
                label="name"
                :options="getOptions(filteredLocations)"
                :searchable="true"
                />
        <div class="buttons">
            <button type="submit" @click="saveChanges()">Save</button>
            <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Multiselect from '@vueform/multiselect';
import ErrorMessage from '../common/ErrorMessage.vue';
import type { Product } from '../../types'
import { useLocationStore } from '@/stores/locations';
import { useStock } from '@/stores/stock';
import { storeToRefs } from 'pinia';
import { getOptions } from '@/services/helpers/multiselect';

const store = useStock();
const locationStore = useLocationStore();
const { locations } = storeToRefs(locationStore);
const emit = defineEmits(['close-modal'])

const props = defineProps<{
  product: Product
}>()

const product = ref(props.product);
const productId = ref(props.product.id)
const locationIdFrom = ref(props.product.locationId);
const locationFrom = ref(locationStore.getLocationFromId(locationIdFrom.value));
const locationTo = ref();
const error = ref(false);

const filteredLocations = ref(locations.value?.filter(location => location.id != locationIdFrom.value))

function saveChanges() {
  console.log(locationTo.value)
  if (locationTo.value == undefined) {
    console.log("undefined")
    error.value = true;
  } else {
    store.moveProductLocation(productId.value, locationTo.value);
    emit('close-modal');
  } 
}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>

h2 {
    margin-bottom: 2rem;
}

p {
  margin-bottom: 1rem;
}

#locations {
    width: 100%;
    margin: 1rem 0;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

button {
    width: 100%;
}

</style>