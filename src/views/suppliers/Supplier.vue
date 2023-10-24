<script lang="ts">
import {ref, reactive, onMounted} from 'vue';
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useRoute, useRouter} from "vue-router";

export default {
    setup() {
        const router = useRouter(); //declare router
        const route = useRoute(); //declare route

        const isLoading = ref(false); //is loading variable

        const supplier = ref();

        //function to get suppliers
        function getSupplier() {
            isLoading.value = true; //setting is loading variable to true

            //get request to get supplier from API
            axios.get(`suppliers/${route.params.id}/`)
                .then((response) => {
                    supplier.value = response.data; //setting supplier from API data
                    isLoading.value = false; //setting is loading variable to false
                })
                .catch(e => {
                    isLoading.value = false; //setting is loading variable to false

                    //toast to notify user that API call has failed
                    toast.error('Failed to get supplier!', {autoClose: 2000, position: "bottom-left"});
                })
        }

        function goBack() {
            router.push('/suppliers');
        }

        onMounted(getSupplier); //get supplier on mounted

        return { isLoading, supplier, goBack };
    }
}
</script>

<template>
    <div v-if="isLoading || !supplier" class="loading-screen"><p>Loading...</p></div>
    <div v-else class="supplier-page page">
        <div class="name-row">
            <font-awesome-icon class="back-icon" icon="fa-solid fa-arrow-left" @click="goBack"/>
            <h1>{{ supplier.id }}. {{ supplier.name }}</h1>
        </div>

        <p><b>Description</b>: {{ supplier.description }}</p>
    </div>
</template>

<style scoped>
    .supplier-page {
        & > .name-row {
            @apply flex flex-row mb-8;

            @screen md {
                @apply mb-12;
            }

            & > .back-icon {
                @apply text-xl text-primary cursor-pointer mr-4 my-auto;
            }
        }

        & > p {
            @apply text-lg;
        }
    }
</style>