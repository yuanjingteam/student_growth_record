<script setup>
import { onMounted, reactive, ref, toRef } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const offset = ref({ x: 355, y: 700 });
</script>

<template>
  <van-nav-bar
    title="通知"
    left-text="返回"
    left-arrow
    @click-left="router.push('/home')"
  />
  <inform />
  <inform />
  <inform />
  <inform />

  <!-- 发布文章按钮 -->
  <article-add :offset="offset" />
</template>
<style></style>
