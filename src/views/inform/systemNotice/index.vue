<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useInformation } from "@/store";
import { getSystemNotification } from "@/api/user";
const router = useRouter();
const userInfo = useInformation();

// 清除未读消息数量
userInfo.system.unread_count = null;

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const result = ref([]);
const res = userInfo.system;
result.value = res.admin_info;

// 从全局状态管理中获取
list.value = [...list.value, ...result.value];

const page = ref(1);
// 获取系统消息
const loadData = async () => {
  const { data } = await getSystemNotification({ page: page.value++ });
  list.value = [...list.value, ...data.admin_info];
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

  // 数据全部加载完成
  if (list.value.length >= 20) {
    finished.value = true;
  }
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
    title="系统通知"
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
      <system-item v-for="(item, index) in list" :key="index" :data="item" />
    </van-list>
  </van-pull-refresh>
</template>
<style scoped>
.main {
  background-color: #f0f1f5;
  height: 100%;
}
</style>
