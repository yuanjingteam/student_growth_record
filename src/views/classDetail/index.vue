<script setup>
import { useRoute, useRouter } from "vue-router";
import { useClassStore, useUserStore } from "@/store";
import { showDialog } from "vant";
import { reactive, ref, watch } from "vue";
import { getClassDetailService } from "@/api/class";
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const classStore = useClassStore();
const classList = classStore.classList;

//tab切换栏内容
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
//获取当前存储的tab
const currentName = localStorage.getItem("currentTabClassDetail") || "最热";
//tab内容
const activeName = ref(currentName);

//获取动态路由的参数
const classId = route.params.id;
//声明当前班级名称
const className = ref();
//根据id查找班级名称
const findClassName = classId => {
  const classOne = classList.find(classOne => classOne.class_id == classId);
  return classOne ? classOne.class_name : null;
};
className.value = findClassName(classId);

//获取文章列表的数据
const classData = reactive({
  key_word: "",
  class_name: className.value,
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
  } = await getClassDetailService(classData);
  articleList.value = content;
};
//监听切换排序方式
watch(activeName, (newValue, oldValue) => {
  localStorage.setItem("currentTabClassDetail", newValue);
  classData.article_page = 1;
  if (newValue == "最热") {
    newValue = "hot";
  } else {
    newValue = "new";
  }
  classData.article_sort = newValue;
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
    classData.article_page = 0;
    articleList.value = [];
    refreshing.value = false;
  }
  classData.article_page += 1;

  const {
    data: { content }
  } = await getClassDetailService(classData);
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
    <!-- 发布文章按钮 -->
    <van-button
      class="publish"
      round
      icon="plus"
      type="primary"
      @click="upto"
    />
    <div class="title" style="display: flex">
      <i-icon icon="icon-park:message" />
      <p>{{ className }}专题</p>
    </div>
    <!-- <p class="title-content">{{ topic.topic_content }}</p> -->
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
  z-index: 100;
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
.van-tabs {
  height: 100%;
}
.van-tabs :deep(.van-tabs__content) {
  height: 100%;
  background-color: #f0f1f5;
}
</style>
