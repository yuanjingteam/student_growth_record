<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getSystemNotification } from "@/api/user";
const router = useRouter();
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

// 初始化页面数据
const page = ref(1);
const list = ref([]);

// 获取系统消息
const loadData = async () => {
  try {
    const { data } = await getSystemNotification({
      page: page.value++,
      limit: 10
    });
    list.value = [...list.value, ...data.admin_info];
  } catch (error) {
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
loadData();
</script>
<template>
  <van-empty v-if="!finished" style="width: 100%; height: 100%">
    <template #image>
      <video autoplay loop muted>
        <source src="../../../icons/car.mp4" type="video/mp4" />
      </video>
    </template>
    <template #description> 页面努力加载中... </template>
  </van-empty>
  <div v-else>
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
  </div>
</template>
<style scoped>
.main {
  background-color: #f0f1f5;
  height: 100%;
}
</style>
