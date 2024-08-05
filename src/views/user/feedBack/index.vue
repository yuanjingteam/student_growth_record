<script setup>
import { useRouter } from "vue-router";

const router = new useRouter();
</script>
<template>
  <van-nav-bar left-text="返回" left-arrow @click-left="router.push('/user')" />
  意见反馈
</template>
