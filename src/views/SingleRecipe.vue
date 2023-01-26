<template>
    <div class="cover">
        <img :src="recipe?.img" />
        <div class="overlay"></div>
    </div>
    <button class="navigate" onclick="history.back()">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M13,26a1,1,0,0,1-.71-.29l-9-9a1,1,0,0,1,0-1.42l9-9a1,1,0,1,1,1.42,1.42L5.41,16l8.3,8.29a1,1,0,0,1,0,1.42A1,1,0,0,1,13,26Z"/><path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/></g><g id="frame"><rect class="cls-1" height="32" width="32"/></g></svg>
    </button>
    <div class="recipe-view">
        <h2>{{ recipe?.name }}</h2>
        <p>{{ recipe?.description }}</p>
        <div class="ingredients">
            <h3>Zutaten</h3>
            <ul>
                <li v-for="item in recipe?.ingredients">{{ item.quantity }} {{ item.unit }} {{ item.ingr }}</li>
            </ul>
        </div>
        <div class="instructions">
            <h3>Zubereitung</h3>
            <ol>
                <li v-for="item in recipe?.instructions">{{ item.instr }}</li>
            </ol>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRecipeStore } from '@/stores/recipes';
import { useRoute } from 'vue-router';

const id = useRoute().params.id as string;
const store = useRecipeStore();
const recipe = store.getRecipeFromId(id);
</script>

<style scoped>
.cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30vh;
    z-index: 0;
    overflow: hidden;
    border-radius: 0 0 2rem 2rem;
    display: flex;
    align-items: center;

}

.cover img {
    width: 100%;
}

.navigate {
    position: relative;
    z-index: 2;
    padding: 0;
    background-color: transparent;
    margin-bottom: 1rem;
}
.navigate svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: white;
}

.cls-1 {
    fill:none;
}

.recipe-view {
    margin-top: 25vh;
}

h2 {
    margin-bottom: 1rem;
}

ul, ol {
    margin-left: 1rem;
}
</style>