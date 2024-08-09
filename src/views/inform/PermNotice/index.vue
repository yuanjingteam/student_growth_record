<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useInformation } from "@/store";
const router = useRouter();
const userInfo = useInformation();
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const result = ref([]);

const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }

  const res = userInfo.email;

  result.value = res.article_ban;

  list.value = [...list.value, ...result.value];

  loading.value = false;

  // 数据全部加载完成
  if (list.value.length >= 5) {
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
      dawd
    </van-list>
  </van-pull-refresh>
</template>
