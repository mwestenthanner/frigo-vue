<template>
    <div class="container">
        <h1>Recipes</h1>
            <div class="search-filter-add">
      <SearchFilter />
    </div>
        <CardView />
    </div>
</template>

<script lang="ts" setup>
import CardView from './CardView.vue'
import SearchFilter from '@/components/common/SearchFilter.vue';
</script>