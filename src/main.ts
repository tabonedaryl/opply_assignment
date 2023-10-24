import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './css/style.css';
import router from "./router";
import axios from 'axios';

const pinia = createPinia();

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = createApp(App);
app.use(pinia);
app.use(router, axios);
app.mount('#app');
