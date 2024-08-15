<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { getArticlesService, getCommentsService } from "@/api/article";
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

//评论总数
const comment_total = ref(0);
const articleId = Number(route.params.id);
//文章详情数据
//初始化数据要写
const articleData = ref({
  article_content: {
    article_text: ""
  }
});
//评论详情数据
const commentData = {
  article_id: articleId,
  comment_sort: "hot",
  comment_count: 5,
  comment_page: 0,
  username: userStore.username
};
//评论详情列表
const commentList = ref([]);
//获取评论详情列表
const getCommentsList = async () => {
  const { data } = await getCommentsService(commentData);
  commentList.value = data.comment_list;
  comment_total.value = data.comment_num;
};
getCommentsList();
//获取帖子详情列表
const getArticleDetailList = async () => {
  const { data } = await getArticlesService({
    article_id: articleId,
    username: userStore.username
  });
  articleData.value = data;
};
getArticleDetailList();

//切换状态获取类型信息
const getType = async state => {
  commentData.comment_way = state;
  const { data } = await getCommentsService(commentData);
  commentList.value = data.comment_list;
  comment_total.value = data.comment_num;
};
//重新获取数据
const refresh = async () => {
  const { data } = await getCommentsService(commentData);
  commentList.value = data.comment_list;
  comment_total.value = data.comment_num;
};
</script>
<template>
  <div class="detail">
    <van-nav-bar title="详情" left-arrow @click-left="router.go(-1)">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <post-more :data="articleData" :articleId="articleId" />

    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">评论</span>
        <span class="comment_count">{{ comment_total }}</span>
      </template>
      <template #value>
        <change-btn style="float: right" @get_type="getType" />
      </template>
    </van-cell>

    <comment-detail
      v-for="(item, index) in commentList"
      :key="index"
      :data="item"
      @refresh="refresh"
    />
  </div>
</template>

<style scoped>
.detail {
  background-color: #f0f1f5;

  .van-nav-bar {
    --van-nav-bar-background: #f0f1f5;
    --van-nav-bar-icon-color: #000;

    .van-icon {
      font-size: 18px;
    }
  }

  .van-cell {
    margin-top: 15px;
  }

  .custom-title,
  .comment_count {
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>
