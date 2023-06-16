<script setup>
import Loader from "../components/loader.vue";
import { supabase } from "../supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useShowLoadingStore } from "../stores/loading"

const router = useRouter();
const active = ref(false);
const email = ref("");
const password = ref("");

const errorMsg = ref(null);

const handleSignIn = async () => {
  try {
    active.value = true;
    // Use the Supabase provided method to handle the signin
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    setTimeout(() => {
      active.value = false;
    }, 2000);
    router.push({ name: "home" });
  } catch (error) {
    active.value = true;
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
      active.value = false;
    }, 1500);
  }
};
</script>

<template>
  <div class="nems">
  <section class="login">
    <p class="login_text">Welcome Back..</p>
    <div class="auth_box login_box">
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

        <div class="loading">
          <div class="loader" v-if="active">
            <Loader />
          </div>
        </div>
        <button type="submit" class="sign_btn">Login</button>
      </form>
      <p class="sign_option">
        Not a member yet?
        <router-link to="/signup" class="span text-green-600">Join Us</router-link>
      </p>
    </div>
  </section>
</div>
</template>

<style scoped>
.loading {
  @apply w-[130%];
}
.loader {
  @apply flex items-center justify-center;
}
</style>
