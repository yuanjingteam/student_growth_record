<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
const router = useRouter();
const userStore = useUserStore();
const role = userStore.role;
console.log(role, 111111);

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
  <van-nav-bar title="通知" @click-left="router.push('/home')" />
  <div class="main">
    <!-- 系统通知 -->
    <system-info :base="base[0]" />
    <!-- 管理员通知 -->
    <manager-info :base="base[1]" />
    <!-- 用户通知 -->
    <inter-info :base="base[2]" />

    <!-- 举报邮箱 -->
    <perm-notice :base="base[3]" />

    <!-- 管理员发布通知入口 -->
    <manager-publish v-if="role === '1'" />
    <div class="svg-bg-container">
      <div class="svg-bg">
        <img src="../../icons/svg/planet_3.svg" alt="SVG 背景图" />
      </div>
    </div>
    <div class="svg-bg-container">
      <div class="svg-bg">
        <img src="../../icons/svg/person_2.svg" alt="SVG 背景图" />
      </div>
    </div>
  </div>

  <!-- 发布文章按钮 -->
  <!-- <article-add /> -->
</template>
<style scoped>
.main {
  position: relative;
  height: 88vh;
  overflow: hidden;
}
.svg-bg-container {
  position: absolute;
  width: 100%;
  height: 200px; /* 设置容器高度 */
}

.svg-bg {
  position: absolute;
  top: 200px;
  left: 0;
  width: 100%;
  height: 100%;
}

.svg-bg svg,
.svg-bg img,
.svg-bg object {
  width: 120%;
  height: 125%;
  object-fit: contain; /* 确保图像不会失真 */
}
</style>
