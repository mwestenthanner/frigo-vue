<template>

    <div class="navigation">

        <AddProduct v-if="addMode" @close-modal="addMode = false" />
        <UsedUpModal v-if="useUpMode" @close-modal="useUpMode = false" />
        <ShoppingListModal v-if="shoppingListMode" @close-modal="shoppingListMode = false" />
        <CreateProduct v-if="createMode" @close-modal="createMode = false" />

        <div class="popout" v-if="popout">
            <ul>
            <li @click="addMode = true;">Add product to stock</li>
            <li @click="shoppingListMode = true;">Add product to shopping list</li>
            <li @click="createMode = true;">Create new product</li>
            </ul>
        </div>
        <nav class="mobile-nav">
            <button class="tools" @click="popout = !popout;">+</button>
            <ul>
                <li>
                    <router-link to="/groceries">
                        <svg class="icon" height="60px" version="1.1" viewBox="0 0 52 60" width="52px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="People" stroke="none" stroke-width="1"><g fill="#000000" id="Icon-7" transform="translate(-4.000000, 0.000000)"><path d="M44,20.9844 C44,22.2864 43.162,23.3854 42,23.8004 L42,27.9844 C42,34.6014 36.617,39.9844 30,39.9844 C23.383,39.9844 18,34.6014 18,27.9844 L18,23.7994 C16.838,23.3854 16,22.2864 16,20.9844 C16,19.3304 17.346,17.9844 19,17.9844 C20.654,17.9844 22,19.3304 22,20.9844 C22,22.2864 21.162,23.3854 20,23.8004 L20,27.9844 C20,33.4984 24.486,37.9844 30,37.9844 C35.514,37.9844 40,33.4984 40,27.9844 L40,23.7994 C38.838,23.3854 38,22.2864 38,20.9844 C38,19.3304 39.346,17.9844 41,17.9844 C42.654,17.9844 44,19.3304 44,20.9844 M48.291,7.6894 L52.557,11.9844 L7.414,11.9844 L11.707,7.6914 C11.895,7.5044 12,7.2494 12,6.9844 C12,6.7184 11.894,6.4634 11.706,6.2764 L7.418,2.0004 L52.582,2.0004 L48.294,6.2764 C47.903,6.6654 47.902,7.2974 48.291,7.6894 M51,58.0004 L9,58.0004 C7.346,58.0004 6,56.6474 6,54.9844 L6,13.9844 L54,13.9844 L54,54.9844 C54,56.6474 52.654,58.0004 51,58.0004 M55,8.9844 C55.552,8.9844 56,8.5364 56,7.9844 L56,1.0004 C56,0.5954 55.757,0.2314 55.383,0.0764 C55.261,0.0254 55.132,0.0094 55.005,0.0094 C54.989,0.0084 54.975,0.0004 54.959,0.0004 L5,0.0004 C4.986,0.0004 4.975,0.0074 4.961,0.0074 C4.845,0.0124 4.729,0.0304 4.617,0.0764 C4.616,0.0764 4.615,0.0774 4.614,0.0784 C4.607,0.0814 4.602,0.0864 4.595,0.0894 C4.493,0.1344 4.404,0.1974 4.324,0.2714 C4.299,0.2954 4.279,0.3214 4.256,0.3464 C4.2,0.4114 4.153,0.4804 4.115,0.5564 C4.1,0.5884 4.083,0.6174 4.07,0.6504 C4.029,0.7614 4,0.8774 4,1.0004 L4,7.9844 C4,8.5364 4.448,8.9844 5,8.9844 C5.552,8.9844 6,8.5364 6,7.9844 L6,3.4094 L9.585,6.9854 L4.293,12.2764 C4.202,12.3684 4.128,12.4784 4.078,12.5994 C4.027,12.7204 4,12.8504 4,12.9844 L4,54.9844 C4,57.7504 6.243,60.0004 9,60.0004 L51,60.0004 C53.757,60.0004 56,57.7504 56,54.9844 L56,13.0264 C56,12.7614 55.896,12.5084 55.709,12.3214 L55.667,12.2784 L55.665,12.2764 L50.413,6.9874 L54,3.4094 L54,7.9844 C54,8.5364 54.448,8.9844 55,8.9844" id="bag"/></g></g></svg>
                        <p>Groceries</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/shopping-list">
                        <svg class="icon" style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="st0" id="grid_system"/><g id="_icons"><g><path d="M12,6h8c0.6,0,1-0.4,1-1s-0.4-1-1-1h-8c-0.6,0-1,0.4-1,1S11.4,6,12,6z"/><path d="M20,11h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S20.6,11,20,11z"/><path d="M20,18h-8c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1S20.6,18,20,18z"/><path d="M7.2,3.2L5.5,5.7L5,5.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,8c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6C9.1,3.8,9,3.2,8.6,2.9C8.1,2.6,7.5,2.7,7.2,3.2z"/><path d="M7.2,10.2l-1.7,2.5L5,12.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,15c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6c0.3-0.5,0.2-1.1-0.3-1.4C8.1,9.6,7.5,9.7,7.2,10.2z"/><path d="M7.2,17.2l-1.7,2.5L5,19.2c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L4.9,22c0.2,0.2,0.4,0.3,0.7,0.3c0,0,0.1,0,0.1,0    c0.3,0,0.6-0.2,0.7-0.4l2.4-3.6c0.3-0.5,0.2-1.1-0.3-1.4C8.1,16.6,7.5,16.7,7.2,17.2z"/></g></g></svg>
                        <p>Shopping</p>
                    </router-link>
                </li>
                <li></li>
                <li>
                    <router-link to="/recipes">
                        <svg class="icon" enable-background="new 0 0 48 48" height="48px" version="1.1" viewBox="0 0 48 48" width="48px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Expanded"><g><g><path d="M36,48H12c-0.522,0-0.957-0.402-0.997-0.923L9.07,21.946C5.095,21.484,2,18.097,2,14c0-4.419,3.678-8.151,8.032-8.151     c0.91,0,1.803,0.177,2.636,0.52C14.072,2.509,18.439,0,24,0c5.224,0,8.878,2.112,11.14,6.45c0.887-0.396,1.848-0.602,2.828-0.602     C42.322,5.849,46,9.581,46,14c0,4.097-3.095,7.484-7.07,7.946l-1.933,25.131C36.957,47.598,36.522,48,36,48z M12.926,46h22.147     l1.929-25.077C37.043,20.402,37.478,20,38,20c3.309,0,6-2.691,6-6c0-3.625-3.179-6.151-6.032-6.151     c-0.982,0-1.899,0.274-2.724,0.817c-0.245,0.161-0.551,0.207-0.832,0.123c-0.282-0.083-0.513-0.285-0.632-0.555     C31.898,3.981,28.791,2,24,2c-5.157,0-9.059,2.415-9.71,6.009c-0.06,0.33-0.281,0.608-0.59,0.74     c-0.308,0.134-0.663,0.102-0.943-0.083c-0.825-0.543-1.742-0.817-2.724-0.817C7.179,7.849,4,10.375,4,14c0,3.309,2.691,6,6,6     c0.522,0,0.957,0.402,0.997,0.923L12.926,46z"/></g><g><path d="M36.625,40h-25.25c-0.552,0-1-0.447-1-1s0.448-1,1-1h25.25c0.552,0,1,0.447,1,1S37.177,40,36.625,40z"/></g><g><path d="M19,40c-0.552,0-1-0.447-1-1v-8c0-0.553,0.448-1,1-1s1,0.447,1,1v8C20,39.553,19.552,40,19,40z"/></g><g><path d="M24,40c-0.552,0-1-0.447-1-1V29c0-0.553,0.448-1,1-1s1,0.447,1,1v10C25,39.553,24.552,40,24,40z"/></g><g><path d="M29,40c-0.552,0-1-0.447-1-1v-8c0-0.553,0.448-1,1-1s1,0.447,1,1v8C30,39.553,29.552,40,29,40z"/></g></g></g></svg>
                        <p>Recipes</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/meal-plan">
                        <svg class="icon" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M121,10.3H107.2V3a3,3,0,0,0-6,0v7.3H80.4V3a3,3,0,0,0-6,0v7.3H53.6V3a3,3,0,0,0-6,0v7.3H26.8V3a3,3,0,0,0-6,0v7.3H7a7,7,0,0,0-7,7V121a7,7,0,0,0,7,7H95a3,3,0,0,0,.59-.06l.26-.08a1.76,1.76,0,0,0,.59-.25l.23-.12a3,3,0,0,0,.46-.38l30-30a3,3,0,0,0,.38-.46c0-.07.07-.14.11-.21a1.78,1.78,0,0,0,.25-.6c0-.09.06-.17.08-.27A3,3,0,0,0,128,95h0V17.3A7,7,0,0,0,121,10.3ZM98,98h19.76L98,117.76ZM7,16.3H20.8v7.3a3,3,0,0,0,6,0V16.3H47.6v7.3a3,3,0,1,0,6,0V16.3H74.4v7.3a3,3,0,1,0,6,0V16.3h20.8v7.3a3,3,0,1,0,6,0V16.3H121a1,1,0,0,1,1,1V31.6H6V17.3A1,1,0,0,1,7,16.3ZM6,121V37.6H122V92H95a3,3,0,0,0-3,3v27H7A1,1,0,0,1,6,121Z"/></svg>
                        <p>Meal Plan</p>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AddProduct from '../modals/AddProduct.vue'
import UsedUpModal from '../modals/UsedUpModal.vue'
import ShoppingListModal from '../modals/ShoppingListModal.vue'
import CreateProduct from '../modals/CreateProduct.vue'

const popout = ref(false);
const addMode = ref(false);
const useUpMode = ref(false);
const shoppingListMode = ref(false);
const createMode = ref(false);
</script>

<style scoped>
.navigation {
    position: relative;
}

nav {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

nav ul {
    background-color: var(--accent-primary);
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr 10% 1fr 1fr;
    justify-items: center;
    padding: 1rem;
    width: 100%;
}

nav ul li a {
    font-size: 80%;
    display: flex;
    flex-direction: column;
    align-content: center;
}

a {
    text-decoration: none;
    color: var(--font-main);
}

.icon {
    height: 20px;
    width: auto;
    vertical-align: middle;
    padding-bottom: 0.2rem;
}

.tools {
    background-color: var(--accent-secondary);
    color: white;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    margin-bottom: -2rem;
    z-index: 1;
}

.router-link-exact-active {
    color: var(--accent-secondary);
}

.router-link-exact-active svg g, 
.router-link-exact-active svg path {
    fill: var(--accent-secondary);
}

.popout {
    position: fixed;
    bottom: 8vh;
    width: 100%;
    background-color: white;
}

.popout ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    list-style-type: none;
    padding: 2rem;
}

.popout ul li {
    border: 1px solid var(--font-accent);
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 80%;
    display: flex;
    align-items: center;
    text-align: center;
    aspect-ratio: 1 / 1;
}
</style>