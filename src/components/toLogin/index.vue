<script setup>
import { ref } from "vue";
const show = ref(true);
</script>
<template>
  <!-- 底部弹出 -->
  <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }">
    disfjawf
  </van-popup>
</template>
<style scoped></style>
