<script setup>
import Navbar from '../components/navbar.vue';

</script>

<template>
  <section class="login">
    <p class="login_text">Welcome Back..</p>
    <div class="auth_box">
    <div class="auth_input">
      <label for="email">Email</label>
      <input type="text" class="email" />
    </div>
    <div class="auth_input">
      <label for="password">Password</label>
      <input type="password" class="email" />
    </div>
    <p class="sign_btn">Login</p>

    <p class="sign_option">Not a member yet? <span>Join Here</span></p>
    </div>
  </section>
</template>

<style></style>
