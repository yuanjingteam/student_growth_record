<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
const router = useRouter();
const userStore = useUserStore();
const role = userStore.role;
const username = userStore.username;

// 当前页面默认渲染的数据
const base = reactive([
  {
    userImg:
      "https://student-grow.oss-cn-beijing.aliyuncs.com/image/system.png",
    userName: "系统通知"
  },
  {
    userImg:
      "https://student-grow.oss-cn-beijing.aliyuncs.com/image/manager.png",
    userName: "管理员消息"
  },
  {
    userImg:
      "https://student-grow.oss-cn-beijing.aliyuncs.com/image/user_1.png",
    userName: "互动消息"
  },
  {
    userImg:
      "https://student-grow.oss-cn-beijing.aliyuncs.com/image/emaill.png",
    userName: "举报邮箱"
  }
]);
</script>

<template>
  <to-login v-if="username === 'passenger'" />
  <div v-else>
    <van-nav-bar title="通知" @click-left="router.push('/home')" />
    <div class="main">
      <!-- 系统通知 -->
      <system-info :base="base[0]" />
      <!-- 管理员通知 -->
      <manager-info :base="base[1]" />
      <!-- 用户通知 -->
      <inter-info :base="base[2]" />

      <!-- 举报邮箱 -->
      <div v-if="role === 'user'" />
      <perm-notice v-else :base="base[3]" />

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
  </div>
</template>
<style scoped>
.main {
  position: relative;
  height: 88vh;
  overflow: hidden;
  background-color: #fff;
}
.svg-bg-container {
  position: absolute;
  width: 100%;
  height: 200px;
  /* 设置容器高度 */
}

.svg-bg {
  position: absolute;
  top: 130px;
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
