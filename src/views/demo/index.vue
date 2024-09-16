<script setup lang="ts" name="Demo">
import { onMounted, reactive, ref, watch, onBeforeUpdate } from "vue";
import CellCard from "@/components/CellCard/index.vue";
import { getRegisterDay } from "@/api/topic";
import { showDialog } from "vant";

import { highSearchArticleService } from "@/api/article";
import { getClassByGradeService } from "@/api/class";
import { useTopicStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { e } from "vite-plugin-cdn2/dist/interface-24a47269.js";

const userStore = useUserStore();
//获取pinia的token
const token = userStore.token;
//获取存储的grade
const gradeDetail = userStore.grade;
//获取存储的class
const className = userStore.className;

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
const currentName = localStorage.getItem("currentTabName") || "学习成绩";
//控制tab栏显示
const activeName = ref(currentName);
//初始化记录注册天数
const registerTime = ref("");
//搜索框数据
const searchData = reactive({
  key_words: "",
  topic_name: "",
  article_count: 8,
  article_page: 0,
  username: userStore.username,
  sort: "",
  order: "",
  start_at: "",
  end_at: "",
  class: [],
  name: "",
  grade: 0
});
searchData.class = className;
searchData.grade = gradeDetail;
//对象下拉选项内容
const object = ref("word");
const objectOption = [
  { text: "内容", value: "word" },
  { text: "用户", value: "user" }
];
//年级下拉框内容
const grade = ref(`${gradeDetail}`);
const gradeOption = [
  { text: "大一", value: "1" },
  { text: "大二", value: "2" },
  { text: "大三", value: "3" },
  { text: "大四", value: "4" }
];

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
//存当前年级的班级列表
const list = ref([]);
//获取当前年级的所有班级并存储
const getClassByGrade = async () => {
  const { data } = await getClassByGradeService({
    grade: gradeDetail
  });
  list.value = data.grade_list;
};
getClassByGrade();

//搜索框事件
const onSearch = async () => {
  if (object.value == "user") {
    searchData.key_words = "";
    searchData.name = inputValue.value;
  } else {
    searchData.name = "";
    searchData.key_words = inputValue.value;
  }
  searchData.order = "asc";
  searchData.sort = "created_at";
  searchData.article_page = 1;
  searchData.topic_name = activeName.value;
  // searchData.class = [];
  const {
    data: { content }
  } = await highSearchArticleService(searchData);
  articleList.value = content;
};
onSearch();
// 创建防抖后的搜索函数
const debouncedSearch = debounce(onSearch, 300);

//监听activeName的变化，从而发送请求
watch(activeName, async (newValue, oldValue) => {
  localStorage.setItem("currentTabName", newValue);
  searchData.article_page = 1;
  if (object.value == "user") {
    searchData.key_words = "";
    searchData.name = inputValue.value;
  } else {
    searchData.name = "";
    searchData.key_words = inputValue.value;
  }
  searchData.topic_name = newValue;

  const {
    data: { content }
  } = await highSearchArticleService(searchData);
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
  if (object.value == "user") {
    searchData.key_words = "";
    searchData.name = inputValue.value;
  } else {
    searchData.name = "";
    searchData.key_words = inputValue.value;
  }
  searchData.topic_name = activeName.value;
  searchData.article_page += 1;

  const {
    data: { content }
  } = await highSearchArticleService(searchData);
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

//左侧选中项索引
const activeIndex = ref(0);
//左侧筛选框中的数组
const items = [
  {
    text: "排序方式"
  },
  {
    text: "排序字段"
  },
  {
    text: "班级"
  },
  {
    text: "时间"
  }
];

const date = ref("");
const show = ref(false);

const formatDate = date => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = values => {
  const [start, end] = values;
  show.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
};

//打开日历框
const showcalendar = () => {
  show.value = true;
};
//绑定筛选下拉框
const itemRef = ref(null);

//点击改变当前选中的年级
const gradeChange = async grade => {
  //一旦修改选中年级则每一次请求都获取全体
  //清空关键字
  searchData.key_words = "";
  searchData.name = "";
  inputValue.value = "";
  //清空存储班级的数组
  list.value = [];
  //清空已选中的数组
  checked3.value = [];
  //修改传递年级数据
  searchData.grade = Number(grade);
  //获取当前年级的所有班级并存储
  const { data } = await getClassByGradeService({
    grade: searchData.grade
  });
  list.value = data.grade_list;
  checked3.value = data.grade_list;
  searchData.class = data.grade_list;
  //修改当前页
  searchData.article_page = 1;
  //发送获取帖子请求
  const {
    data: { content }
  } = await highSearchArticleService(searchData);
  articleList.value = content;
};

const checked1 = ref("asc");
const checked2 = ref("created_at");
const checked3 = ref(className);
const openMenu = () => {
  //获取上次发请求时的值
  //没有点击确定则再打开还是原来的值
  checked1.value = "asc" || `${searchData.order}`;
  checked2.value = "created_at" || `${searchData.sort}`;
  checked3.value = className || searchData.class;
};

const checkboxRefs = ref([]);
const toggle = index => {
  checkboxRefs.value[index].toggle();
};

onBeforeUpdate(() => {
  checkboxRefs.value = [];
});
//高级搜索
const highSearch = async () => {
  searchData.article_page = 1;
  if (object.value == "user") {
    searchData.key_words = "";
    searchData.name = inputValue.value;
  } else {
    searchData.name = "";
    searchData.key_words = inputValue.value;
  }
  const {
    data: { content }
  } = await highSearchArticleService(searchData);
  articleList.value = content;
};
//确认筛选框中的筛选条件
const confirmChoice = async () => {
  searchData.order = checked1.value;
  searchData.sort = checked2.value;
  searchData.class = checked3.value;
  highSearch();
  itemRef.value.toggle();
};
//重置筛选框的选择
const resetChoice = () => {
  checked1.value = "asc";
  checked2.value = "created_at";
  checked3.value = className;
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

  <van-dropdown-menu ref="menuRef" :close-on-click-outside="false">
    <van-dropdown-item
      v-model="grade"
      :options="gradeOption"
      @change="gradeChange"
    />
    <van-dropdown-item v-model="object" :options="objectOption" />
    <van-dropdown-item ref="itemRef" title="筛选" @open="openMenu">
      <van-tree-select v-model:main-active-index="activeIndex" :items="items">
        <template #content>
          <van-radio-group v-if="activeIndex === 0" v-model="checked1">
            <van-cell title="正序" clickable @click="checked1 = 'asc'">
              <template #right-icon>
                <van-radio name="asc" />
              </template>
            </van-cell>
            <van-cell title="倒序" clickable @click="checked1 = 'desc'">
              <template #right-icon>
                <van-radio name="desc" />
              </template>
            </van-cell>
          </van-radio-group>

          <van-radio-group v-if="activeIndex === 1" v-model="checked2">
            <van-cell
              title="创建时间"
              clickable
              @click="checked2 = 'created_at'"
            >
              <template #right-icon>
                <van-radio name="created_at" />
              </template>
            </van-cell>
            <van-cell
              title="文章字数"
              clickable
              @click="checked2 = 'word_count'"
            >
              <template #right-icon>
                <van-radio name="word_count" />
              </template>
            </van-cell>
            <van-cell title="文章质量" clickable @click="checked2 = 'quality'">
              <template #right-icon>
                <van-radio name="quality" />
              </template>
            </van-cell>
            <van-cell
              title="浏览量"
              clickable
              @click="checked2 = 'read_amount'"
            >
              <template #right-icon>
                <van-radio name="read_amount" />
              </template>
            </van-cell>
            <van-cell
              title="点赞量"
              clickable
              @click="checked2 = 'like_amount'"
            >
              <template #right-icon>
                <van-radio name="like_amount" />
              </template>
            </van-cell>
            <van-cell
              title="收藏量"
              clickable
              @click="checked2 = 'collect_amount'"
            >
              <template #right-icon>
                <van-radio name="collect_amount" />
              </template>
            </van-cell>
            <van-cell
              title="评论量"
              clickable
              @click="checked2 = 'comment_amount'"
            >
              <template #right-icon>
                <van-radio name="comment_amount" />
              </template>
            </van-cell>
          </van-radio-group>
          <van-checkbox-group v-if="activeIndex === 2" v-model="checked3">
            <van-cell
              v-for="(item, index) in list"
              :key="item"
              clickable
              :title="item"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox
                  :ref="el => (checkboxRefs[index] = el)"
                  :name="item"
                  @click.stop
                />
              </template>
            </van-cell>
          </van-checkbox-group>
          <div v-if="activeIndex === 3" class="showTime" @click="showcalendar">
            <h2>开始时间:</h2>
            <span class="time">2022-09-20</span>
            <h2>结束时间:</h2>
            <span class="time">2024-09-15</span>
          </div>
        </template></van-tree-select
      >

      <div class="choice-btn">
        <van-button type="primary" size="small" @click="confirmChoice"
          >确定</van-button
        >
        <van-button type="primary" size="small" @click="resetChoice"
          >重置</van-button
        >
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
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
  <van-back-top bottom="100px" />
  <van-calendar v-model:show="show" type="range" @confirm="onConfirm" />
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

.van-dropdown-menu >>> .van-dropdown-menu__bar {
  background-color: #f0f1f5;
  border-bottom: solid 2px #fff;
}
.van-dropdown-menu >>> .van-dropdown-menu__title:after {
  border-color: transparent transparent #c1c1c1 #c1c1c1;
}

.showTime {
  padding: 10px;
  .time {
    display: block;
    background-color: #f0f1f5;
    border-radius: 15px;
    padding: 5px 10px;
    font-size: 18px;
    margin-top: 5px;
  }
}
.choice-btn {
  display: flex;
  justify-content: space-evenly;
  .van-button {
    margin: 10px 0;
    width: 150px;
    height: 30px;
    font-size: 15px;
  }
}
</style>
