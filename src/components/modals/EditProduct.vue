<template>
  <div id="modal-overlay" @click="$emit('close-modal')">

    <div id="modal" @click.stop>
        <h2>Edit {{ props.product.name }}</h2>
        <div class="best-before-setting">
          <h4>Best Before Date</h4>
          <input v-show="!doesNotExpire" v-model="expiry" type="date" name="expiry" id="expiry">
          <input v-model="doesNotExpire" type="checkbox" name="toggle-expiry" id="toggle-expiry"><label for="toggle-expiry">No date set</label>
        </div>

        <div class="status-setting">
          <h4>Product status</h4>
          <select name="status" id="status">
            <option>{{ props.product.status }}</option>
          </select>     
        </div>

        <div class="detail-setting">
          <h4>Other</h4>
          <input v-model="isMandatory" type="checkbox" name="toggle-mandatory" id="toggle-mandatory"><label for="toggle-mandatory">Product needs to be in stock</label>     
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
import type { Product } from '../../types'
import { editProductDetails } from '../../services/api'

const props = defineProps<{
  product: Product
}>()

const expiry = ref(props.product.expiry.toISOString().split('T')[0]);
const doesNotExpire = ref(getExpiry(props.product.expiry));
const isMandatory = ref(props.product.mandatory);

function getExpiry(date: Date) {
  if (date.toISOString().split('T')[0] == '2099-12-31') {
    return true;
  } else return false;
}

function saveChanges() {

  let expiryDate = '';

  if (doesNotExpire.value == true) {
    expiryDate = '2099-12-31';
  } else {
    expiryDate = expiry.value; 
  }

  console.log(expiryDate);

  editProductDetails(props.product, expiryDate, isMandatory.value, undefined)

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

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

button {
    width: 100%;
}

</style>