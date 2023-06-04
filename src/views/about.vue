<script setup>
import { computed } from "@vue/reactivity";
import auth from "../stores/auth";

const user = computed(() => auth.state.user);
</script>


<template>
  <section class="about_page">
    <h2 class="about_head">ABOUT US</h2>
    <div class="abt_page">
      <div class="abt_img">
        <img src="../assets/img/medi.jpg" alt="" />
      </div>
      <div class="abt_text">
        <p class="about_text">
          Welcome to HeartFit, your ultimate companion for blood pressure
          monitoring and weight management. Our app is designed to empower you
          to take control of your health and make informed decisions to live a
          healthier and happier life. <br/>At HeartFit, we understand the importance
          of maintaining a healthy blood pressure and managing your weight
          effectively. That's why we've developed a comprehensive suite of tools
          and features to assist you in achieving your health goals. Whether
          you're looking to track your weight, calculate your BMI, time your
          workouts, or monitor your blood pressure, our app has got you covered.
        </p>
        <p class="about_text">
          Thank you for choosing HeartFit as your partner in health and
          wellness. We look forward to helping you reach your full potential and
          live your healthiest life.
        </p>
<div>
        <p class="abt_btn" v-if="!user"><router-link to="/">Get Started</router-link></p>
        <p class="abt_btn" v-else><router-link  to="/feature">Get Started</router-link></p>
      </div>
        
      </div>
    </div>
  </section>
</template>
