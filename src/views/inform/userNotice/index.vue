<script setup>
import { ref } from "vue";
import { getUserNotification } from "@/api/user";

import { useCounterStoreHook } from "@/store/modules/useConter";
import { useRouter } from "vue-router";

// 路由
const router = useRouter();

// 调用 useCounterStoreHook 函数,获取 Pinia 中的 useCounterStore 实例
const userStore = useCounterStoreHook();
const userId = userStore.userId;

// 获取到的列表
const list = ref([]);

// 加载动画
const loading = ref(false);

// 加载完成
const finished = ref(false);

// 重新刷新页面
const refreshing = ref(false);

// 页面数据
const data = ref({
  thumbsUp: [],
  comments: [],
  star: []
});

const icon = [
  "ph:thumbs-up-duotone",
  "icon-park-outline:comment",
  "tabler:star"
];
const state = ["点赞了你的文章", "评论了你的文章", "收藏了你的文章"];

// 首先获取渲染页面数据
const userNotification = async () => {
  // 将获取到的页面数据放到点赞列表中
};

// 下拉
// 点赞下拉刷新
const onLoadThum = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求

  // 如果重新刷新了页面,清空list
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }

  const { data } = await getUserNotification({
    userId: userId
  });
  list.value = data.thumbsUp;

  for (let i = 0; i < 10; i++) {
    // list.value.push();
  }

  // 加载状态结束
  loading.value = false;

  // 只显示最近的40条数据
  if (list.value.length >= 1) {
    finished.value = true;
  }
};

// 刷新点赞列表
const onRefreshThum = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoadThum();
};
</script>
<template>
  <van-tabs v-model:active="active">
    <van-tab title="点赞">
      <!-- 刷新,获取到最新数据 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefreshThum">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoadThum"
        >
          <info-item
            v-for="(item, index) in list"
            :key="index"
            :data="item"
            :icon="icon[0]"
            :state="state[0]"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
    <van-tab title="评论">
      <van-pull-refresh v-model="refreshing" @refresh="onRefreshThum">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoadThum"
        >
          <info-item
            v-for="(item, index) in list"
            :key="index"
            :data="item"
            :icon="icon[1]"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
    <van-tab title="收藏">
      <van-pull-refresh v-model="refreshing" @refresh="onRefreshThum">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoadThum"
        >
          <info-item
            v-for="(item, index) in list"
            :key="index"
            :data="item"
            :icon="icon[2]"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>
