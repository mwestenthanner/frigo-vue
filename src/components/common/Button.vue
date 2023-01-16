<template>
    <button>
        <span>{{ props.heading }}</span>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  heading: String
})
</script>

<style scoped>
</style>