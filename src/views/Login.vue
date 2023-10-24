<script lang="ts">
import {ref, reactive} from 'vue';
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useUserStore} from "../stores/user";
import {useRouter} from "vue-router";

export default {
    setup() {
        const user = reactive({username: '', password: ''});
        const store = useUserStore();
        const router = useRouter();

        //function to submit user data
        function submit() {
            axios.post('https://february-21.herokuapp.com/api-token-auth/', user)
                .then((response) => {
                    store.setToken(response.data.token); //set token in store
                    router.push({name: 'suppliers'}); //go to suppliers page
                })
                .catch(e => {
                    if(e.response.status === 400);
                        toast.error('Invalid credentials!', {autoClose: 2000, position: "bottom-left"});
                })
        }

        return { user, submit };
    }
}
</script>

<template>
    <div class="login-page">
        <div class="form-wrapper">
            <img src="opply-logo-white.webp" alt="Logo">

            <form class="form-card" @submit.prevent="submit">
                <input type="text" placeholder="Username" required v-model="user.username">

                <input type="password" placeholder="Password" required v-model="user.password">

                <button class="button" type="submit">Submit</button>
            </form>

            <router-link class="register-text" to="register">Don't have an account?</router-link>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    @apply flex h-screen w-full bg-primary px-6;

    & > .form-wrapper {
        @apply grid gap-y-8 m-auto text-center w-full max-w-md;

        & > img {
            @apply h-12 mx-auto;

            @screen md {
                @apply h-16;
            }
        }

        & > .form-card {
            @apply grid grid-cols-1 gap-y-6 bg-white rounded-xl h-min p-6;

            @screen md {
                @apply p-8;
            }

            & > input {
                @apply w-full border-2 border-gray-300 rounded py-3 px-4;

                &:focus {
                    @apply border-primary;
                }
            }
        }

        & > .register-text {
            @apply text-white font-bold;
        }
    }
}
</style>
