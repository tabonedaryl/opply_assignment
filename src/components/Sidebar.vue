<script></script>

<template>
    <div class="sidebar-wrapper">
        <nav>
            <ul>
                <router-link :to="{name: 'suppliers'}">Suppliers</router-link>
                <router-link :to="{name: 'quotes'}">Quotes</router-link>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
    .sidebar-wrapper {
        @apply w-full border-r-2 shadow;

        @screen md {
            @apply w-64;
        }

        & > nav {
            @apply pt-16 px-12;

            & > ul {
                @apply grid gap-y-6;

                & > a {
                    @apply text-gray-800 font-semibold;

                    &.router-link-active {
                        @apply text-primary;
                    }
                }
            }
        }
    }
</style>