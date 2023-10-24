<script lang="ts">
import {ref, reactive, onMounted} from 'vue';
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useRouter} from "vue-router";
import {useUserStore} from "../../stores/user";
import { VueGoodTable } from 'vue-good-table-next';

export default {
    components: { VueGoodTable },
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
            //set is loading variable to true
            isLoading.value = true;

            //get request to get suppliers from API
            axios.get('suppliers/', {params: params})
                .then((response) => {
                    //filling suppliers array with data from API

                    suppliers.value = response.data.results;

                    //next page variable
                    next.value = response.data.next;

                    //previous page variable
                    previous.value = response.data.previous;

                    //set is loading variable to false
                    isLoading.value = false;
                })
                .catch(e => {
                    //set is loading variable to false
                    isLoading.value = false;

                    //toast to notify user that API call has failed
                    toast.error('Failed to get suppliers!', {autoClose: 2000, position: "bottom-left"});
                })
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

        return { isLoading, columns, suppliers, previous, next, previousPage, nextPage };
    }
}
</script>

<template>
    <div class="suppliers-page page">
        <h1>Suppliers</h1>

        <vue-good-table
            :columns="columns"
            :rows="suppliers"
        />

        <div class="pagination-container">
            <button @click="previousPage" :disabled="!previous">Previous</button>
            <button @click="nextPage" :disabled="!next">Next</button>
        </div>
    </div>
</template>

<style scoped>
    .suppliers-page {
        @apply flex flex-col overflow-x-scroll;

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