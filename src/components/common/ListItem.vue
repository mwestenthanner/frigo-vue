<template>
    <div class="list-item">
        <p>{{ props.product.name }}</p>
        <p class="tag">{{ locationStore.getLocationFromId(props.product.locationId)?.name }}</p>
        <p class="status">{{ setStatus(product) }}</p>
        <Controls :product="props.product" />

    </div>
   
</template>

<script lang="ts" setup>
import { setStatus } from '@/services/helpers/helpers';
import { useLocationStore } from '@/stores/locations';
import { defineProps, ref } from 'vue'
import type { Product } from '../../types'
import Controls from './Controls.vue';

const locationStore = useLocationStore();

const props = defineProps<{
  product: Product
}>()

    
</script>

<style scoped>

.list-item {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 1rem 1rem 1rem 2rem;
    border-bottom: 1px solid var(--font-accent);
    grid-gap: 4rem;
    align-items: center;
}

.tag {
    padding: 7px 10px 7px 10px;
    border-radius: 8px;
    color: var(--font-main);
    background-color: var(--accent-primary);
    text-align: center;
}

.quantity {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
}

.expired {
    color: rgb(165, 15, 15);
    font-weight: bold;
}

.expiring {
    color: var(--yellow);
    font-weight: bold;
}

</style>