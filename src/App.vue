<template>
  <div class="app">
    <Sidebar class="desktop-sidebar" />
    <HeaderBar />
    <main>
      <router-view />
    </main>
    <MobileNav class="mobile"></MobileNav>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './components/common/Sidebar.vue'; 
import HeaderBar from './components/common/HeaderBar.vue';
import { onBeforeMount } from 'vue';
import MobileNav from './components/common/MobileNav.vue'

import { useLocationStore } from '@/stores/locations';
import { useProductStore } from './stores/products';
import { useRecipeStore } from './stores/recipes';

const locations = useLocationStore();
const products = useProductStore();
const recipes = useRecipeStore();

onBeforeMount(async () => {
  await locations.setLocations();
  await products.setProducts();
  await recipes.setRecipes();
})
</script>

<style>

main {
  padding: 2rem 2rem 0 2rem;
}

/* Phone */
@media screen and (max-width: 599px) {
  .mobile {
    display: block;
  }

  .desktop-sidebar {
    display: none !important;
  }
}

@media(min-width: 600px) {
  .app {
    display: grid;
    grid-template-columns: 15% 1fr;
    grid-template-rows: 15% 1fr;
    grid-template-areas:
      "sidebar header"
      "sidebar main";
  }

  .desktop-sidebar {
    grid-area: sidebar;
  } 

  .mobile {
    display: none !important;
  }

  .desktop-sidebar {
    display: block;
  }
}

</style>
