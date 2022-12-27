<template>
    <header>
        <router-link to="/">
            <img class="logo" src="../../assets/frigo-icon-dark.svg" alt="Frigo - grocery management">
        </router-link>
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
    </header>
    <h2>{{ props.heading }}</h2>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  heading: String
}>()
</script>

<style scoped>
header {
    max-height: 10vh;
    padding: 3rem 2rem 0 2rem;
    display: flex;
    justify-content: space-between;
}

.logo {
    height: 2rem;
}

svg {
    height: 1.5rem;
}

h2 {
    margin: 1rem 2rem;
}
</style>