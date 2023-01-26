<template>
        <div class="search-filter-add">
            <SearchFilter />
            <button @click="showFilters = !showFilters">
                <svg enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="  M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z" fill="none" id="XMLID_6_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>
            </button>
        </div>
        <div class="filters" v-if="showFilters">
            <Multiselect
                id="location-select"
                v-model="categoryFilter"
                placeholder="Categories"
                label="name"
                :options="[]"
                :searchable="true"
            />
        </div>
        <div class="recipe-cards">
            <CardItem v-for="recipe in recipes" :recipe="recipe" />
        </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import Multiselect from '@vueform/multiselect'
import CardItem from '@/components/common/CardItem.vue';
import SearchFilter from '@/components/common/SearchFilter.vue';
import { useRecipeStore } from '@/stores/recipes';
import { storeToRefs } from 'pinia';

const showFilters = ref(false);
const categoryFilter = ref();

const store = useRecipeStore();
const { recipes } = storeToRefs(store);

onBeforeMount(async () => {
    await store.setRecipes();
})
</script>

<style scoped>

.search-filter-add, .filters {
    margin: 1rem 0;
}

.search-filter-add .search-box {
    max-width: 80%;
}

.search-filter-add button {
    background-color: transparent;
} 

.search-filter-add svg {
    height: 1rem;
    width: 1rem;
}

.recipe-cards {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 0.75rem));
    grid-gap: 1.5rem;
    margin-top: 1.5rem;
}
</style>