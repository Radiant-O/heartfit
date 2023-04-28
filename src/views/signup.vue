<script setup>
import { ref } from "vue";
import { supabase } from "../supabase"
import { useRouter } from "vue-router"

const router = useRouter();

const fname = ref("");
const username = ref("");
const email = ref("");
const password = ref("");

const errorMsg = ref(null);

const handleSignUp = async () => {
  try {
        // Use the Supabase provided method to handle the signin
        const { error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "home" });
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      };
}

</script>

<template>
  <section class="signup">
    <div>
    <p class="login_text">SIGN UP</p>
    <div class="auth_box">
      <div v-if="errorMsg" class="errormsg">
        <p class="text-red-500">{{ errorMsg }}</p>
      </div>
      <form @submit.prevent="handleSignUp()" >
    <div class="auth_input">
      <input type="text" v-model="fname" class="email" placeholder="Full Name"/>
    </div>
    <div class="auth_input">
      <input type="mail" v-model="email"  class="email" placeholder="Email Address"/>
    </div>
    <div class="auth_input">
      <input type="text" v-model="username" class="email" placeholder="Username"/>
    </div>
    <div class="auth_input">
      <input type="password" v-model="password" class="email" placeholder="Password" />
    </div>
    <button type="submit" class="sign_btn">SIGNUP</button>
  </form>

    <p class="sign_option">Already a member? <router-link to="/login" class="span">Sign In</router-link></p>
</div>
</div>
<div class="sign_benefits">
    <p class="benefit_text">Key Benefits:</p>
    <ul>
        <li>Customizeable fitness calendar</li>
        <li>Favorite workout exercise</li>
        <li>Helpful health, nutrition and fitness advice</li>
        <li>BMI Calculator</li>
        <li>Blood pressure monitoring</li>
        <li> and much more....</li>
    </ul>
</div>
  </section>
</template>

<style></style>
