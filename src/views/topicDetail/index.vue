<script setup>
import { useRoute, useRouter } from "vue-router";
import { useTopicStore, useUserStore } from "@/store";
import { reactive, ref, watch } from "vue";
import { searchArticleService } from "@/api/article";
const route = useRoute();
const router = useRouter();
const useTopic = useTopicStore();
const userStore = useUserStore();
const roleList = ref([
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
const topic = ref();
const topicList = useTopic.topicList;

const findTopic = topicId => {
  const topic = topicList.find(topic => topic.ID == topicId);
  return topic ? topic : null;
};
topic.value = findTopic(topicId);

//获取文章列表的数据
const articleData = reactive({
  key_word: "",
  topic_name: topic.value.topic_name,
  article_sort: "hot",
  article_count: 8,
  article_page: 0,
  username: userStore.username
});
//声明存储文章列表
const articleList = ref([]);
//获取文章列表
const getArticleList = async () => {
  const {
    data: { content }
  } = await searchArticleService(articleData);
  articleList.value = content;
};
//监听切换排序方式
watch(activeName, (newValue, oldValue) => {
  articleData.article_page = 1;
  if (newValue == "最热") {
    newValue = "hot";
  } else {
    newValue = "new";
  }
  articleData.article_sort = newValue;
  getArticleList();
});

//控制列表加载状态的显示和隐藏
const loading = ref(false);
//绑定了 finished 变量，用于标记是否加载完成
const finished = ref(false);
//控制刷新状态的显示和隐藏
const refreshing = ref(false);

//当用户滚动到底部时会触发加载更多数据的事件
const onLoad = async () => {
  if (refreshing.value) {
    articleData.article_page = 0;
    articleList.value = [];
    refreshing.value = false;
  }
  articleData.article_page += 1;
  const res = await searchArticleService(articleData);
  if (res.code == 200) {
    loading.value = false;
    articleList.value = [...articleList.value, ...res.data.content];
  } else {
    finished.value = true;
  }
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
</script>
<template>
  <van-nav-bar left-arrow @click-left="router.go(-1)">
    <template #right>
      <van-icon name="ellipsis" />
    </template>
  </van-nav-bar>
  <div class="title-box">
    <van-button
      class="publish"
      round
      icon="plus"
      type="primary"
      @click="router.push('/publish')"
    />
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
    <van-tab
      v-for="item in roleList"
      :key="item.id"
      :title="item.title"
      :name="item.name"
    >
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <post-more
            v-for="(item, index) in articleList"
            :key="index"
            :post="item"
            :articleId="item.article_id"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
  <van-back-top bottom="100px" />
</template>
<style scoped>
.publish {
  position: absolute;
  right: 18px;
  height: 48px;
}
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
