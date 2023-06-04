<script setup lang="ts">
import { ref } from "vue";
import FormField from "../components/formfield.vue";
import data from "../assets/data.json";
import Backarrow from "../components/backarrow.vue";

const sys = ref();
const dia = ref();
// const alert = ref("");

function between(x, min, max) {
  return x >= min && x <= max;
}


function getBloodPressureStatus() {
  const _s = sys.value;
  const _d = dia.value;

  
  // if (_s <= 39.9 || _d <= 39.0){
  //   alert("Invalid Systolic or Diastolic Input");
  // } else if(_s < 371 || _d < 361){
  //   alert("Invalid Systolic or Diastolic Input");
  // }

  if (!_s || !_d) {
    return;
  } else if (between(_s, 40, 90) && between(_d, 40, 60)) {
    return data.low;
  } else if (between(_s, 91, 120) && between(_d, 61, 80)) {
    return data.normal;
  } else if (between(_s, 120, 129) && between(_d, 61, 80)) {
    return data.elevated;
  } else if (between(_s, 130, 139) && between(_d, 80, 89)) {
    return data.stageone;
  } else if (between(_s, 140, 179) && between(_d, 90, 119)) {
    return data.stagetwo;
  } else if (between(_s, 180, 370) && between(_d, 120, 360)) {
    return data.critical;
  } 

}
</script>

<template>
  <Backarrow />
  <section class="bmi">
    <h1 class="bmi_head">Blood Pressure Tracker</h1>

    <form @submit.prevent="getBloodPressureStatus()">
      <FormField label="Systolic Level">
        <input
          required
          type="number"
          min="1"
          max="1000"
          v-model="sys"
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
          v-model="dia"
          class="bmi_input"
          placeholder="60"
        />
      </FormField>

      <button type="submit" class="bmi_input_btn">Submit</button>

      <div class="result" v-if="getBloodPressureStatus()">
        <p class="main_result">
          Current Condition: {{ getBloodPressureStatus()?.bpStatus }}
        </p>
        <p class="advise_head">RECOMMENDATIONS:</p>
        <p
          class="result_advice"
          v-for="advise in getBloodPressureStatus()?.advice"
        >
          <span class="advise_one">{{ advise }}.</span>
        </p>
      </div>
      <!-- <p class="mt-10 text-5xl font-bold" v-else>
        <span class="block"></span>
        <span class="block text-xl capitalize leading-10"
          >Waiting for input...</span
        >
      </p> -->
    </form>
  </section>
</template>

<style scoped></style>
