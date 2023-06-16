<script setup>
import Loader from "../components/loader.vue";
import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";

const router = useRouter();

const active = ref(false);
const fname = ref("");
const username = ref("");
const email = ref("");
const password = ref("");

const errorMsg = ref(null);

const handleSignUp = async () => {
  
  try {
    active.value = true;
    // Use the Supabase provided method to handle the signin
    const { error } = await supabase.auth.signUp({
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
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
      active.value = false;
    }, 1500);
  }
};
</script>

<template>
  <div class="nems">
  <section class="signup">
    <div class="sign_box">
      <p class="login_text">SIGN UP</p>
      <div class="auth_box">
        <div v-if="errorMsg" class="errormsg">
          <p class="text-red-500">{{ errorMsg }}</p>
        </div>
        <form @submit.prevent="handleSignUp()">
          <div class="auth_input">
            <input
              type="text"
              v-model="fname"
              class="email"
              placeholder="Full Name"
              required
            />
          </div>
          <div class="auth_input">
            <input
              type="mail"
              v-model="email"
              class="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div class="auth_input">
            <input
              type="text"
              v-model="username"
              class="email"
              placeholder="Username"
              required
            />
          </div>
          <div class="auth_input">
            <input
              type="password"
              v-model="password"
              class="email"
              placeholder="Password"
              required
            />
          </div>
          <div class="loading">
            <div class="loader" v-if="active">
              <Loader />
            </div>
          </div>

          <button type="submit" class="sign_btn">SIGNUP</button>
        </form>

        <p class="sign_option">
          Already a member?
          <router-link to="/login" class="span text-green-600">Sign In</router-link>
        </p>
      </div>
    </div>
    <div class="sign_benefits">
      <p class="benefit_text">Key Benefits:</p>
      <ul>
        <li>Track your weight</li>
        <li>Favorite workout exercise</li>
        <li>Helpful health, nutrition and fitness advice</li>
        <li>BMI Calculator</li>
        <li>Blood pressure monitoring</li>
        <li>and much more....</li>
      </ul>
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
