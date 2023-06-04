<script setup>
import { computed } from "@vue/reactivity";
import auth from "../stores/auth";

const user = computed(() => auth.state.user);
</script>

<template>
  <section class="home_page">
    <div class="home_page_items">
      <div class="home_cont animate__animated animate__backInDown animate__slow">
        <p class="home_cont_main">
          Your One-Stop <br />
          Shop for <br />
          Fitness and Health
        </p>
        <p class="home_cont_abt">
          Achieve Your Health Goals with Our All-in-One Fitness App.
        </p>
        <p class="home_cont_abt">
          Transform Your Health: <br />Monitor Blood Pressure, <br />Manage
          Weight, and <br />Achieve Your Goals with HeartFit
        </p>

        <div class="auth_btn">
          <p class="auth_log_btn" v-if="!user">
            <router-link to="/signup">Join us</router-link>
          </p>
          <p class="auth_log_btn" v-if="user">
            <router-link to="/feature">Explore our Features</router-link>
          </p>
          <!-- <p class="auth_log_btn">log in</p> -->
        </div>
      </div>
      <div class="home_img animate__animated animate__backInUp animate__slow">
        <img src="../assets/img/womanexer.jpg" alt="" />
      </div>
    </div>
  </section>
</template>

<style></style>
