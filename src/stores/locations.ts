import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { addLocation, getLocations, removeLocation } from '@/services/api/locations';
import type { Location } from '@/types';

export const useLocationStore = defineStore('locations', () => {
  const locations = ref<[Location]>();

  // Getters
  function getLocationFromId (id: string) {
    return locations.value?.find((location) => location.id === id)
  }

  function getLocationFromName (name: string) {
    return locations.value?.find((location) => location.name === name)
  }

  // Actions
  async function setLocations() {
    locations.value = await getLocations();
  }

  async function addLocationToStore(locationName: string) {
    await addLocation(locationName);
    locations.value = await getLocations();
  }

  async function removeLocationFromStore(locationId: string) {
    await removeLocation(locationId);
    locations.value = await getLocations();
  }

  return { 
    locations,
    getLocationFromId,
    getLocationFromName,
    setLocations,
    addLocationToStore,
    removeLocationFromStore
   }
})
