<script setup>
import { ref, shallowRef, computed, watch, nextTick, onMounted } from "vue";
import Chart from "chart.js/auto";
import Backarrow from "../components/backarrow.vue";
import { supabase } from "../supabase";

const weights = ref([]);
const weightChartEl = ref(null);
const weightChart = shallowRef(null);
const weightInput = ref(0);
const date = new Date().toLocaleDateString();
const msgs = ref("");

//Get Weight on page load
onMounted(() => {
  getWeight();
});

// const currentWeight = computed(() => {
//   return weights.value.sort((a, b) => b.date - a.date)[0] ||  0 ;
// });

const currentWeight = computed(() => {
  return weights.value[weights.value.length - 1] || { weight: 0 };
});

//Add Weight
const addWeight = async () => {
  // const _weightValue = weightInput.value cvx
  if (weightInput <= 0) {
    return (msgs.value = "Invalid Weight Value!!!");
  }

  try {
    const { error } = await supabase.from("weightTracker").insert({
      weightInput: weightInput.value,
      date: date,
    });

    if (error) throw error;
    weights.value.push({
      weight: weightInput.value,
      date: new Date().toLocaleDateString(),
    });

    weightInput.value = 0;
  } catch (error) {
    msgs = `Error: ${error.message}`;
    setTimeout(() => {
      msgs.value = false;
    }, 2000);
  }
};

//Delete Weight
const deleteWeight = async () => {
  try {
    const { error } = await supabase.from("weightTracker").delete().eq("id", 1);
    if (error) throw error;
  } catch (error) {}
};

//Fetch weight from supabase
const getWeight = async () => {
  try {
    const { data, error } = await supabase
    .from("weightTracker")
    .select();
    if (error) throw error;

    if (data) {
      console.log(data);

      const weightFetch = data.map((wei) => {
        return weights.value.push({
          id: wei.id,
          weight: wei.weightInput,
          date: wei.date,
        });
      });

    
    }
  } catch (error) {
    // msgs = `Error: ${error.message}`;
    // setTimeout(() => {
    //   msgs.value = false;
    // }, 2000);
  }
};

watch(
  weights,
  (newWeights) => {
    const ws = [...newWeights];

    if (weightChart.value) {
      weightChart.value.data.labels = ws
        .sort((a, b) => a.date - b.date)
        .map((w) => new Date(w.date).toLocaleDateString())
        .slice(-7);

      weightChart.value.data.datasets[0].data = ws
        .sort((a, b) => a.date - b.date)
        .map((w) => w.weight)
        .slice(-7);

      weightChart.value.update();

      return;
    }

    nextTick(() => {
      weightChart.value = new Chart(weightChartEl.value.getContext("2d"), {
        type: "line",
        data: {
          labels: ws
            .sort((a, b) => a.date - b.date)
            .map((w) => new Date(w.date).toLocaleDateString()),
          datasets: [
            {
              label: "Weights",
              data: ws.sort((a, b) => a.date - b.date).map((w) => w.weight),
              backgroundColor: "rgba(90, 235, 172, 0.2)",
              borderColor: "rgb(24, 137, 88)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });
  },
  { deep: true }
);
// const { session } = toRefs(props)

/*const getProfile = async (session) => {
  try {
    loading.value = true;
    // const user = session.user;https://www.youtube.com/watch?v=H9M02of22z4&list=PLTP3E5bPW796_icZanMqhdg7i0Cl7Y51F&index=11&pp=iAQB
    let { data, error, status } = await supabase
      .from("profiles")
      .select(weightInput, date)
      .eq("id", user.id)
      .single();
    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
    debugger;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};
// getProfile(props.session);*/
</script>

<template>
  <Backarrow />
  <section class="bmi">
    <h1 class="bmi_head w_head">Weight Tracker</h1>

    <div class="current">
      <span>{{ currentWeight.weight }}</span>
      <!-- <span>{{ weightInput }}</span> -->
      <small>Current weight (kg)</small>
    </div>

    <small class="font-light text-sm text-red-600">{{ msgs }}</small>
    <form @submit.prevent="addWeight" class="weight_form">
      <input
        class="weight_form_num"
        type="number"
        step="0.1"
        v-model="weightInput"
      />

      <input type="submit" value="Add weight" />
    </form>

    <div v-if="weights && weights.length > 0">
      <h2 class="w_his">Weight History Chart</h2>

      <div class="canvas-box">
        <canvas ref="weightChartEl"></canvas>
      </div>

      <div class="weight-history">
        <h2 class="weight_text">Weight History</h2>
        <table>
          <tr>
            <th>Weight</th>
            <th>Date</th>
          </tr>
          <tr v-for="weight in weights" class="weight_list">
            <td>{{ weight.weight }} kg</td>
            <td>
              {{ new Date(weight.date).toLocaleDateString() }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  padding: 10px;
  border-collapse: collapse;
  border-style: solid;
}
table {
  width: 70%;
}
td {
  margin: auto;
  text-align: center;
  padding: auto;
}
tr:nth-child(even) {
  @apply bg-[#f6fff6];
}
</style>
