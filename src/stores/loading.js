import { defineStore } from 'pinia';

export const useShowLoadingStore = defineStore('showLoading', {
    state: () => ({
        showLoading: false,
    })
})