import {createApp, markRaw} from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './css/style.css';
import router from "./router";
import axios from 'axios';
import {useUserStore} from "./stores/user";
import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'
import moment from 'moment';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faX, faBars, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faX, faBars, faArrowLeft)

const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => {
    const store = useUserStore();

    if(store.token)
        config.headers['Authorization'] = `Token ${store.token}`;

    return config;
})

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia);
app.use(router, axios);
app.use(VueGoodTablePlugin);
app.provide("moment", moment);
app.mount('#app');

