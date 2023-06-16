<script setup>
import navbar from "./components/navbar.vue";
import { ref } from "vue";
import { supabase } from "./supabase";
import auth from "./stores/auth";




const appReady = ref(null);
const user = supabase.auth.getUser();

if (!user) {
  appReady.value = true;
  
}

supabase.auth.onAuthStateChange((_, session) => {
  auth.methods.setUser(session);
  appReady.value = true;
});




</script>

<template>
  <div v-if="appReady">
    <navbar />
    <RouterView />
  </div>
</template>

<style scoped></style>
