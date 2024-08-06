<script setup lang="ts">
// import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  title: {
    type: String
  },
  leftArrow: {
    type: Boolean
  }
});

// const onClickRight = () => {
//   useToggleDarkMode();
// };
</script>

<template>
  <van-nav-bar fixed placeholder :title="title" :left-arrow="leftArrow" @click-left="router.go(-1)">
    <template #right>
      <!-- <svg-icon class="text-[18px]" name="more" /> -->
      <!-- <button class="btn">发布</button> -->
    </template>
  </van-nav-bar>
</template>

<style scoped>
.btn {
  background-color: #004ae9;
  height: 25px;
  width: 45px;
  font-size: 8px;
  color: #fff;
  font-size: 10px;
  border-radius: 15px;
}
</style>
