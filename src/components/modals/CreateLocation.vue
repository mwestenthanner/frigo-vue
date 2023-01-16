<template>
    <div id="modal-overlay" @click="$emit('close-modal')">
  
      <div id="modal" @click.stop>
            <h2>Create new location</h2>

            <ErrorMessage message="Please fill all values out before submitting." v-if="error" />

            <label for="name">Name</label>
            <input id="name" type="text" v-model="locationName" />

            <div class="buttons">
              <button type="submit" @click="createLocation()">Save</button>
              <button type="button" @click="$emit('close-modal')">Cancel</button>
            </div>
            
      </div>
  
    </div>
  
</template>
  
<script lang="ts" setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import { ref } from 'vue';
import { useLocationStore } from '@/stores/locations';

const locationName = ref();
const error = ref(false);

const locationStore = useLocationStore();

const emit = defineEmits(['close-modal'])

async function createLocation() {
    if (!locationName.value) {
        error.value = true;
    } else {
        await locationStore.addLocationToStore(locationName.value);
        emit('close-modal'); 
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
  
<style scoped>

h2 {
    margin-bottom: 2rem;
}

input {
    display: block;
    margin: 1rem 0;
    width: 90%;
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

button {
    width: 100%;
}

label {
    display: block;
}
</style>