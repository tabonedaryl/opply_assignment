import {useUserStore} from "./stores/user.ts";
import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';


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
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                auth: false,
            }
        }
    ]
});

router.beforeEach(async (to) => {
    const store = useUserStore();

    //redirect to login if the route requires the user to be logged in and is not logged in
    if(to.meta.auth && !store.token)
        return '/login';
});

export default router;
