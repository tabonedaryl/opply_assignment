// @ts-check
import { defineStore } from 'pinia';

interface State {
    token: string
}

export const useUserStore = defineStore('user', {
    state: (): State => {
        return {
            token: ''
        }
    },
    actions: {
        setToken(token) {
            //setting the user token
            this.$patch({token: token});
        },
        async logout(state) {
            //clearing the token so that the user is logged out
            this.$patch({token: ''});
        },
    },
});
