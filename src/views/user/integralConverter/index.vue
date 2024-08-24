<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getUserPoints } from "@/api/user";
import { showToast } from "vant";
const router = useRouter();
const myPoints = ref({
  study_point: 0,
  honor_point: 0,
  work_point: 0,
  social_point: 0,
  volunteer_point: 0,
  sport_point: 0,
  life_point: 0
});
console.log(myPoints.value);

const sum = computed(() => {
  let total = 0;
  total =
    myPoints.value.study_point * 0.25 +
    (myPoints.value.honor_point + myPoints.value.work_point) * 0.2 +
    (myPoints.value.social_point +
      myPoints.value.volunteer_point +
      myPoints.value.sport_point) *
      0.1 +
    myPoints.value.life_point * 0.05;
  return Number(total.toFixed(2)); // 保留小数点后两位
});
const getPoints = async () => {
  try {
    const { data } = await getUserPoints();
    myPoints.value = data;
  } catch (error) {
    console.error("获取用户积分失败:", error);
    showToast("获取用户积分失败");
  }
};
const show = ref(false);

const images = [
  "https://student-grow.oss-cn-beijing.aliyuncs.com/image/rules.png"
];
const onChange = () => {
  show.value = true;
};
const formatter = value => {
  // 去掉开头的 0
  if (value.startsWith("0") && value.length > 1) {
    return value.slice(1);
  }
  return value;
};

getPoints();
</script>
<template>
  <van-image-preview v-model:show="show" :images="images" />

  <van-nav-bar
    title="我的活跃积分统计"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <div class="main">
    <div class="sum">已获学分:{{ sum }}</div>
    <van-cell-group>
      <van-cell center title="学习成绩">
        <van-field
          v-model="myPoints.study_point"
          type="number"
          input-align="right"
          :formatter="formatter"
          autocomplete="off"
        />
      </van-cell>
      <van-cell title="获奖荣誉">
        <van-field
          v-model="myPoints.honor_point"
          type="number"
          input-align="right"
          :formatter="formatter"
          autocomplete="off"
        />
      </van-cell>
      <van-cell title="工作履历">
        <van-field
          v-model="myPoints.work_point"
          type="number"
          input-align="right"
          :formatter="formatter"
          autocomplete="off"
        />
      </van-cell>
      <van-cell title="社会实践">
        <van-field
          v-model="myPoints.social_point"
          type="number"
          input-align="right"
          :formatter="formatter"
          autocomplete="off"
      /></van-cell>
      <van-cell title="志愿公益">
        <van-field
          v-model="myPoints.volunteer_point"
          type="number"
          input-align="right"
          :formatter="formatter"
          autocomplete="off"
      /></van-cell>
      <van-cell title="文体活动">
        <van-field
          v-model="myPoints.sport_point"
          type="number"
          input-align="right"
          :formatter="formatter"
          autocomplete="off"
      /></van-cell>
      <van-cell title="生活日常">
        <van-field
          v-model="myPoints.life_point"
          type="number"
          input-align="right"
          :formatter="formatter"
          autocomplete="off"
        />
      </van-cell>
    </van-cell-group>
    <div class="rules">
      规则：页面初始值是当前用户获取的实际分数，可以通过模拟修改后面各选项的值来推算能获取的总学分数
      <van-image
        width="100%"
        height="100%"
        src="https://student-grow.oss-cn-beijing.aliyuncs.com/image/rules.png"
        @click="onChange"
      />
    </div>
  </div>
</template>
<style scoped>
.sum {
  font-size: 30px;
  text-align: center;
}
.van-cell {
  font-size: 16px;
  font-weight: 600;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.rules {
  font-size: 14px;
  margin: 10px 10px 0;
}
</style>
