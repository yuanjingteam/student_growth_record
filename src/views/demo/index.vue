<script setup lang="ts" name="Demo">
<<<<<<< HEAD
import { onMounted, reactive } from "vue";
import { ref } from "vue";
import { showToast } from "vant";
import CellCard from "@/components/CellCard/index.vue";
import { getArticlesService } from "@/api/article";
import { getRegisterDay } from "@/api/topic";
=======
import { onMounted, reactive, ref } from "vue";
import { showToast } from "vant";
import { getArticlesService } from "@/api/article";
import { getRegisterDay } from "@/api/topic";
import { useTopicStore, useUserStore } from "@/store";
>>>>>>> han
// const data = { article_id: '1' }
// const res = await getArticlesService(data)
// console.log(res);

const userStore = useUserStore();
const topicStore = useTopicStore();
//分类标签tabber栏
<<<<<<< HEAD
const topicList = ref([
  {
    id: "1",
    title: "全部",
    name: "全部"
  },
  {
    id: "2",
    title: "学习",
    name: "学习成绩"
  },
  {
    id: "3",
    title: "奖项",
    name: "c"
  },
  {
    id: "4",
    title: "志愿",
    name: "d"
  },
  {
    id: "5",
    title: "文体",
    name: "e"
  },

  {
    id: "6",
    title: "日常",
    name: "f"
  }
]);
const inputValue = ref("");
//搜索框事件
const onSearch = val => showToast(val);
const onClickButton = () => showToast(inputValue.value);

const count = ref(0);
const activeName = ref("a");
=======
const topicList = ref([]);
//存储当前用户账号
const username = ref("");
//获取当前用户id
username.value = userStore.username;
//控制tab栏显示
const activeName = ref("全部");
//初始化记录注册天数
const registerTime = ref("");

//获取注册天数
const registerDay = async () => {
  const { data } = await getRegisterDay({ username: username });
  registerTime.value = data.plus_time;
};
registerDay();

//获取话题列表
const getTopics = async () => {
  //更新仓库数据
  topicStore.getTopicList();
  topicList.value = topicStore.topicList;
};
getTopics();
//搜索框输入内容
const inputValue = ref("");
//搜索框事件
const onClickButton = () => {
  // console.log(activeName.value[0], 11);
};

const count = ref(0);
>>>>>>> han
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
<<<<<<< HEAD
//注册天数
const registerTime = ref("");
=======

>>>>>>> han
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

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
<<<<<<< HEAD

onMounted(async () => {
  const { data } = await getRegisterDay({ username: "1" });
  registerTime.value = data.plus_time;
});
=======
>>>>>>> han
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
<<<<<<< HEAD
    @search="onSearch(1)"
=======
>>>>>>> han
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
<<<<<<< HEAD
    v-model:active="activeName"
=======
    :active="activeName"
>>>>>>> han
    background="#f0f1f5"
    color="#041833"
    swipeable
    sticky
  >
    <van-tab
      v-for="item in topicList"
<<<<<<< HEAD
      :key="item.title"
      :title="item.title"
      :name="item.name"
=======
      :key="item.topic_id"
      :title="item.topic_title"
      :name="item.topic_name"
>>>>>>> han
    >
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
</style>
