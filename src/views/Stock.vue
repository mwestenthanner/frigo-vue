<template>
    <div class="container mobile" v-if="isMobile()">
        <div class="filter-bar">
            <SearchFilter v-model="searchText" class="search-mobile"/>
            <button @click="showFilters = !showFilters">
                <svg enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="  M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z" fill="none" id="XMLID_6_" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>
            </button>
        </div>
        <div class="filters" v-if="showFilters">
            <Multiselect
                id="location-select"
                v-model="locationFilter"
                placeholder="Location"
                mode="multiple"
                :close-on-select="false"
                label="name"
                :object="true"
                :options="locations"
                :searchable="true"
                @select="navigate('locationId', locationFilter)"
                @clear="navigate('locationId')"
            />
            <Multiselect
            id="status-select"
                v-model="statusFilter"
                placeholder="Status"
                label="label"
                :object="true"
                :options="statusObjects"
                :searchable="true"
                @select="navigate('status', statusFilter.value)"
                @clear="navigate('status');"
            />
        </div>
        <div class="list-mobile">
            <div v-for="item in stock" :key="item.name" :product="item" class="list-item">
                <span>{{ item.name }}</span>
                <span class="tag">{{ locationStore.getLocationFromId(item.locationId) }}</span>
            </div>
            <p v-if="!stock">No items found.</p>
        </div>
    </div>
    <div class="container" v-else>
        <div class="categories">
            <span :class="{ 'active-category': locationFilter == '' }" @click="locationFilter = ''; navigate('locationId')">All locations</span>
            <span v-for="item in locations" :key="item.id" @click="locationFilter = item.id; navigate('locationId', item.id)" :class="{ 'active-category': locationFilter == item.id }">{{ item.name }}</span>
        </div>
        <div class="list-view">
            <div class="filter-bar">
                <Multiselect
                    id="status-select"
                    v-model="statusFilter"
                    placeholder="Status"
                    label="label"
                    :object="true"
                    :options="statusObjects"
                    :searchable="true"
                    @select="navigate('status', statusFilter.value)"
                    @clear="navigate('status');"
                />
                <SearchFilter v-model="searchText" />
            </div>
            <div class="list-heading">
                <div class="heading-item">
                    <h3 class="sort-up" id="name" @click="setSort($event.target as Element)">Item</h3>
                </div>
                <h3 id="locationId" @click="setSort($event.target as Element)" class="tag-heading">Location</h3>
                <h3 id="status" @click="setSort($event.target as Element)">Status</h3>
                <h3>Modify</h3>
            </div>
            <div class="list">
                <ListItem v-for="item in stock" :key="item.name" :product="item" />
                <p v-if="!stock" class="error-msg">Keine Einträge gefunden. Ändere deine Suchkriterien oder lege neue Einträge an.</p>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import Multiselect from '@vueform/multiselect'
import ListItem from '@/components/common/ListItem.vue';
import SearchFilter from '@/components/common/SearchFilter.vue';
import { statusObjects } from '@/services/helpers/status';
import isMobile from '@/services/helpers/isMobile';
import { useStock } from '@/stores/stock';
import { useLocationStore } from '@/stores/locations';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'

const store = useStock();
const locationStore = useLocationStore();

const router = useRouter();
const route = useRoute();

const locationFilter = ref('');
const statusFilter = ref();
const sortUp = ref(true);
const sortParam = ref('name');
const searchText = ref(null);
const showFilters = ref(false);

const { stock } = storeToRefs(store);
const { locations } = storeToRefs(locationStore);

onBeforeMount(async () => {
    if (route.query.locationId) {
        locationFilter.value = route.query.locationId as string;
    }

    if (route.query.sort) {
        sortUp.value = false;
    }

    if (route.query.sortBy) {
        sortParam.value = route.query.sortBy as string;
    }

    if (route.query.locationId || route.query.status || route.query.sort || route.query.sortBy) {
        await store.setStoreProducts(route.query)
    } else await store.setStoreProducts();

    if (route.query.sort || route.query.sortBy) {
        setSortChevron();
    }
})

function setSort(element: Element) {
    if (sortParam.value == element.id) {
        sortUp.value = !sortUp.value;
        if (!sortUp.value) {
            navigate('sort', 'DESC');
        } else navigate('sort');
    } else {
        sortParam.value = element.id;
        sortUp.value = true;
        if (element.id == "name") {
            navigate('sortBy', undefined, 'sort');
        } else navigate('sortBy', sortParam.value, 'sort');
    }

    setSortChevron();
}

function setSortChevron() {
    const element = document.getElementById(sortParam.value);
    // remove any chevrons
    const elementsUp = document.getElementsByClassName("sort-up");
    while (elementsUp.length) {
        elementsUp[0].classList.remove("sort-up");
    }

    const elementsDown = document.getElementsByClassName("sort-down");
    while (elementsDown.length) {
        elementsDown[0].classList.remove("sort-down");
    }

    // show chevron on correct element
    if (sortUp.value == true) {
        element?.classList.add("sort-up");
    } else {
        element?.classList.add("sort-down");
    }
}

function navigate(queryParamKey: string, queryParamValue?: string, removeParamKey?: string) {
    const newQuery = {...route.query, [queryParamKey]: queryParamValue, [removeParamKey ?? ''] : undefined };
    router.push({ path: '/groceries', query: newQuery}).then(async () => {
        await store.setStoreProducts(newQuery)
    });
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>

.categories {
    margin: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--font-accent);
}

.categories a {
    text-decoration: none;
}

.categories span {
    font-family: 'Jost';
    font-weight: 500;
    font-size: 120%;
    color: var(--font-accent);
    margin-right: 3rem;
}

.active-category {
    color: var(--font-main) !important;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--font-main);
}

.filter-bar {
    padding: 0 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.multiselect {
    max-width: 15rem;
    margin: 0;
    height: auto;
    font-family: 'Inter';
}

.list-heading {
    margin: 2rem 0 1rem 0;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    padding: 1rem 1rem 1rem 2rem;
    grid-gap: 4rem;
    align-items: center;
}

.list-heading > h3:not(:first-child) {
    text-align: center
}

.heading-item {
    display: flex;
    flex-direction: row;
}

#status {
    text-align: left !important;
}

.list {
    border-top: 1px solid var(--font-accent);
}

.sort-up:after {
    display: inline-block;
    content: ' ';
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D%3C/style%3E%3C/defs%3E%3Ctitle/%3E%3Cg data-name='Layer 2' id='Layer_2'%3E%3Cpath d='M16,21a1,1,0,0,1-.71-.29l-8-8a1,1,0,1,1,1.42-1.42L16,18.59l7.29-7.3a1,1,0,0,1,1.42,1.42l-8,8A1,1,0,0,1,16,21Z'/%3E%3C/g%3E%3Cg id='frame'%3E%3Crect class='cls-1' height='32' width='32'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 1.5rem 1.5rem;
    height: 1.5rem;
    width: 1.5rem;
    vertical-align: middle;
    margin-left: 1rem;
}

.sort-down:after {
    display: inline-block;
    content: ' ';
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' %3F%3E%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D%3C/style%3E%3C/defs%3E%3Ctitle/%3E%3Cg data-name='Layer 2' id='Layer_2'%3E%3Cpath d='M24,21a1,1,0,0,1-.71-.29L16,13.41l-7.29,7.3a1,1,0,1,1-1.42-1.42l8-8a1,1,0,0,1,1.42,0l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,24,21Z'/%3E%3C/g%3E%3Cg id='frame'%3E%3Crect class='cls-1' height='32' width='32'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 1.5rem 1.5rem;
    height: 1.5rem;
    width: 1.5rem;
    vertical-align: middle;
    margin-left: 1rem;
}

/* MOBILE CSS */

.mobile .filter-bar {
    justify-content: space-between;
    max-width: 100%;
}

.mobile .filter-bar button {
    background-color: transparent;
} 

.mobile .filter-bar svg {
    height: 1rem;
    width: 1rem;
}

.search-mobile {
    font-size: 80%;
}

.filters {
    display: flex;
    margin: 1rem 2rem;
    gap: 1rem;
}

.filters .multiselect {
    max-width: 8rem;
    font-size: 80%;
}

.list-mobile {
    padding: 1rem 2rem;
}

.mobile .list-item {
    font-family: Inter;
    padding: 1rem 0;
    border-bottom: 1px solid var(--font-accent);
    display: flex;
    justify-content: space-between;
}

.tag {
    font-size: 60%;
    text-transform: uppercase;
    background-color: var(--accent-primary);
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
}

.error-msg {
    padding: 2rem;
}

</style>