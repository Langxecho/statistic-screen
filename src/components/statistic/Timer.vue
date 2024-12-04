<template>
  <div class="timer">
    <span class="digit" v-for="(digit, index) in formattedTimer" :key="index">{{
      digit
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
//接收外部传来的时间
const prop = defineProps<{
  quiz: Object;
}>();
//获取的考试信息对象
const quiz = ref();

// 示例开始时间和结束时间（可以替换为动态传入的时间戳）
const startTimestamp = ref(new Date("2024-12-01T08:00:00").getTime());
const endTimestamp = ref(new Date("2024-12-01T08:00:00").getTime());
const timeSout = ref();
watch(prop, () => {
  quiz.value = prop.quiz;
  console.log(quiz.value);
  startTimestamp.value = new Date(quiz.value.startTime).getTime();
  endTimestamp.value = new Date(quiz.value.endTime).getTime();
  updateTimeDifference();
  // console.log(quiz.value.startTime, "-------------------------------------");
});

//刷新timeDifference
const updateTimeDifference = () => {
  if (endTimestamp.value != undefined && startTimestamp.value != undefined) {
    const timeDifference =
      endTimestamp.value > startTimestamp.value
        ? endTimestamp.value - startTimestamp.value
        : startTimestamp.value - endTimestamp.value;
    // 如果时间差大于24小时，则显示 '----'
    if (timeDifference > 24 * 3600000) {
      timeSout.value = "--:--";
    } else {
      timeSout.value = formatTime(timeDifference);
    }
  }
};

// 计算属性，用于显示时间差
const timer = computed(() => {
  return timeSout.value;
});

// 方法：格式化时间为 "HH:MM"
function formatTime(milliseconds: number): string {
  // console.log(timeSout.value, "当前时间戳");
  const hours = Math.floor(milliseconds / 3600000); // 获取小时
  const minutes = Math.floor((milliseconds % 3600000) / 60000); // 获取分钟
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

// 将时间字符串分割成单个字符数组
const formattedTimer = computed(() => {
  return timer.value?.split("");
});

// 每秒更新时间
onMounted(() => {
  const timerSet = setInterval(() => {
    // 根据条件减少时间戳
    // console.log("一秒过去了");
    updateTimeDifference();

    if (endTimestamp.value > startTimestamp.value) {
      endTimestamp.value -= 1000; // 每秒减少
    } else {
      startTimestamp.value -= 1000; // 每秒减少
    }
    if (Math.abs(endTimestamp.value - startTimestamp.value) < 1000) {
      clearInterval(timerSet);
    }
  }, 1000);
});
</script>

<style scoped>
.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
}

.digit {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  text-align: center;
  line-height: 50px;
  border: 2px solid #113089;
  border-radius: 5px;
  font-size: 36px;
  background-image: linear-gradient(0deg, #0f2367, #1446c8, #0f2367);
  color: #8fc0f7;
  transition: background-color 0.3s ease;
}

.digit:hover {
  background-color: #4caf50;
  color: white;
}
</style>
