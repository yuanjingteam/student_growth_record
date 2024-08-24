<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import lottie from "lottie-web"; //引入动效库
import like from "@/assets/json/like.json"; //引入下载的动效json
const animation1 = ref(null); //获取dom

const router = useRouter();
const triger = () => {
  //在这个生命周期渲染
  lottie.loadAnimation({
    container: animation1.value, //选择渲染dom
    renderer: "svg", //渲染格式
    loop: false, //循环播放
    autoplay: true, //是否i自动播放,
    animationData: like //渲染动效json
  });
};
onMounted(() => {});
</script>
<template>
  <van-nav-bar
    title="用户协议"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <p>用户协议内容</p>
  <div ref="animation1" class="aa" @click="triger" />
</template>
<style>
.aa {
  width: 50px;
  height: 50px;
}
</style>
