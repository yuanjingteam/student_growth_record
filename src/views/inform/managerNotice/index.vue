<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/store";
import { getManagerNotification } from "@/api/user";
const router = useRouter();
const userStore = useUserStore;
const username = userStore.username;

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

// 初始化页面数据
const list = ref([]);
const page = ref(0);

// 获取管理员消息
const loadData = async () => {
  try {
    const { data } = await getManagerNotification({
      username: username,
      page: page.value++,
      limit: 10
    });
    list.value = [...list.value, ...data.manager_info];
  } catch (error) {
    console.error("获取管理员通知列表失败:", error);
    finished.value = true;
  }
};

const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    page.value = 0;
    refreshing.value = false;
  }
  await loadData();
  console.log(page.value, 31313);

  loading.value = false;
};

// 刷新列表
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>
<template>
  <van-nav-bar
    title="管理员通知"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <manage-item v-for="(item, index) in list" :key="index" :data="item" />
    </van-list>
  </van-pull-refresh>
</template>
<style scoped>
.main {
  background-color: #f0f1f5;
  height: 100%;
}
</style>
