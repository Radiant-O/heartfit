<script setup>
import { computed } from "@vue/reactivity";
import auth from "../stores/auth";

const user = computed(() => auth.state.user);

</script>

<template>
  <section class="home_page">
    <div class="home_page_items">
      <div class="home_cont">
        <p class="home_cont_main">Your One-Stop <br/> Shop for <br/> Fitness and Health</p>
        <p class="home_cont_abt">
          Achieve Your Health Goals with Our <br/> All-in-One Fitness App
        </p>

        <div class="auth_btn">
          <router-link v-if="!user" to="/signup" class="auth_log_btn">join us</router-link>
          <router-link v-if="user" to="/feature" class="auth_log_btn">Explore our Features</router-link>
          <!-- <p class="auth_log_btn">log in</p> -->
        </div>
      </div>
      <div class="home_img">
        <img src="../assets/img/womanexer.jpg" alt="" />
      </div>
    </div>
  </section>
</template>

<style></style>
