<template>
    <div class="recipe-card">
        <div class="image-wrapper">
            <img :src="recipe.img" :alt="recipe.name">
        </div>
        <div class="text-wrapper">
            <h4 class="recipe-title">{{ recipe.name }}</h4>
            <div class="recipe-tags">
                <span class="tag" v-for="tag in recipe.categories" :key="tag">{{ tag }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Recipe } from '@/types'

const props = defineProps<{
  recipe: Recipe
}>()
</script>

<style scoped>

.recipe-card {
    max-width: 25rem;
    border-radius: 1rem;
    border: 1px solid var(--font-accent);
}

.image-wrapper {
    aspect-ratio: 1 / 1;
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    margin: 5px;
}

.image-wrapper > img {
    position: absolute;
    width: 100%;
    max-height: auto;
    left: 50%;
    top: 50%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
}

.text-wrapper {
    padding: 0.5rem 1rem 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.recipe-title {
    font-size: 100%;
}

.recipe-tags {
    margin-top: 1rem;
    font-size: 80%;
}

.tag {
    padding: 7px 10px 7px 10px;
    border-radius: 8px;
    color: var(--font-main);
    background-color: var(--accent-primary);
    text-align: center;
    font-size: 90%;
}

.tag:not(:first-child) {
    margin-left: 0.5rem;
}
</style>