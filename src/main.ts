import { createApp } from 'vue'
import { createPinia } from 'pinia'

import store from "./store";

import App from './App.vue'
import router from './router'

import './assets/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
