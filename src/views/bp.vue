<script setup lang="ts">
import { ref } from "vue";
import FormField from "../components/formfield.vue";
import data from "../assets/data.json";
import Backarrow from "../components/backarrow.vue";
import PreLoader from "../components/preLoader.vue";

const sys = ref();
const dia = ref();
// const alert = ref("");

function between(x, min, max) {
  return x >= min && x <= max;
}

function getBloodPressureStatus() {
  const _s = sys.value;
  const _d = dia.value;


  if (!_s || !_d) {
    return;
  } else if (between(_s, 70, 89) && between(_d, 40, 59)) {
    return data.low;
  } else if (between(_s, 90, 119) && between(_d, 60, 79)) {
    return data.normal;
  } else if (between(_s, 120, 129) && between(_d, 60, 79)) {
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
  <PreLoader />
  <div class="nems">
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
          placeholder="120"
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

      <!-- <button type="submit" class="bmi_input_btn">Submit</button> -->

      <div class="result" v-if="getBloodPressureStatus()">
        <p class="main_result text-3xl">
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
    <div class="abt_bp">
      <h1 class="top_bp">Understanding your blood pressure reading</h1>
      <div class="bp_texts">
        <img src="../assets/img/bp_levels.jpeg" alt="" />
        <div class="bp_words">
          <p>
            Blood pressure is measured in millimetres of mercury (mmHg) and is
            given as 2 numbers:
          </p>
          <ul class="bp_p">
            <li>
              <span class="text-bold">-</span> Systolic pressure : the pressure when your heart pushes blood out.
            </li>
            <li>
              <span class="text-bold">-</span> Diastolic pressure : the pressure when your heart rests between
              beats.
            </li>
          </ul>
          <p>
            The highest number is always the systolic pressure and it's always
            given first.<br/>For example, a blood pressure given as "120 over 80" or
            120/80mmHg means a systolic pressure of 120mmHg and a diastolic
            pressure of 80mmHg. <br/>As a general guide: normal blood pressure is
            considered to be between 90/60mmHg and 120/80mmHg high blood
            pressure is considered to be 140/90mmHg or higher low blood pressure
            is considered to be 90/60mmHg or lower If your reading is between
            120/80mmHg and 140/90mmHg, you may be at risk of developing high
            blood pressure.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="nxt_icon">
    <router-link to="/feature/weight-tracker"
      ><img src="../assets/icons/right-arrow.png"
    /></router-link>
    <p>Next</p>
  </div>
</div>
</template>

<style scoped></style>
