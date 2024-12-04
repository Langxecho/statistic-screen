<template>
  <div class="header">
    <div class="header-title relative">
      <v-select
        v-model="quizName"
        class="w-200px z-20 items-center absolute z-10 left-[43%]"
        variant="underlined"
        label="请选择"
        :items="convertQuizList(quizList)"
      ></v-select>
    </div>
  </div>
  <div class="wrapper">
    <div class="content" style="">
      <div class="mt-12px w-[30%] mr-20px">
        <div
          class="xpanel-wrapper xpanel-wrapper-25 h-[98%] mt-12px w-[100%] ml-2"
        >
          <div class="xpanel xpanel-c-b">
            <div class="title title-long">考核信息{{}}</div>
            <div class="text-blue-300">
              <div class="text-xl mt-5 flex items-center flex-col">
                <div class="text-2xl mb-1">倒计时</div>
                <timer class="ml-4" :quiz="quiz" />
                <div class="mt-40px text-2xl">江苏省省中一集考试</div>
                <div class="mt-20px mb-20px text-md">
                  考核状态：{{ getQuizStatus }}
                </div>

                <!-- 考试详情 -->
                <div class="text-md pl-4 pr-4 w-full">
                  <div class="flex justify-between mb-4">
                    <span>{{ quizInfo[pointer].title }}</span>
                    <span>{{ quizInfo[pointer].details }}</span>
                  </div>
                  <v-carousel
                    :show-arrows="false"
                    height="120"
                    progress="primary"
                    hide-delimiters
                    cycle
                    v-model="pointer"
                  >
                    <v-carousel-item v-for="(item, index) in quizInfo">
                      <div class="flex justify-between mt-24px">
                        <div class="flex items-center flex-col text-md">
                          <div>单选</div>
                          <div class="text-md">
                            {{ item.theme[0].details }}
                          </div>
                        </div>
                        <div class="flex items-center flex-col text-md">
                          <div>多选</div>
                          <div>{{ item.theme[1].details }}</div>
                        </div>
                        <div class="flex items-center flex-col text-md">
                          <div>填空</div>
                          <div>{{ item.theme[2].details }}</div>
                        </div>
                      </div>
                    </v-carousel-item>
                  </v-carousel>
                </div>
                <!-- 大空位 -->
                <img src="../assets/cat.gif" class="w-420px h-185px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-r">
        <div class="xpanel-wrapper xpanel-wrapper-45 h-[96%] mt-26px">
          <div class="xpanel xpanel-r-b">
            <div class="title">学员信息</div>
            <student-table :data-input="dataMessage" />
            <student-message :data-input="dataMessage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "../assets/css/app.css";
import Timer from "./statistic/Timer.vue";
import StudentTable from "./StudentTable.vue";
import StudentMessage from "./StudentMessage.vue";

import { findQuizByName, convertQuizList } from "../utils/convertObject.ts";
import { computed, onMounted, ref, watch } from "vue";
import {
  getNowTimeStatistics,
  getQuizInfo,
  getQuizMessage,
} from "../api/myApi.ts";
//考试数据列表
const quizList = ref();
//选中的考试数据名字
const quizName = ref();
//选中考试的所有信息
const quiz = ref();
//选中考试的id
const quizId = ref(-1);
//测试窗口
setInterval(() => {
  // console.log(findQuizByName(quiz.value, quizList.value));
  // console.log(quiz.value);
  // console.log(quizInfo.value);
  // console.log(dataMessage.value);
}, 1000);

//考试数据模块
//当前轮播图是第几个的指针
const pointer = ref(0);
//获取模块的数据
interface InnerThemeItem {
  details: string;
  theme: string | null;
  title: string;
}

interface OuterThemeItem {
  details: string;
  theme: InnerThemeItem[]; // 这是嵌套的数组，包含多个 InnerThemeItem 对象
  title: string;
}
const quizInfo = ref<OuterThemeItem[]>([
  {
    details: "----",
    theme: [
      {
        details: "----",
        theme: "----",
        title: "----",
      },
      {
        details: "----",
        theme: "----",
        title: "----",
      },
      {
        details: "----",
        theme: "----",
        title: "----",
      },
    ],
    title: "----",
  },
]);

//获取考试详细数据
const getQuizInfoData = async () => {
  if (quiz.value === undefined) return;
  getQuizInfo(quiz.value.pkId).then((res: any) => {
    quizInfo.value = res;
  });
};

//获取学员信息参数
//获取学员信息数组
const dataMessage = ref();
const getStudentData = async () => {
  if (quiz.value === undefined) return;
  const dataSource = await getNowTimeStatistics(quiz.value.pkId);
  dataMessage.value = Object.values(dataSource);
  // dataMessage.value = [4,2,5,6,9,8,5,6,3,1]
};

watch(quizName, async () => {
  quiz.value = findQuizByName(quizName.value, quizList.value);
  quizId.value = quiz.value.pkId;
  await getQuizInfoData();
  await getStudentData();
  // console.log(quizInfo.value, "------------------------");
});
//判断当前考试状态
const getQuizStatus = computed(() => {
  if (quiz.value === undefined) return "未选择考核";
  const status = quiz.value.status;
  if (status === 0) return "预热中";
  else if (status === 1) return "进行中";
  else if (status === 2) return "已结束";
  else return "未选择考核";
});
//onMounted
onMounted(async () => {
  quizList.value = await getQuizMessage();
  await getQuizInfoData();
  await getStudentData();
  // setInterval(async () => {
  //   console.log(quizList.value, "------------------------");
  // }, 1000);
});
</script>

<style scoped></style>
