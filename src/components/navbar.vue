<script setup>
import auth from "../stores/auth";
import { computed } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router"

const user = computed(() => auth.state.user);

const router = useRouter();

const logout = async () => {
  await supabase.auth.signOut();
  router.push({ name: "home" })
}
</script>

<template>
  <nav class="nav">
    <div class="top_nav">
      <router-link to="/" class="logo"><span><img src="../assets/icons/heart.jpg" class="logo_img"></span>HeartFit</router-link>
      <div class="auth">
        <img src="../assets/icons/UserAccount.png" class="user_auth"/>
        <router-link v-if="!user" :to="{name: 'login'}">Login</router-link>
        <p v-if="user" @click="logout">Logout</p>
      </div>
    </div>
    <div class="bot_nav">
      <router-link to="/" class="nav_link">Home</router-link>
      <router-link to="/about" class="nav_link">About</router-link>
      <router-link v-if="user" to="/feature" class="nav_link">Features</router-link>
    </div>
  </nav>
</template>

<style></style>
