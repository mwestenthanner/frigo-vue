import axios from 'axios'

const apiUrl = 'http://localhost:3000/api/locations/'

async function getLocations() {
    const response = await axios.get(apiUrl);
    return response.data.map((item: { _id: string; name: string; }) => {
        return {
            id: item._id,
            name: item.name
        }
    });
}

async function addLocation(name: string) {
    const response = await axios.post(apiUrl, {
        name: name
    });
    return response.data._id;
  }

async function removeLocation(itemId: string) {
    await axios.delete(apiUrl + itemId);
}

export {
    getLocations,
    addLocation,
    removeLocation
}