<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="main">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="router.push('/user')"
    />
    <div class="my-w">
      <user-info />
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: #f0f1f5;
  height: 100%;
}
.my-w {
  overflow: hidden;
  height: 100%;
  margin: 0 10.3333vmin;
}
</style>
