<script setup lang="ts">
import { ref } from "vue";
import FormField from "../components/formfield.vue";
import data from "../assets/data.json";

const systolic = ref("0");
const diastolic = ref("0");

function between(x, min, max) {
  return x >= min && x <= max;
}

function getBloodPressureStatus() {
  const _s = parseInt(systolic.value);
  const _d = parseInt(diastolic.value);

  
  if (!_s || !_d) {
    return;
  } else if (_s < 120 && between(_d, 20, 80)) {
    return data.normal;
  } else if (between(_s, 120, 129) && between(_d, 20, 80)) {
    return data.elevated;
  } else if (between(_s, 130, 139) && between(_d, 80, 89)) {
    return data.stageone;
  } else if (between(_s, 140, 179) && between(_d, 90, 119)) {
    return data.stagetwo;
  } else if (_s >= 180 && _d >= 120) {
    return data.critical;
  }
} 



</script>

<template>
  <section class="bmi">
    <h1 class="bmi_head">Blood Pressure Tracker</h1>


      <FormField label="Systolic Level">
        <input
          required
          type="number"
          min="1"
          max="1000"
          v-model="systolic"
          class="bmi_input"
          placeholder="180"
        />
      </FormField>

      <FormField label="Diastolic Level">
        <input
          required
          type="number"
          min="1"
          max="1000"
          v-model="diastolic"
          class="bmi_input"
          placeholder="60"
        />
      </FormField>

      <!-- <button type="submit" @click="getBloodPressureStatus()" class="bmi_input_btn">Submit</button> -->

      <div class="result" v-if="getBloodPressureStatus()">
        <p class="main_result">Current Condition: {{ getBloodPressureStatus()?.bpStatus }}</p>
        <p class="advise_head">RECOMMENDATIONS:</p>
        <p class="result_advice" v-for="advise in getBloodPressureStatus()?.advice">
        <span class="advise_one">{{ advise }}</span>
        </p>
        
      </div>
      <p class="mt-10 text-5xl font-bold" v-else>
        <span class="block"></span>
        <span class="block text-xl capitalize leading-10"
          >Waiting for input...</span
        >
      </p>
    
  </section>
</template>

<style scoped></style>
