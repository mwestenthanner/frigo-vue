<template>
    <div class="recipe-card">
        <router-link :to="'/recipe/' + recipe.id">
        <div class="image-wrapper">
            <img :src="recipe.img" :alt="recipe.name">
        </div>
        <div class="text-wrapper">
            <h4 class="recipe-title">{{ recipe.name }}</h4>
            <div class="recipe-tags">
                <span class="tag" v-for="(tag, index) in recipe.categories" :key="tag">{{ tag }}<span v-if="index < recipe.categories.length - 1">, </span></span>
            </div>
        </div>
        </router-link>
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
}

.image-wrapper {
    aspect-ratio: 1 / 1;
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
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
    padding: 1rem 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.recipe-title {
    font-size: 100%;
    line-height: 1.15;
}

.recipe-tags {
    padding-top: 0.5rem;
    font-size: 70%;
}
</style>