<script setup lang="ts">
import exercise from "../assets/exercise.json";
import { ref, computed, watch} from "vue";
import Backarrow from "../components/backarrow.vue";
import ShowTimer from "../components/showTimer.vue";

const isSelect = ref(false);

// // function start() {
// //     stopwatch.start()
// //     isStarted = true
// // }

const selectedWorkout = ref("");

const workoutDescription = ref("");

const workout = computed(() => {
   return exercise.map((exe) => {
      return {
        key: exe.exercise.toLowerCase(),
        value: exe.exercise,
      };
    })
    .sort((a, b) => (a.key > b.key ? 1 : -1));
});

const desp = computed(() => {
    if (selectedWorkout.value) {
        const exer = exercise.find((exe) => exe.exercise.toLowerCase() === selectedWorkout.value);
        return exer?.description

    }
});
const bodyPart = computed(() => {
    if (selectedWorkout.value) {
        const exer = exercise.find((exe) => exe.exercise.toLowerCase() === selectedWorkout.value);
        return exer?.bodyPart

    }
});
const youLink = computed(() => {
    if (selectedWorkout.value) {
        const exer = exercise.find((exe) => exe.exercise.toLowerCase() === selectedWorkout.value);
        return exer?.youLink

    }
});


watch(selectedWorkout, () => (workoutDescription.value = ""));
</script>

<template>
  <Backarrow />
  <section class="workout bmi">
    <h3 class="bmi_head w_head">Exercise</h3>
    <p class="sel_workout">
      Get Started with the workout that works well with you!!!
    </p>
    <div class="select_exe">
      <label for="exercise" class="sel_workout">Select Exercise</label>
      <select
        v-model="selectedWorkout"
        placeholder="Select WorkOut"
        class="text-black"
      >
        <option
          placeholder="Select WorkOut"
          v-for="work in workout"
          :key="work.key"
          :value="work.key"
        >
          {{ work.value }}
        </option>
      </select>
    </div>
    <div  v-if="selectedWorkout">
      <p class="selected_exe">{{ selectedWorkout }}</p>
      <p class="abt_exercise">{{ desp }}</p>
      <p class="body_part">Targeted Body Part: {{ bodyPart }}</p>
      <p class="body_part">Click the link for tutorial video <a :href="youLink" target="_blank">{{ youLink }}</a></p>
      <!-- <div class="workout_time">
        <h1 v-if="!stopwatch.stopwatch.isRunning">Just do it!</h1>
        <h1 v-else>Keep Going...</h1>
        <div class="timer-time">
            <span class="time">{{stopwatch.stopwatch.hours}}H</span>:<span class="time">{{stopwatch.stopwatch.minutes}}M</span>:<span class="time">{{stopwatch.stopwatch.seconds}}S</span>
        </div>

        <button class="btn play" v-if="!stopwatch.stopwatch.isRunning" @click="start()"><img src="../assets/img/small-play.png" alt=""></button>
        <button class="btn pause" v-if="stopwatch.stopwatch.isRunning" @click="stopwatch.pause()"><img src="../assets/img/small-pause.png" alt=""></button>
        <button class="btn stop" @click="stopwatch.stop()" :disabled="isStarted == false"><img src="../assets/img/stop.png" alt=""></button>
    </div> -->
      <ShowTimer />
    </div>
  </section>
</template>

<style scoped>
.btn {
  border: none;
  border-radius: 3rem;
  display: inline-block;
  width: 4rem;
  height: 4rem;
  font-size: 1.4rem;
  margin-right: 1rem;
}
.play {
  background: yellow;
  color: white;
}
img {
  @apply mx-auto w-10;
}
.pause {
  background: yellow;
  color: black;
}
.stop {
  background: white;
  color: black;
}
/* .timer-time {
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1.3rem 0;
} */
.timer-time span.time {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.08);
  padding: 0.5rem 1rem;
  text-align: center;
  border-radius: 0.5rem;
}
</style>
