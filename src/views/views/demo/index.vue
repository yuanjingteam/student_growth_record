<script setup lang="ts" name="Demo">
import { onMounted, reactive, ref, watch } from "vue";
import CellCard from "@/components/CellCard/index.vue";
import { getRegisterDay } from "@/api/topic";
import { showDialog } from "vant";

import { searchArticleService } from "@/api/article";
import { useTopicStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";

const userStore = useUserStore();
//获取pinia的token
const token = userStore.token;
const topicStore = useTopicStore();
const router = useRouter();

//首页帖子列表
const articleList = ref([]);
//分类标签tabber栏
const topicList = ref([]);
//重新发送请求更新仓库数据
topicStore.getTopicList();
topicList.value = topicStore.topicList;
//搜索框输入内容
const inputValue = ref("");
//获取当前存储的tab
const currentName = localStorage.getItem("currentTabName") || "全部话题";
//控制tab栏显示
const activeName = ref(currentName);
//初始化记录注册天数
const registerTime = ref("");
//搜索框数据
const searchData = reactive({
  key_word: "",
  topic_name: "",
  article_sort: "new",
  article_count: 8,
  article_page: 0,
  username: userStore.username
});

// 防抖函数
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

//获取注册天数
const registerDay = async () => {
  const { data } = await getRegisterDay();
  registerTime.value = data.plus_time;
};
if (token != "") {
  registerDay();
}

//搜索框事件
const onSearch = async () => {
  searchData.article_page = 1;
  searchData.key_word = inputValue.value;
  searchData.topic_name = activeName.value;
  const {
    data: { content }
  } = await searchArticleService(searchData);
  articleList.value = content;
};
onSearch();
// 创建防抖后的搜索函数
const debouncedSearch = debounce(onSearch, 300);

//监听activeName的变化，从而发送请求
watch(activeName, async (newValue, oldValue) => {
  localStorage.setItem("currentTabName", newValue);
  searchData.article_page = 1;
  searchData.key_word = inputValue.value;
  searchData.topic_name = newValue;

  const {
    data: { content }
  } = await searchArticleService(searchData);
  articleList.value = content;
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
    searchData.article_page = 0;
    articleList.value = [];
    refreshing.value = false;
  }
  searchData.key_word = inputValue.value;
  searchData.topic_name = activeName.value;
  searchData.article_page += 1;

  const {
    data: { content }
  } = await searchArticleService(searchData);
  if (content.length > 0) {
    articleList.value = [...articleList.value, ...content];
    loading.value = false;
  } else {
    finished.value = true;
  }
};
const upto = () => {
  if (userStore.username === "passenger") {
    showDialog({ message: "使用该功能要先去登录哦~" });
  } else {
    router.push("/publish");
  }
};
// 监听了刷新事件;
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

//是否展示搜索历史记录
const showHistory = ref(false);
//搜索框获取焦点
const onFocus = () => {
  showHistory.value = true;
};
</script>
<template>
  <van-floating-bubble
    icon="plus"
    axis="lock"
    :style="{ top: '-180px', left: '-5px' }"
    @click="upto"
  />
  <div class="topShow">
    <p class="title">我的大学生活</p>
    <span v-if="token != ''">
      <p>与你相遇の第{{ registerTime }}天</p>
      <i-icon icon="icon-park:read-book" class="text-xl" />
    </span>
  </div>
  <van-search
    v-model="inputValue"
    show-action
    shape="round"
    placeholder="请输入搜索关键词"
    background="#fff"
    class="search"
    @focus="onFocus"
  >
    <template #action>
      <van-button
        type="primary"
        size="small"
        color="#004ff7"
        round
        @click="debouncedSearch"
        >搜索</van-button
      >
    </template>
  </van-search>

  <van-tabs
    v-model:active="activeName"
    background="#f0f1f5"
    color="#041833"
    swipeable
    sticky
  >
    <van-tab
      v-for="item in topicList"
      :key="item.topic_id"
      :title="item.topic_name.slice(0, 2)"
      :name="item.topic_name"
    >
      <van-pull-refresh
        v-if="articleList.length > 0"
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <cell-card
            v-for="item in articleList"
            :key="item.article_id"
            :article="item"
          />
        </van-list>
      </van-pull-refresh>
      <van-empty v-else image="search" description="没有符合该描述的帖子呢" />
    </van-tab>
  </van-tabs>
  <!-- <div v-else class="history">历史记录</div> -->
  <van-back-top bottom="100px" />
</template>

<style scoped>
.topShow {
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

span {
  display: flex;
}

.van-search {
  padding: 0px;
  border-radius: 200px;
  margin: 10px 20px;
}

/* 样式穿透,强制找到子组件 */

.van-search >>> .van-search__content {
  background-color: #fff !important;
  background: #fff;
}

.van-search >>> .van-search__action {
  padding: 0px;
  display: flex;
}

.van-tab__panel,
.van-tab__panel-wrapper {
  background-color: #f0f1f5;
}
.history {
  height: 100%;
  background-color: #fff;
}
</style>
