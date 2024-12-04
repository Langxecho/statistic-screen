<template>
  <div>
    <div ref="main" class="w-full" style="height: 500px"></div>
    <!-- <button @click="updateData">更新数据</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
import { defaultConfig } from "../echarts/StudentMessage";
import sutd from "../echarts/sutd.json";

const prop = defineProps({
  dataInput: Array<Number>,
});

watch(prop, () => {
  updateData();
});
function transformArrayToObjects(
  data: number[]
): { value: number; itemStyle: { color: string } }[] {
  // 定义颜色数组
  const colors = [
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

  // 遍历数组并返回转换后的结果
  return data.map((value, index) => ({
    value, // 数组元素作为 value
    itemStyle: {
      color: colors[index], // 根据索引选择颜色
    },
  }));
}
const main = ref<HTMLElement | null>();
let temp: any = null;
const option = ref<any>();
const updateData = () => {
  if (prop.dataInput === undefined) return;
  option.value = defaultConfig(prop.dataInput);
  temp.setOption(option.value);
};
const loadTable = () => {
  echarts.registerTheme("sutd", sutd);
  temp = echarts.init(main.value, "sutd");
  option.value = defaultConfig([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  if (temp) {
    temp.setOption(option.value);
  }
};
onMounted(() => {
  loadTable();
});
</script>

<style scoped></style>
