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
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="120"
        description="登录后使用,请先登录用户"
      >
        <van-button type="primary" @click="router.push('/login')"
          >去登录</van-button
        >
      </van-empty>
    </div>
  </van-popup>
</template>
<style scoped>
.main {
  display: flex;
  height: 600px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.i-icon {
  width: 25px;
  height: 25px;
}
</style>
