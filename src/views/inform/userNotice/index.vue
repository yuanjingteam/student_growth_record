<script setup>
import { ref } from "vue";
import {
  getUserThumNotification,
  getUserComNotification,
  getUserStarNotification
} from "@/api/user";

import { useCounterStoreHook } from "@/store/modules/useConter";
import { useRouter } from "vue-router";

// 路由
const router = useRouter();

// 调用 useCounterStoreHook 函数,获取 Pinia 中的 useCounterStore 实例
const userStore = useCounterStoreHook();
const userId = userStore.userId;

// 获取到的列表
// 点赞
const thumbList = ref([]);

// 评论
const comList = ref([]);

// 收藏
const starList = ref([]);

// 哪一栏
const active = ref(0);

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

const onClickTab = active => {
  // 切换清空列表
  onLoad();
};

// 下拉
// 点赞下拉刷新
const onLoad = async () => {
  // 异步更新数据
  // 如果重新刷新了页面,清空list
  if (refreshing.value) {
    if (active.value == 0) {
      thumbList.value = [];
    } else if (active.value == 1) {
      comList.value = [];
    } else if (active.value == 2) {
      starList.value = [];
    }
    refreshing.value = false;
  }
  // 重置刷新的值
  finished.value = false;

  switch (active.value) {
    case 0:
      if (thumbList.value.length >= 20) {
        return;
      }
      const data1 = await getUserThumNotification({
        username: userId
      });

      thumbList.value = [...thumbList.value, ...data1.data.thumbsUp];

      // 加载状态结束
      loading.value = false;

      // 只显示最近的40条数据
      if (thumbList.value.length >= 20) {
        finished.value = true;
      }
      break;
    case 1:
      // 有就不重复请求了
      if (comList.value.length >= 20) {
        return;
      }
      const data2 = await getUserComNotification({
        username: userId
      });
      comList.value = [...comList.value, ...data2.data.comments];

      // 加载状态结束
      loading.value = false;

      // 只显示最近的40条数据
      if (comList.value.length >= 20) {
        finished.value = true;
      }
      break;
    case 2:
      // 有就不重复请求了
      if (starList.value.length >= 20) {
        return;
      }
      const data3 = await getUserStarNotification({
        username: userId
      });
      starList.value = [...starList.value, ...data3.data.star];

      // 加载状态结束
      loading.value = false;

      // 只显示最近的40条数据
      if (starList.value.length >= 20) {
        finished.value = true;
      }
      break;
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
  <van-nav-bar title="全部消息" left-arrow @click-left="router.go(-1)" />
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab title="点赞">
      <!-- 刷新,获取到最新数据 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <info-item
            v-for="(item, index) in thumbList"
            :key="index"
            :data="item"
            :icon="icon[0]"
            :state="state[0]"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
    <van-tab title="评论">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <info-item
            v-for="(item, index) in comList"
            :key="index"
            :data="item"
            :icon="icon[1]"
            :state="state[1]"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
    <van-tab title="收藏">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <info-item
            v-for="(item, index) in starList"
            :key="index"
            :data="item"
            :icon="icon[2]"
            :state="state[2]"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>
