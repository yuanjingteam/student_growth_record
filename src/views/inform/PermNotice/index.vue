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
const reportRefresh = async () => {
  const {
    data: { article_ban }
  } = await getreportEmail(reportData);

  //截取换行后的内容
  article_ban.forEach(article => {
    const brIndex = article.article_content.indexOf("<br/>");
    if (brIndex !== -1) {
      article.article_content = article.article_content.substring(0, brIndex);
    }
  });
  articleBan.value = article_ban;
};
//控制列表加载状态的显示和隐藏
const loading = ref(false);
//绑定了 finished 变量，用于标记是否加载完成
const finished = ref(false);

//当用户滚动到底部时会触发加载更多数据的事件
const onLoad = async () => {
  reportData.page += 1;
  const {
    data: { article_ban }
  } = await getreportEmail(reportData);
  if (article_ban.length > 0) {
    loading.value = false;
    articleBan.value = [...articleBan.value, ...article_ban];
    //截取换行后的内容
    articleBan.value.forEach(article => {
      const brIndex = article.article_content.indexOf("<br/>");
      if (brIndex !== -1) {
        article.article_content = article.article_content.substring(0, brIndex);
      }
    });
  } else {
    finished.value = true;
  }
};
</script>
<template>
  <van-nav-bar
    title="举报邮箱"
    left-text="返回"
    left-arrow
    fixed
    placeholder
    z-index="3"
    @click-left="router.go(-1)"
  />
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
</template>
<style scoped>
.van-list {
  background-color: #f0f1f5;
  overflow: hidden;
  min-height: 100vh;
}
</style>
