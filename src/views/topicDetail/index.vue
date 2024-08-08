<script setup>
import { useRoute, useRouter } from "vue-router";
import { useTopicStore } from "@/store";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();
const useTopic = useTopicStore();
const list = ref([
  {
    id: "hot",
    name: "最热",
    title: "最热"
  },
  {
    id: "new",
    name: "最新",
    title: "最新"
  }
]);

const activeName = ref("最热");

//获取动态路由的参数
const topicId = route.params.id;
//声明当前话题
const topic = ref({});
topic.value = useTopic.findTopic(topicId);

//控制列表加载状态的显示和隐藏
const loading = ref(false);
//绑定了 finished 变量，用于标记是否加载完成
const finished = ref(false);
//控制刷新状态的显示和隐藏
const refreshing = ref(false);

//当用户滚动到底部时会触发加载更多数据的事件
const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

//监听了刷新事件
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
const onSearch = id => {
  console.log(id);
};

const articleData = ref({
  article_collect_sum: 998,
  article_comment_sum: 0,
  article_content: {
    article_image: "Navic",
    article_text: "17KJyF0uOM",
    article_video: "Secur",
    article_id: 1,
    article_like_sum: 685,
    article_post_time: "6980天前",
    topic_id: "If th",
    user_class: "计科222",
    user_image: "nUYfgNlhhp",
    username: "韩韩韩"
  }
});
</script>
<template>
  <van-nav-bar left-arrow @click-left="router.go(-1)">
    <template #right>
      <van-icon name="ellipsis" />
    </template>
  </van-nav-bar>
  <div class="title-box">
    <div class="title" style="display: flex">
      <i-icon icon="icon-park:message" />
      <p>{{ topic.topic_name }}专题</p>
    </div>
    <p class="title-content">{{ topic.topic_content }}</p>
  </div>

  <van-tabs
    v-model:active="activeName"
    shrink
    background="#f0f1f5"
    color="#041833"
  >
    <van-tab v-for="item in list" :key="item.id" :title="item.title">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <post-more :data="articleData" />
          <post-more :data="articleData" />
          <post-more :data="articleData" />
        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>
<style scoped>
.van-nav-bar {
  padding: 5px 0;
  --van-nav-bar-arrow-size: 20px;
  --van-nav-bar-background: #f0f1f5;
  .van-icon {
    font-size: 20px;
  }
}

.title-box {
  padding: 15px;
  background-color: #f0f1f5;
  .i-icon {
    font-size: 20px;
    margin-right: 10px;
  }
  .title {
    p {
      font-size: 16px;
    }
  }
  .title-content {
    position: relative;
    margin-top: 10px;
    font-size: 13px;
    color: rgba(166, 168, 173, 1);
    line-height: 25px;
  }
  .title-content::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -15px;
    width: 100%;
    height: 1px;
    background-color: rgba(166, 168, 173, 0.4);
  }
}

.van-list {
  background-color: #f0f1f5;
  overflow: hidden;
}
</style>
