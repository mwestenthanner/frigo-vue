<template>
    <div class="error">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"/></svg>
        <span>{{ props.message }}</span>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['message'])
</script>

<style scoped>
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