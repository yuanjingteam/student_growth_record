<script setup>
import { ref } from "vue";
const anchors = [Math.round(0.8 * window.innerHeight)];
const height = ref(anchors[0]);
</script>
<template>
  <van-image
    width="10rem"
    height="10rem"
    fit="contain"
    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
  />
  <div class="userImg">
    <van-uploader>
      <van-image
        round
        width="10rem"
        height="10rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </van-uploader>
  </div>

  <van-floating-panel v-model:height="height" :anchors="anchors">
    <div style="text-align: center; padding: 15px">
      <p>面板显示高度 {{ height.toFixed(0) }} px</p>
    </div>
    <template #header> dada </template>
  </van-floating-panel>
</template>

<style scoped>
.userImg {
  position: absolute;
}
</style>
