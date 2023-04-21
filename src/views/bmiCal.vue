<script setup lang="ts">
import { ref } from "vue";
import FormField from "../components/formfield.vue";
const height = ref("0");
const weight = ref("0");
const bodyMassIndex = ref(0);
const colorData = ref<null | { color?: string; text?: string }>(null);
const COLOR = [
  [(bmi: number) => bmi < 15.5, "#EF4444", "underweight"],
  [(bmi: number) => bmi < 18.5, "#F97316", "slightly underweight"],
  [(bmi: number) => bmi >= 18.5 && bmi <= 25, "#16A34A", "normal"],
  [(bmi: number) => bmi >= 25 && bmi <= 30, "#F97316", "overweight"],
  [(bmi: number) => bmi > 30, "#EF4444", "obese"],
] as const;
function getColor() {
  const data = COLOR.find(([predicate]) => predicate(bodyMassIndex.value));
  return { color: data?.[1], text: data?.[2] };
}
function calculateBodyMassIndex() {
  const _weight = parseFloat(weight.value);
  const _height = parseFloat(height.value);
  if (!_weight || !_height) {
    return;
  }
  const bmi = _weight / ((_height * _height) / 10000);
  bodyMassIndex.value = bmi;
  const color = getColor();
  colorData.value = { color: color.color, text: color.text };
}
</script>

<template>
  <section class="bmi">
    <h1 class="bmi_head">Body Mass Index (BMI) Calculator</h1>
   

    <form @submit.prevent="calculateBodyMassIndex()">
      <FormField label="Height in centimeters">
        <input
          required
          type="number"
          min="1"
          max="1000"
          v-model="height"
          class="bmi_input"
          placeholder="180"
        />
      </FormField>

      <FormField label="Weight in kilograms">
        <input
          required
          type="number"
          min="1"
          max="1000"
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
      <p class="mt-10 text-5xl font-bold" v-else>
        <span class="block">—</span>
        <span class="block text-xl capitalize leading-10"
          >Waiting for input...</span
        >
      </p>
    </form>
  </section>
</template>

<style scoped></style>
