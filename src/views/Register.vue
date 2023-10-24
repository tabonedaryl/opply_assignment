<script setup lang="ts">
import {ref} from 'vue'
</script>

<template>
    <div class="register-page">
        <div class="form-wrapper">
            <img src="opply-logo-white.webp" alt="Logo">

            <form class="form-card">
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <input type="password" placeholder="Retype password">

                <button class="button">Submit</button>
            </form>

            <router-link class="login-text" to="login">Already have an account?</router-link>
        </div>
    </div>
</template>

<style scoped>
.register-page {
    @apply flex h-screen w-full bg-primary;

    & > .form-wrapper {
        @apply grid gap-y-8 m-auto text-center;

        & > img {
            @apply h-16 mx-auto;
        }

        & > .form-card {
            @apply grid grid-cols-1 gap-y-6 bg-white rounded-xl h-min p-8;

            & > input {
                @apply w-96 border-2 border-gray-300 rounded py-3 px-4;

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
