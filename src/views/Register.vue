<script lang="ts">
import {ref, reactive} from 'vue';
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useRouter} from "vue-router";

export default {
    setup() {
        const user = reactive({first_name: '', last_name: '', username: '', email: '', password: ''});
        const router = useRouter();

        //function to submit user data
        function submit() {
            axios.post('https://february-21.herokuapp.com/api/v1/users/', user)
                .then((response) => {
                    router.push({name: 'login'}); //go to suppliers page
                })
                .catch(e => {
                    toast.error('Failed to create user!', {autoClose: 2000, position: "bottom-left"});
                })
        }

        return { user, submit };
    }
}
</script>

<template>
    <div class="register-page">
        <div class="form-wrapper">
            <img src="opply-logo-white.webp" alt="Logo">

            <form class="form-card" @submit.prevent="submit">
                <input type="text" placeholder="First name" required v-model="user.first_name">

                <input type="text" placeholder="Last name" required v-model="user.last_name">

                <input  type="text" placeholder="Username" required v-model="user.username">

                <input type="email" placeholder="Email" required v-model="user.email">

                <input type="password" placeholder="Password" required v-model="user.password">

                <button class="button" type="submit">Submit</button>
            </form>

            <router-link class="login-text" to="login">Already have an account?</router-link>
        </div>
    </div>
</template>

<style scoped>
.register-page {
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

        & > .login-text {
            @apply text-white font-bold;
        }
    }
}
</style>
