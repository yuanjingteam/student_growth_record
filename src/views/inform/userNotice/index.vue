<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useInformation } from "@/store";
import {
  getUserThumNotification,
  getUserComNotification,
  getUserStarNotification
} from "@/api/user";
// 路由
const router = useRouter();
const useInfor = useInformation();
// 调用 useUserStore 函数,获取 Pinia 中的 useCounterStore 实例

// 哪一栏
const active = ref(0);

const page1 = ref(1);
const page2 = ref(1);
const page3 = ref(1);
// 获取到的列表
// 点赞
const thumbList = ref([]);

// 评论
const comList = ref([]);

// 收藏
const starList = ref([]);

// 加载动画
const loading = ref(false);

// 加载完成
const finished = ref(false);

// 重新刷新页面
const refreshing = ref(false);

const icon = [
  "ph:thumbs-up-duotone",
  "icon-park-outline:comment",
  "tabler:star"
];

const state = [
  "点赞了你的文章",
  "点赞了你的评论",
  "评论了你的文章",
  "回复了你的评论",
  "收藏了你的文章",
  "收藏了你的评论"
];
onMounted(() => {
  // 在组件挂载时,设置 active 为 activeTab
  active.value = useInfor.activeTab;
});

const onClickTab = () => {
  if (active.value === 0 && thumbList.value.length === 0) {
    finished.value = false;
  } else if (active.value === 1 && comList.value.length === 0) {
    finished.value = false;
    // 更新 activeTab 的值
  } else if (active.value === 2 && starList.value.length === 0) {
    finished.value = false;
  }
  useInfor.activeTab = active;
};

// 获取点赞列表
const loadData1 = async () => {
  try {
    const { data, msg, code } = await getUserThumNotification({
      page: page1.value++,
      limit: 10
    });
    thumbList.value = [...thumbList.value, ...data.thumbsUp];
    if (data.thumbsUp.length == 0) {
      finished.value = true;
    }
  } catch {
    finished.value = true;
  }
};
// 获取评论列表
const loadData2 = async () => {
  try {
    const { data, msg, code } = await getUserComNotification({
      page: page2.value++,
      limit: 10
    });
    comList.value = [...comList.value, ...data.comments];
    if (data.comments.length == 0) {
      finished.value = true;
    }
  } catch {
    finished.value = true;
  }
};

// 获取收藏列表
const loadData3 = async () => {
  try {
    const { data, msg, code } = await getUserStarNotification({
      page: page3.value++,
      limit: 10
    });
    starList.value = [...starList.value, ...data.star];
    if (data.star.length == 0) {
      finished.value = true;
    }
  } catch {
    finished.value = true;
  }
};
// 下拉
// 点赞下拉刷新
const onLoad = async () => {
  // 异步更新数据
  // 如果重新刷新了页面,清空list
  if (refreshing.value) {
    if (active.value == 0) {
      thumbList.value = [];
      page1.value = 1;
    } else if (active.value == 1) {
      comList.value = [];
      page2.value = 1;
    } else if (active.value == 2) {
      starList.value = [];
      page3.value = 1;
    }
    refreshing.value = false;
  }
  // 重置刷新的值
  switch (active.value) {
    case 0:
      await loadData1();
      console.log(page1.value, 31313);
      // 加载状态结束
      loading.value = false;
      break;
    case 1:
      await loadData2();
      console.log(page2.value, 31313);
      // 加载状态结束
      loading.value = false;
      break;
    case 2:
      await loadData3();
      console.log(page3.value, 31313);
      // 加载状态结束
      loading.value = false;
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
loadData1();
loadData2();
loadData3();
</script>
<template>
  <!-- <van-empty
    v-if="!finished && thumbList.length === 0"
    style="width: 100%; height: 100%"
  >
    <template #image>
      <video autoplay loop muted>
        <source src="../../../icons/car.mp4" type="video/mp4" />
      </video>
    </template>
    <template #description> 页面努力加载中... </template>
  </van-empty> -->
  <div>
    <van-nav-bar title="全部消息" left-arrow @click-left="router.go(-1)" />
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="点赞">
        <van-pull-refresh
          v-model="refreshing"
          style="min-height: 100vh"
          @refresh="onRefresh"
        >
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
              :type="active"
              :icon="icon[0]"
              :state1="state[0]"
              :state2="state[1]"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="评论">
        <van-pull-refresh
          v-model="refreshing"
          style="min-height: 100vh"
          @refresh="onRefresh"
        >
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
              :type="active"
              :icon="icon[1]"
              :state1="state[2]"
              :state2="state[3]"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="收藏">
        <van-pull-refresh
          v-model="refreshing"
          style="min-height: 100vh"
          @refresh="onRefresh"
        >
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
              :type="active"
              :icon="icon[2]"
              :state1="state[4]"
              :state2="state[5]"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
