// @ts-check
import { defineStore } from 'pinia';

interface State {
    token: string | null
}

export const useUserStore = defineStore('user', {
    state: (): State => {
        return {
            token: localStorage.getItem('token')
        }
    },
    actions: {
        setToken(token:string) {
            //setting the user token
            this.$patch({token: token});
            localStorage.setItem('token', token);
        },
        async logout() {
            this.$patch({token: ''}); //clearing the token from state
            localStorage.setItem('token', ''); //clearing the token from local storage
            this.router.push('/login'); //pushing to login
        },
    },
});
