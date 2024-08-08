<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 设置当前页面子组件发布文章按钮的位置
const offset = ref({ x: 355, y: 700 });

// 当前页面默认渲染的数据
const base = reactive([
  {
    userImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    userName: "系统通知"
  },
  {
    userImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    userName: "管理员消息"
  },
  {
    userImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    userName: "互动消息"
  }
]);
</script>

<template>
  <van-nav-bar
    title="通知"
    left-text="返回"
    left-arrow
    @click-left="router.push('/home')"
  />
  <!-- 系统通知 -->
  <system-info :base="base[0]" />
  <!-- 管理员通知 -->
  <manager-info :base="base[1]" />
  <!-- 用户通知 -->
  <inter-info :base="base[2]" />

  <!-- 发布文章按钮 -->
  <article-add :offset="offset" />
</template>
<style scoped></style>
