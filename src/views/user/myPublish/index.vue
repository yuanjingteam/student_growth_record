<script setup>
import { useRouter } from "vue-router";
import { getArticlePublish } from "@/api/user";
import { ref } from "vue";
import { useUserStore } from "@/store";
const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const page = ref(0);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

// 获取我的文章
const loadData = async () => {
  const { data } = await getArticlePublish({
    username: username,
    page: page.value++,
    limit: 10
  });
  list.value = [...list.value, ...data.content];
};
const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    page.value = 0;
    refreshing.value = false;
  }
  await loadData();

  loading.value = false;

  if (list.value.length >= 10) {
    finished.value = true;
  }
};

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
  <div class="main">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="router.push('/user')"
    />
    <div class="my-w">
      <user-info />
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <cell-card v-for="item in list" :key="item" @click="console.log(1)" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
.main {
  background-color: #f0f1f5;
}
.my-w {
  overflow: hidden;
  margin: 0 10px;
}
</style>
