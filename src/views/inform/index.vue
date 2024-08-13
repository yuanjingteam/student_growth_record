<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

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
  },
  {
    userImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    userName: "举报邮箱"
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
  <div class="main">
    <!-- 系统通知 -->
    <system-info :base="base[0]" />
    <!-- 管理员通知 -->
    <manager-info :base="base[1]" />
    <!-- 用户通知 -->
    <inter-info :base="base[2]" />

    <!-- 举报邮箱 -->
    <perm-notice :base="base[3]" />
  </div>

  <!-- 发布文章按钮 -->
  <article-add />
</template>
<style scoped>
.main {
  height: 82vh;
  overflow: hidden;
}
</style>
