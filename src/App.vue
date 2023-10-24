<script lang="ts">
    import {useUserStore} from "./stores/user";
    import {useRouter} from "vue-router";
    import Sidebar from "./components/Sidebar.vue";

    export default {
        components: {Sidebar},
        setup() {
            const store = useUserStore();
            const router = useRouter();

            return { store, router };
        }
    }
</script>

<template>
    <div class="app-container">
        <sidebar class="sidebar" v-if="store.token"/>
        <router-view/>
    </div>
</template>

<style scoped>
    .app-container {
        @apply flex flex-row;

        & > .sidebar {
            @apply h-screen;
        }
    }
</style>
