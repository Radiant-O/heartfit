<template>
  <div id="timer">{{ curTimeStr }}</div>
  <div id="state-info">
    <div id="state" class="info">
      {{ isWorking ? "Keep Going..." : "Take a Break" }}
    </div>
    <!-- <div id="turn" class="info"># {{turnCount}}</div> -->
  </div>
  <div id="buttons">
    <button @click="isPaused = !isPaused">
      {{ isPaused ? "Start" : "Pause" }}
    </button>
    <button @click="resetTimer">Reset</button>
    <button @click="nextState">Next</button>
    <button @click="showOptions = !showOptions">Adjust</button>
  </div>
  <TimerOption :options="options" :showOptions="showOptions"></TimerOption>
</template>

<script setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import TimerOption from "./timerOption.vue";

const showOptions = ref(false);

const readOptions = () => {
  const workTime = localStorage.getItem("workTime");
  const shortBreakTime = localStorage.getItem("shortBreakTime");
  // const longBreakTime = localStorage.getItem('longBreakTime');
  // const turns = localStorage.getItem('turns');
  // const enableNotifications = localStorage.getItem("enableNotifications");
  return { workTime, shortBreakTime };
};

const options = reactive({
  workTime: readOptions().workTime ? readOptions()
  .workTime 
  : 0,
  shortBreakTime: readOptions().shortBreakTime
    ? readOptions()
    .shortBreakTime
    : 5,
  // longBreakTime: readOptions().longBreakTime ? readOptions().longBreakTime : 15,
  // turns: readOptions().turns ? readOptions().turns : 4,
  enableNotifications: readOptions().enableNotifications
    ? readOptions().enableNotifications
    : true,
});

const saveOptions = () => {
  localStorage.setItem("workTime", String(options.workTime));
  localStorage.setItem("shortBreakTime", String(options.shortBreakTime));
  localStorage.setItem(
    "enableNotifications",
    String(options.enableNotifications)
  );
};

const timeRemain = ref(options.workTime * 60);
const isPaused = ref(true);
const isWorking = ref(true);
// const turnCount = ref(1);

const timer = setInterval(() => {
  if (!isPaused.value) {
    timeRemain.value--;
    if (timeRemain.value === 0) {
      // nextState();
      isPaused.value = true
    }
  }
}, 1000);

onMounted(() => {
  timer;
});

const sendNotification = () => {
  // check if browser supports notifications
  if ("Notification" in window) {
    // check if user has granted permission to send notifications
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      // send notification
      new Notification("Pomodoro Timer", {
        body: `Time to ${isWorking.value ? "rest" : "work"}!`,
      });
    }
  }
};

const curTime = computed(() => {
  const minutes = Math.floor(timeRemain.value / 60);
  const seconds = timeRemain.value % 60;
  // const minutes = seconds*60
  return { min: minutes, sec: seconds };
});

const curTimeStr = computed(() => {
  const minutes = Math.floor(timeRemain.value / 60);
  const seconds = timeRemain.value % 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
});

const resetTimer = () => {
  timeRemain.value = options.workTime * 60;
  isWorking.value = true;
  // if(isPaused.value) {
  // //     turnCount.value = 1;
  // }
  isPaused.value = true;
};

const nextState = () => {
  if (options.enableNotifications) sendNotification();
  isWorking.value = !isWorking.value;
  if (isWorking.value) {
    // turnCount.value++;
    timeRemain.value = options.workTime * 60;
  }
};

watch(
  () => options,
  () => {
    if (isPaused.value) resetTimer();
    saveOptions();
  },
  { deep: true }
);

const windowTitle = computed(() => {
  let ret = "";
  if (isPaused.value) {
    ret += "Paused - ";
  } else {
    if (curTime.value.min < 1) ret += curTime.value.sec + "s - ";
    else ret += curTime.value.min + "min - ";
  }
  ret += isWorking.value ? "Working" : "Resting";
  return ret;
});

watch(windowTitle, () => {
  document.title = windowTitle.value;
});
</script>

<style>
#timer {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
}

#state-info {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.info {
  font-size: 1.5rem;
  margin: 0 0.5rem;
}

#buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

#buttons button {
  margin: 0 0.2rem;
  padding: 0.2rem 0.2rem;
  font-size: 1.5rem;
  width: 8rem;
  border: none;
  border-radius: 2rem;
  background-color: #dccdd1;
}

#buttons button:hover {
  cursor: pointer;
  background-color: #dad3d3;
}

* {
  transition: all 0.2s ease-in-out;
}
</style>
