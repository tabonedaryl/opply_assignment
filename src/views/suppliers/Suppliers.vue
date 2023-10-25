<script lang="ts">
import {ref, reactive, onMounted} from 'vue';
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useRouter} from "vue-router";

export default {
    setup() {
        const router = useRouter(); //declare router

        const suppliers = ref([]); //suppliers array
        const next = ref(); //next page
        const previous = ref(); //previous page

        //server params
        const params = reactive({
            page: 1
        });

        const isLoading = ref(false); //is loading variable

        //columns for vue-good-table
        const columns = reactive([
            {
                label: 'ID',
                field: 'id',
                sortable: false,
            },
            {
                label: 'Name',
                field: 'name',
                sortable: false,
            },
            {
                label: 'Description',
                field: 'description',
                sortable: false,
            },
        ]);

        //function to get suppliers
        function getSuppliers() {
            isLoading.value = true; //setting is loading variable to true

            //get request to get suppliers from API
            axios.get('suppliers/', {params: params})
                .then((response) => {
                    suppliers.value = response.data.results; //setting suppliers array with data from API
                    next.value = response.data.next; //next page variable
                    previous.value = response.data.previous; //previous page variable
                    isLoading.value = false; //setting is loading variable to false
                })
                .catch(() => {
                    isLoading.value = false; //setting is loading variable to false

                    //toast to notify user that API call has failed
                    toast.error('Failed to get suppliers!', {autoClose: 2000, position: "bottom-left"});
                })
        }

        function onRowClick(params:any) {
            router.push(`/suppliers/${params.row.id}`);
        }

        function previousPage() {
            params.page--; //decrement page count when function is called
            getSuppliers(); //get suppliers after page count is decremented
        }

        function nextPage() {
            params.page++; //increment page count when function is called
            getSuppliers(); //get suppliers after page count is incremented
        }

        onMounted(getSuppliers); //get suppliers on mounted

        return { isLoading, columns, suppliers, onRowClick, previous, next, previousPage, nextPage };
    }
}
</script>

<template>
    <div class="suppliers-page page">
        <h1>Suppliers</h1>

        <vue-good-table
            :columns="columns"
            :rows="suppliers"
            v-on:row-click="onRowClick"
        />

        <div class="pagination-container">
            <button @click="previousPage" :disabled="!previous">Previous</button>
            <button @click="nextPage" :disabled="!next">Next</button>
        </div>
    </div>
</template>

<style scoped>
    .suppliers-page {
        @apply flex flex-col;

        & > h1 {
            @apply mb-8;

            @screen md {
                @apply mb-12;
            }
        }

        & > .pagination-container {
            @apply flex flex-row ml-auto mt-8;

            & > button {
                @apply text-gray-800 ml-4 cursor-pointer font-bold text-primary;

                &:hover {
                    @apply text-primary-over;
                }

                &:disabled {
                    @apply text-gray-400 cursor-not-allowed;
                }
            }
        }
    }
</style>