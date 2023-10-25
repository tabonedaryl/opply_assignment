import {useUserStore} from "./stores/user.ts";
import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Suppliers from "./views/suppliers/Suppliers.vue";
import Supplier from "./views/suppliers/Supplier.vue";
import Quotes from "./views/quotes/Quotes.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                auth: false,
                menu: false, //do not show menu
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                auth: false,
                menu: false, //do not show menu
            }
        },
        {
            path: '/suppliers',
            name: 'suppliers',
            component: Suppliers,
            meta: {
                auth: true,
                menu: true, //show menu
            }
        },
        {
            path: '/suppliers/:id',
            name: 'supplier',
            component: Supplier,
            meta: {
                auth: true,
                menu: true, //show menu
            }
        },
        {
            path: '/quotes',
            name: 'quotes',
            component: Quotes,
            meta: {
                auth: true,
                menu: true, //show menu
            }
        }
    ]
});

router.beforeEach(async (to) => {
    const store = useUserStore();

    //redirect to login if the route requires the user to be logged in and user is not logged in
    if(to.meta.auth && !store.token)
        return '/login';
});

export default router;
