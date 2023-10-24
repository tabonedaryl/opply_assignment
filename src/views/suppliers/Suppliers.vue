<script lang="ts">
import {ref, reactive, onMounted} from 'vue';
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {useRouter} from "vue-router";
import {useUserStore} from "../../stores/user";

import { DataTable } from "@jobinsjp/vue3-datatable"
import "@jobinsjp/vue3-datatable/dist/style.css"

export default {
    components: { DataTable },
    setup() {
        const store = useUserStore();
        const router = useRouter();

        const suppliers = ref([]);
        const next = ref();
        const previous = ref();

        const params = reactive({
            page: 1
        });

        const isLoading = ref(false);

        function getSuppliers() {
            isLoading.value = true;

            axios.get('suppliers/', {params: params})
                .then((response) => {
                    console.log(response.data)
                    suppliers.value = response.data.results;
                    next.value = response.data.next;
                    previous.value = response.data.previous;
                    isLoading.value = false;
                })
                .catch(e => {
                    isLoading.value = false;
                    toast.error('Failed to get suppliers!', {autoClose: 2000, position: "bottom-left"});
                })
        }

        function previousPage() {
            params.page--;
            getSuppliers();
        }

        function nextPage() {
            params.page++;
            getSuppliers();
        }

        onMounted(getSuppliers);

        return { isLoading, suppliers, previous, next, previousPage, nextPage };
    }
}
</script>

<template>
    <div class="suppliers-page page">
        <h1>Suppliers</h1>

        <data-table class="data-table" :rows="suppliers" :loading="isLoading"></data-table>

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
            @apply mb-12;
        }

        & > .data-table {
            @apply shadow rounded-xl;
        }

        & > .pagination-container {
            @apply flex flex-row ml-auto mt-8;

            & > button {
                @apply text-gray-800 ml-4 cursor-pointer;

                &:hover {
                    @apply text-primary;
                }

                &:disabled {
                    @apply text-gray-400 cursor-not-allowed;
                }
            }
        }
    }
</style>