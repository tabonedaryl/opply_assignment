<script lang="ts">
import {ref, reactive, onMounted} from 'vue';
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { VueGoodTable } from 'vue-good-table-next';

export default {
    components: { VueGoodTable },
    setup() {
        const quotes = ref([]); //quotes array
        const next = ref(); //next page
        const previous = ref(); //previous page

        interface Row {
            id: number,
            supplier_id: number,
            title: string
            amount: string,
            created: string
        }

        function createdFn(row:Row) {
            const date = new Date(row.created);
            return date.toLocaleString();
        }

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
                label: 'Supplier ID',
                field: 'supplier_id',
                sortable: false,
            },
            {
                label: 'Title',
                field: 'title',
                sortable: false,
            },
            {
                label: 'Amount',
                field: 'amount',
                sortable: false,
            },
            {
                label: 'Created',
                field: createdFn,
                sortable: false,
            },
        ]);

        //function to get quotes
        function getQuotes() {
            isLoading.value = true; //setting is loading variable to true

            //get request to get quotes from API
            axios.get('quotes/', {params: params})
                .then((response) => {
                    quotes.value = response.data.results; //setting quotes array with data from API
                    next.value = response.data.next; //next page variable
                    previous.value = response.data.previous; //previous page variable
                    isLoading.value = false; //set is loading variable to false
                })
                .catch(() => {
                    isLoading.value = false; //set is loading variable to false

                    //toast to notify user that API call has failed
                    toast.error('Failed to get quotes!', {autoClose: 2000, position: "bottom-left"});
                })
        }

        function previousPage() {
            params.page--; //decrement page count when function is called
            getQuotes(); //get quotes after page count is decremented
        }

        function nextPage() {
            params.page++; //increment page count when function is called
            getQuotes(); //get quotes after page count is incremented
        }

        onMounted(getQuotes); //get quotes on mounted

        return { isLoading, columns, quotes, previous, next, previousPage, nextPage };
    }
}
</script>

<template>
    <div class="quotes-page page">
        <h1>Quotes</h1>

        <vue-good-table
            :columns="columns"
            :rows="quotes"
        />

        <div class="pagination-container">
            <button @click="previousPage" :disabled="!previous">Previous</button>
            <button @click="nextPage" :disabled="!next">Next</button>
        </div>
    </div>
</template>

<style scoped>
.quotes-page {
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