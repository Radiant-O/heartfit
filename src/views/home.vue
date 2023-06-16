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
          <span class="text-5xl text-green-700">FITNESS</span> and <span class="text-5xl text-green-700">HEALTH</span>.
        </p>
        <p class="home_cont_abt hreree">
          Achieve your health goals with our all-in-one fitness app.
        </p>
        <p class="home_cont_abt mt-5">
          <span class="font-bold text-2xl font-open-sans">Transform Your Health:</span> <br />Monitor Blood Pressure, <br />Manage
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
      <!-- <div class="home_img animate__animated animate__backInUp animate__slow">
        <img src="../assets/img/run.png" alt="" />
      </div> -->
    </div>
  </section>
</template>

<style scoped>
*{
  color: white;
}
.home_page{
  @apply lg:bg-big-screen bg-small-screen bg-center bg-fixed bg-no-repeat bg-cover w-[100vw] h-[100vh] -mt-[5.8rem] pt-[5.8rem]
}
</style>
