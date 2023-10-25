<script lang="ts">
import {useUserStore} from "../stores/user";

export default {
    setup() {
        const store = useUserStore();

        return { store };
    }
}
</script>

<template>
    <div class="sidebar-wrapper">
        <nav>
            <ul>
                <router-link :to="{name: 'suppliers'}">Suppliers</router-link>
                <router-link :to="{name: 'quotes'}">Quotes</router-link>
            </ul>
        </nav>

        <img src="/opply-logo-white.webp" alt="Logo">

        <button class="log-out" @click="store.logout()">Log Out</button>
    </div>
</template>

<style scoped>
    .sidebar-wrapper {
        @apply flex flex-col shadow bg-primary pt-16 pb-8 px-12 rounded-r-xl;

        & > nav {
            & > ul {
                @apply grid gap-y-6;

                & > a {
                    @apply text-white font-semibold w-min border-b-2 border-primary pb-1;

                    &.router-link-active {
                        @apply border-white;
                    }
                }
            }
        }

        & > img {
            @apply h-8 mt-auto mx-auto;
        }

        & > .log-out {
            @apply font-bold text-center mx-auto text-white mt-4;
        }
    }
</style>