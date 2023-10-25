<script lang="ts">
    import {useUserStore} from "./stores/user";
    import {useRouter} from "vue-router";
    import Sidebar from "./components/Sidebar.vue";
    import MenuHeader from "./components/MenuHeader.vue";

    export default {
        components: {MenuHeader, Sidebar},
        setup() {
            const store = useUserStore();
            const router = useRouter();

            return { store, router };
        }
    }
</script>

<template>
    <div class="app-container">
        <menu-header class="header" v-if="store.token"/>
        <sidebar class="sidebar" v-if="store.token"/>
        <router-view class="router-view"/>
    </div>
</template>

<style scoped>
    .app-container {
        @apply flex flex-col relative;

        @screen md {
            @apply flex-row;
        }

        & > .header {
            @apply w-full h-16;

            @screen md {
                @apply hidden;
            }
        }

        & > .sidebar {
            @apply hidden;

            @screen md {
                @apply flex h-screen w-64;
            }
        }

        & > .router-view {
            @apply overflow-y-scroll h-screen;
        }
    }
</style>
