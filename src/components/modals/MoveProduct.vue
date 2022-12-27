<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Move Product</h2>
        <div class="choose-product">
          <label for="product-select">Product</label>
            <Multiselect
                id="product-select"
                v-model="productValue"
                :options="getOptions(productsInStock)"
                :searchable="true"
                @select="changeProductLocation()"
                />
        </div>
        <p>{{ productValue }} currently is in {{ locationFromName }}. Move to:</p>
        <Multiselect
                id="location-select"
                v-model="locationToName"
                :options="getOptions(locationList, locationFromName)"
                :searchable="true"
                />
        <div class="buttons">
            <button type="submit" @click="saveChanges(), $emit('close-modal')">Save</button>
            <button type="button" @click="$emit('close-modal')">Cancel</button>
        </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { defineProps, computed, ref, toRef } from 'vue'
import Multiselect from '@vueform/multiselect'
import type { Product } from '../../types'
import { moveProduct } from '../../services/api'
import { useStore } from 'vuex';

const store = useStore();
const locationList = computed(() => store.getters.getLocations) // Here the current location should be filtered out later
const productsInStock = computed(() => store.getters.getStock);

const productValue = ref('');
const locationFromName = ref('');
const locationToName = ref(0);

const props = defineProps<{
  product: Product
}>()

if (props.product) {
  const product = toRef(props, 'product');
  locationFromName.value = product.value?.location ?? '';
  productValue.value = product.value?.name ?? '';
}

function getOptions(property: {[x: string]: any; value: any[]; }, filterOut?: string) {
    const options: any[] = [];

    property.forEach((element: any) => {

      if (filterOut && element.name == filterOut) {
        return;
      } else options.push(element.name);

    });

    return options;
}

function changeProductLocation() {
  const locationName = computed(() => store.getters.getLocationForStockProduct(productValue.value));
  locationFromName.value = locationName.value;
}

function saveChanges() {

  const product = computed(() => store.getters.getStockProductFromName(productValue.value));
  const locationTo = computed(() => store.getters.getLocationIdFromName(locationToName.value));
  console.log('locationTo: ' + locationTo.value)
  moveProduct(product.value.id, product.value.quantity, product.value.locationId, locationTo.value);

}

</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>

h2 {
    margin-bottom: 2rem;
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