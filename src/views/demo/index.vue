<script setup lang="ts" name="Demo">
import { onMounted, reactive } from "vue";
import { ref } from 'vue';
import { showToast } from 'vant';
import CellCard from '@/components/CellCard/index.vue'
import { getArticlesService } from '@/api/article'
// const data = { article_id: '1' }
// const res = await getArticlesService(data)
// console.log(res);


const topicList = ref([
  {
    title: '全部',
    name: '全部'
  },
  {
    title: '学习',
    name: '学习成绩'
  },
  {
    title: '奖项',
    name: 'c'
  },
  {
    title: '志愿',
    name: 'd'
  },
  {
    title: '文体',
    name: 'e'
  },

  {
    title: '日常',
    name: 'f'
  },

])
const value = ref('');
const onSearch = (val) => showToast(val);
const onClickButton = () => showToast(value.value);

const count = ref(0);
const activeName = ref('a');
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

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


</script>
<template>

  <div class="topShow">
    <p class="title">我的大学生活</p>
    <span>
      <p>与你相遇の第10天</p>
      <i-icon icon="icon-park:read-book" class="text-xl"></i-icon>
    </span>

  </div>
  <van-search v-model="value" show-action shape="round" placeholder="请输入搜索关键词" @search="onSearch" background="#fff"
    class="search">
    <template #action>
      <van-button @click="onClickButton" type="primary" size="small" color="#004ff7" round>搜索</van-button>
    </template>
  </van-search>

  <van-tabs v-model:active="activeName" background="#f0f1f5" color="#041833" swipeable sticky>
    <van-tab v-for="item in topicList" :key="item.title" :title="item.title" :name="item.name">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <cell-card v-for="item in list" :key="item"></cell-card>
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

.van-search>>>.van-search__content {
  background-color: #fff !important;
  background: #fff;
}

.van-search>>>.van-search__action {
  padding: 0px;
  display: flex;
}
</style>
