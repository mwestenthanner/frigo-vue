import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getRecipes } from '@/services/api/recipes';
import type { Recipe } from '@/types';

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref<[Recipe]>();

  // Getters
  function getRecipeFromId (id: string) {
    return recipes.value?.find((recipe) => recipe.id === id)
  }

  // Actions
  async function setRecipes() {
    recipes.value = await getRecipes();
  }

  return { 
    recipes, 
    getRecipeFromId,
    setRecipes
  }
})