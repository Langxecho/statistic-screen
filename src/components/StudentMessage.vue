<template>
  <div class="flex text-sm text-white justify-between mt-4 ml-8 mr-8">
    <div
      v-for="(item, index) in dataX"
      class="flex flex-col items-center p-1 w-80px gradient-background justify-center"
      style="border: 1px solid #6cb0d4"
    >
      <div class="gradient-text text-xl">{{ dataInput[index] }}</div>
      <div class="text-blue-400">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed,watch } from "vue";

const prop = defineProps({
  dataInput: Array<Number>,
});
const dataInput = ref<Array<Number>>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const dataX = [
  "应考人数",
  "签到人数",
  "实考人数",
  "考核中",
  "卷分配人数",
  "答题中",
  "完成考试",
  "未签到",
  "未考核",
  "合格人数",
];
const textColor = [
  "#73b3fb",
  "#64c6e0",
  "#9a2445",
  "#2b61c6",
  "#40c0cc",
  "#bb4f6c",
  "#73b3fb",
  "#64c6e0",
  "#9a2445",
  "#2b61c6",
];
const updateData = () => {
  if(prop.dataInput === undefined) return;
  else{
    dataInput.value = prop.dataInput
  }
  
}
watch(prop,() => {
  updateData()
})
</script>

<style scoped>
.gradient-background {
  background: #080e59;
}
.gradient-text {
  background: linear-gradient(to top, #112d84, #175afd, #185bff); /* 渐变颜色 */
  -webkit-background-clip: text; /* 必须加上webkit前缀 */
  color: transparent; /* 使文本本身透明，以便显示背景 */
}
</style>
