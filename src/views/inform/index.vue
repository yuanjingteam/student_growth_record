<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { useCounterStoreHook } from "@/store/modules/useConter";

import { getAllNotification } from "@/api/user";

const userStore = useCounterStoreHook();

const router = useRouter();

// 用户id
const userId = userStore.userId;

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

// 从后端获取的数据,给一个默认值
const data = ref({
  systemNotice: {
    count: 0,
    message: "1",
    time: "0"
  },
  adminNotice: {
    count: 0,
    message: "2",
    time: "0"
  },
  userNotice: {
    count: 0,
    message: "3",
    time: "0"
  }
});

const getMessage = async () => {
  const userMessage = await getAllNotification(userId);
  data.value = userMessage.data;
  console.log(data.value, 2222);
};
// 调用加载
getMessage();
</script>

<template>
  <van-nav-bar
    title="通知"
    left-text="返回"
    left-arrow
    @click-left="router.push('/home')"
  />
  <!-- 系统通知 -->
  <inform
    :base="base[0]"
    :data="data.systemNotice"
    @click="router.push('/systemNotice')"
  />
  <!-- 管理员通知 -->
  <inform
    :base="base[1]"
    :data="data.adminNotice"
    @click="router.push('./managerNotice')"
  />
  <!-- 用户通知 -->
  <inform
    :base="base[2]"
    :data="data.userNotice"
    @click="router.push('./userNotice')"
  />

  <!-- 发布文章按钮 -->
  <article-add :offset="offset" />
</template>
<style scoped></style>
