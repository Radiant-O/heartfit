<script setup lang="ts">
import { onMounted, ref } from "vue";
import FormField from "../components/formfield.vue";
import Backarrow from "../components/backarrow.vue";

const height = ref("");
const weight = ref("");
const gender = ref("");
const bodyMassIndex = ref(0);

let alert = ref("");
let clearAlert = ref("");

// interface IBmiv{
//   bmiValue : bodyMassIndex;
//   colorData : string;
//   date: Date;
// }

// const bmiVal: IBmiv[] = [];

// bmiVal.push[ {
//   bmiVal.value = bodyMassIndex;
// }]

const colorData = ref<null | { color?: string; text?: string }>(null);
const COLOR = [
  [(bmi: number) => bmi < 15.5 && bmi > 0, "#EF4444", "Underweight"],
  [(bmi: number) => bmi < 18.5, "#F97316", "Slightly Underweight"],
  [(bmi: number) => bmi >= 18.5 && bmi <= 24.9, "#16A34A", "Normal"],
  [(bmi: number) => bmi >= 25 && bmi <= 29.9, "#F97316", "Overweight"],
  [(bmi: number) => bmi >= 30 && bmi <= 34.9, "#EF4444", "Obese Class I"],
  [(bmi: number) => bmi >= 35 && bmi <= 39.5, "#EF4444", "Obese Class II"],
  [(bmi: number) => bmi >= 40, "#EF4444", "Obese Class III"],
] as const;

function getColor() {
  const data = COLOR.find(([predicate]) => predicate(bodyMassIndex.value));
  return { color: data?.[1], text: data?.[2] };
}

function calculateBodyMassIndex() {
  const _weight = parseFloat(weight.value);
  const _height = parseFloat(height.value);
  if (_weight < 0 || _height < 0) {
    return alert.value = "Inputs cannot be negative!!!";
  }
  alert.value = "";
  if (!_weight || !_height) {
    return (alert.value = "Please enter valid number!!!");
  } else if (_weight && height && !gender) {
    return (alert.value = "Please select gender");
  }
  alert.value = "";

  // const bmi = _weight / ((_height * _height) / 10000);
  const bmi = +(_weight / Math.pow(_height / 100, 2)).toFixed(1);
  bodyMassIndex.value = bmi;

  const color = getColor();
  colorData.value = { color: color.color, text: color.text };
}
</script>

<template>
  <Backarrow />
  <section class="bmi">
    <h1 class="bmi_head">Body Mass Index (BMI) Calculator</h1>

    <small class="font-light text-sm text-red-600">{{ alert }}</small>
    <form @submit.prevent="calculateBodyMassIndex()">
      <div class="gender_sel mb-3">
        <p class="font-medium mb-1">Select Your Gender</p>
        <div class="gend">
          <div class="gen">
            <input type="radio" value="male" v-model="gender" />
            <label for="male">Male</label>
          </div>
          <div class="gen">
            <input type="radio" value="female" v-model="gender" />
            <label for="female">Female</label>
          </div>
        </div>
      </div>

      <FormField label="Height in centimeters">
        <input
          required
          type="number"
          v-model="height"
          class="bmi_input"
          placeholder="180"
        />
      </FormField>

      <FormField label="Weight in kilograms">
        <input
          required
          type="number"
          v-model="weight"
          class="bmi_input"
          placeholder="60"
        />
      </FormField>

      <button type="submit" class="bmi_input_btn">Calculate</button>

      <p
        v-if="colorData"
        :style="{ color: bodyMassIndex ? colorData.color : undefined }"
        class="mt-10 text-5xl font-bold"
      >
        <span class="block">{{
          bodyMassIndex && bodyMassIndex.toFixed(2)
        }}</span>
        <span class="block text-3xl capitalize leading-10">{{
          colorData.text
        }}</span>
      </p>
      <!-- <p class="mt-10 text-5xl font-bold" v-else>
        <span class="block">—</span>
        <span class="block text-xl capitalize leading-10"
          >Waiting for input...</span
        >
      </p> -->
    </form>
  </section>
</template>

<style scoped></style>
