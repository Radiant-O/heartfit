<script setup>
import router from "@/router";

const goBack = () => {
    router.back();
}
</script>
<template>
    <div class="back_icon">
        <img @click="goBack()" src="../assets/icons/right-arrow.png">
    </div>
</template>

<style scoped>
.back_icon{
    @apply w-8 cursor-pointer mt-7 ml-2 lg:ml-16 pl-2   
}
</style>