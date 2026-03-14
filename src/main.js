import {createPinia} from "pinia";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/style.css'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
