<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const show = ref(true);
const router = useRouter();
</script>
<template>
  <!-- 底部弹出 -->
  <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }">
    <van-nav-bar @click-left="router.go(-1)">
      <template #left>
        <i-icon icon="material-symbols:close" />
      </template>
    </van-nav-bar>
    <div class="main">
      还没有登录哦~
      <van-button type="primary" @click="router.push('/login')"
        >去登录</van-button
      >
    </div>
  </van-popup>
</template>
<style scoped>
.main {
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
