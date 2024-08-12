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
  if_ban: false,
  user_headshot: "http://dummyimage.com/180x150",
  name: "马强",
  username: "2555",
  user_class: "计科222",
  tag_name: "考研复习",
  post_time: "2天前",
  article_content: {
    article_image: "http://dummyimage.com/120x90",
    article_text:
      "西切议已以利活之采克究件称。照别大定适角众然理般全权世活实合价。空按多层务除等做向取而强整相战规利。七米律族报设流形为定质明江年。美且情实程白且这王队走平织。西相规过眼式等合好亲向速广市办。多六白东战价程响满条内水验近要土。",
    article_video: 79
  },
  article_like_sum: 72,
  article_collect_sum: 46,
  article_comment_sum: 75,
  if_like: true,
  if_collect: true
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
