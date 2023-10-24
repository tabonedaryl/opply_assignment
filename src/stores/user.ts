// @ts-check
import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

interface State {
    token: string
}

export const useUserStore = defineStore('user', {
    state: (): State => {
        return {
            token: localStorage.getItem('token')
        }
    },
    actions: {
        setToken(token) {
            //setting the user token
            this.$patch({token: token});
            localStorage.setItem('token', token);
        },
        async logout() {
            const router = useRouter();
            this.$patch({token: ''}); //clearing the token from state
            localStorage.setItem('token', ''); //clearing the token from local storage
            this.router.push('/login'); //pushing to login
        },
    },
});
