<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <van-nav-bar
    title="用户协议"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <p>用户协议内容</p>
</template>
