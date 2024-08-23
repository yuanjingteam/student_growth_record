<script setup>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { getreportEmail } from "@/api/user";
import { showToast } from "vant";
const router = useRouter();
//举报数据
const reportData = reactive({
  page: 0,
  limit: 5
});
//存储举报数据
const articleBan = ref([]);

//刷新举报数据
const reportRefresh = () => {
  getreportEmail();
};
//控制列表加载状态的显示和隐藏
const loading = ref(false);
//绑定了 finished 变量，用于标记是否加载完成
const finished = ref(false);

//控制刷新状态的显示和隐藏
const refreshing = ref(false);

//当用户滚动到底部时会触发加载更多数据的事件
const onLoad = async () => {
  if (refreshing.value) {
    reportData.page = 0;
    articleBan.value = [];
    refreshing.value = false;
  }
  reportData.page += 1;
  try {
    const res = await getreportEmail(reportData);
    loading.value = false;
    articleBan.value = [...articleBan.value, ...res.data.article_ban];
    if (res.data.article_ban.length === 0) {
      finished.value = true;
    }
  } catch (error) {
    finished.value = true;
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
</script>
<template>
  <van-nav-bar
    title="举报邮箱"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <report-detail
        v-for="(item, index) in articleBan"
        :key="index"
        :articleBan="item"
        @report="reportRefresh"
      />
    </van-list>
  </van-pull-refresh>
</template>
<style scoped>
.van-list {
  background-color: #f0f1f5;
  overflow: hidden;
}
</style>
