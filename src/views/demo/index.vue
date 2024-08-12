<script setup lang="ts" name="Demo">
import { onMounted, reactive } from "vue";
import { ref } from "vue";
import { showToast } from "vant";
import CellCard from "@/components/CellCard/index.vue";
import { getRegisterDay } from "@/api/topic";

import { getArticlesService, searchArticleService } from "@/api/article";
import { useTopicStore, useUserStore } from "@/store";
// const data = { article_id: '1' }
// const res = await getArticlesService(data)
// console.log(res);

const userStore = useUserStore();
const topicStore = useTopicStore();
//分类标签tabber栏
const topicList = ref([]);
//更新仓库数据
topicStore.getTopicList();
topicList.value = topicStore.topicList;
//搜索框输入内容
const inputValue = ref("");
//存储当前用户账号
const username = ref("");
//获取当前用户id
// username.value = userStore.username;
//控制tab栏显示
const activeName = ref("全部");
//初始化记录注册天数
const registerTime = ref("");
//搜索框数据
const searchData = reactive({
  key_word: "",
  topic_id: "",
  article_sort: "new",
  article_count: "5"
});

//获取注册天数
const registerDay = async () => {
  const { data } = await getRegisterDay({ username: username });
  registerTime.value = data.plus_time;
};
registerDay();

//搜索框事件
const onClickButton = async () => {
  const topicId = topicStore.findTopicId(activeName.value);
  searchData.key_word = inputValue.value;
  searchData.topic_id = topicId;
  const {
    data: { content }
  } = await searchArticleService(searchData);
  list.value = content;
};

const list = ref([]);
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
</script>
<template>
  <div class="topShow">
    <p class="title">我的大学生活</p>
    <span>
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
    @search="onSearch(1)"
  >
    <template #action>
      <van-button
        type="primary"
        size="small"
        color="#004ff7"
        round
        @click="onClickButton"
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
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <cell-card
            v-for="item in list"
            :key="item.article_id"
            :articleList="list"
            @click="console.log(1)"
          />
        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
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
</style>
