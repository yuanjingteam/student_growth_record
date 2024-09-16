<script setup>
import { useRouter } from "vue-router";
const router = new useRouter();
</script>
<template>
  <van-nav-bar
    left-text="返回"
    title="关于我们"
    left-arrow
    @click-left="router.push('/user')"
  />
  <van-cell title="问卷调查" is-link />
  <van-cell title="意见反馈" is-link @click="router.push('./feedBack')" />
  <van-cell title="版本号" value="v1.0.0" />
</template>
