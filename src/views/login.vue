<script setup>

import { supabase } from "../supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useShowLoadingStore } from "../stores/loading"

const showLoading = useShowLoadingStore();


const router = useRouter();

const email = ref("");
const password = ref("");

const errorMsg = ref(null);

const handleSignIn = async () => {
  try {
    // Use the Supabase provided method to handle the signin
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    setTimeout(()=>{
      
    })
    if (error) throw error;
    router.push({ name: 'home' })
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000)
  }
};

</script>


<template>
  <section class="login">
    <p class="login_text">Welcome Back..</p>
    <div class="auth_box">
      <div v-if="errorMsg" class="errormsg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>
      <form @submit.prevent="handleSignIn">
        <div class="auth_input">
          <label for="email">Email</label>
          <input type="mail" v-model="email" class="email" />
        </div>
        <div class="auth_input">
          <label for="password">Password</label>
          <input type="password" v-model="password" class="email" />
        </div>
        <button type="submit" class="sign_btn">Login</button>
      </form>
      <p class="sign_option">
        Not a member yet?
        <router-link to="/signup" class="span">Join Us</router-link>
      </p>
    </div>
  </section>
</template>

<style></style>
