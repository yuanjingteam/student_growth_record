<script setup>
import { reactive } from "vue";

const data = reactive({
  messCount: ""
});
</script>
<template>
  <!-- 文章自述 -->
  <van-cell-group inset>
    <van-field v-model="messCount" label="文本" placeholder="请输入用户名" />
  </van-cell-group>
</template>
