import type { Recipe } from '@/types';
import axios from 'axios'

const apiUrl = 'http://localhost:3000/api/recipes/'

async function getRecipes() {
    const response = await axios.get(apiUrl);
    return response.data.map((item: {
        _id: string,
        name: string
        description: string
        img: string
        categories: Array<string>
        ingredients: Array<{ quantity: string, unit: string, ingr: string }>
        instructions: Array<{ step: number, instr: string }>
    }) => {
        return {
            id: item._id,
            name: item.name,
            description: item.description,
            img: item.img,
            categories: item.categories,
            ingredients: item.ingredients,
            instructions: item.instructions
        }
    });
}

async function addRecipe(recipe: Recipe) {
    const response = await axios.post(apiUrl, recipe);
    return response.data._id;
  }

async function removeRecipe(itemId: string) {
    await axios.delete(apiUrl + itemId);
}

export {
    getRecipes,
    addRecipe,
    removeRecipe
}