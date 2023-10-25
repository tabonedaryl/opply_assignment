<script lang="ts">
import {watch, ref} from 'vue';
import {useRoute} from "vue-router";
import {useUserStore} from "../stores/user";

export default {
    setup() {
        const isOpen = ref(false); //variable to check if menu is open or closed
        const route = useRoute();
        const store = useUserStore();

        //function to toggle menu state
        function toggleMenu() {
            isOpen.value = !isOpen.value;
        }

        //watcher to close menu on route navigation
        watch(route, () => {
            isOpen.value = false;
        });

        return { store, isOpen, toggleMenu }
    }
}

</script>

<template>
    <div class="header-wrapper">
        <font-awesome-icon v-if="isOpen" class="icon" icon="fa-solid fa-x" @click="toggleMenu"/>
        <font-awesome-icon v-else class="icon" icon="fa-solid fa-bars" @click="toggleMenu"/>

        <div class="nav-wrapper" v-show="isOpen">
            <nav>
                <ul>
                    <router-link :to="{name: 'suppliers'}">Suppliers</router-link>
                    <router-link :to="{name: 'quotes'}">Quotes</router-link>

                    <button class="log-out" @click="store.logout()">Log Out</button>
                </ul>
            </nav>
        </div>

        <img src="/opply-logo-white.webp" alt="Logo">

    </div>
</template>

<style scoped>
    .header-wrapper {
        @apply w-full flex shadow bg-primary relative;

        & > .icon {
            @apply text-white text-lg absolute cursor-pointer;
            top: 25px;
            right: 25px;

            @screen md {
                @apply hidden;
            }
        }

        & > .nav-wrapper {
            @apply h-screen w-full bg-primary flex flex-col absolute pt-16;
            top: 64px;
            z-index: 999;

            & > nav {
                @apply mx-auto;

                & > ul {
                    @apply grid gap-y-6;

                    & > a {
                        @apply text-white font-semibold w-min border-b-2 border-primary pb-1 mx-auto;

                        &.router-link-active {
                            @apply border-white;
                        }
                    }

                    & > .log-out {
                        @apply font-bold text-center mx-auto text-white mt-8;
                    }
                }
            }
        }

        & > img {
            @apply h-8 m-auto;
        }
    }
</style>