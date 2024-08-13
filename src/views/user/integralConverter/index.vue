<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getUserPoints } from "@/api/user";
const router = useRouter();
const myPoints = ref([]);
const sum = ref(0);
const getPoints = async () => {
  const { data } = await getUserPoints();
  myPoints.value = data.score;
  sum.value = data.sum;
};
getPoints();
const data = ref(["学习成绩", "获奖荣誉", "志愿公益", "文体活动", "生活日常"]);
</script>
<template>
  <van-nav-bar
    title="我的活跃积分统计"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <div class="main">
    <div class="sum">已获学分:{{ sum }}</div>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in myPoints"
        :key="index"
        :title="data[index]"
        :value="item"
      >
        <template #value> 共 {{ item }}.00 </template>
      </van-cell>
    </van-cell-group>
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
</style>
