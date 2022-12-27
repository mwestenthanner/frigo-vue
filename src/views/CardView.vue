<template>
    <div class="card-view">
        <div class="card-grid">
           Recipe cards here
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'

</script>

<style scoped>

.card-grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
}

</style>