import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Pantry from '@/views/Stock.vue'
import ShoppingList from '@/views/ShoppingList.vue'
import Recipes from '@/views/Recipes.vue'
import MealPlan from '@/views/MealPlan.vue'
import SingleRecipe from '@/views/SingleRecipe.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/groceries',
    name: 'Groceries',
    component: Pantry
  },
  {
    path: '/shopping-list',
    name: 'Shopping List',
    component: ShoppingList
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: SingleRecipe
  },
  {
    path: '/meal-plan',
    name: 'Meal Plan',
    component: MealPlan
  }
]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router