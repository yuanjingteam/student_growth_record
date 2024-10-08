<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { getArticlesService, getCommentsService } from "@/api/article";
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

//控制详情信息骨架屏
const loadingSke = ref(false);
//评论总数
const comment_total = ref(0);
//从路由中获取文章id
const articleId = Number(route.params.id);
//文章详情数据，初始化数据要写
const articleData = ref({
  article_content: {
    article_text: ""
  }
});
//评论详情数据
const commentData = {
  article_id: articleId,
  comment_sort: "new",
  comment_count: 5,
  comment_page: 1,
  username: userStore.username
};
//一级评论详情列表
const commentList = ref([]);
//获取评论详情列表
const getCommentsList = async () => {
  commentData.comment_page = 1;
  commentData.comment_sort = "new";
  const { data } = await getCommentsService(commentData);
  commentList.value = data.comment_list;
  comment_total.value = data.comment_num;
};
getCommentsList();

//获取帖子详情列表
const getArticleDetailList = async () => {
  loadingSke.value = true;
  const { data } = await getArticlesService({
    article_id: articleId,
    username: userStore.username
  });
  articleData.value = data;
  loadingSke.value = false;
};

getArticleDetailList();

//切换状态获取类型信息
const getType = async state => {
  commentData.comment_page = 1;
  commentData.comment_sort = state;
  const { data } = await getCommentsService(commentData);
  commentList.value = data.comment_list;
  comment_total.value = data.comment_num;
};

//控制列表加载状态的显示和隐藏
const loading = ref(false);
//绑定了 finished 变量，用于标记是否加载完成
const finished = ref(false);

//当用户滚动到底部时会触发加载更多数据的事件
const onLoad = async () => {
  commentData.comment_page += 1;

  const {
    data: { comment_list }
  } = await getCommentsService(commentData);
  if (comment_list?.length > 0) {
    commentList.value = [...commentList.value, ...comment_list];
    loading.value = false;
  } else {
    finished.value = true;
  }
};
//重新加载评论数据
const onRefreshCommentData = () => {
  getCommentsList();
};
</script>
<template>
  <div class="detail">
    <van-nav-bar title="详情" left-arrow @click-left="router.go(-1)">
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <van-empty
      v-if="articleData.ban"
      image="error"
      description="该文章已被封禁"
    />
    <van-empty
      v-else-if="articleData.status == false"
      image="error"
      description="该文章已被私密"
    />
    <div v-else>
      <div class="detailSke">
        <van-skeleton title avatar :row="4" :loading="loadingSke">
          <postdetail-more
            :post="articleData"
            :articleId="articleId"
            @refreshComment="onRefreshCommentData"
          />
        </van-skeleton>
      </div>

      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">评论</span>
          <span class="comment_count">{{ comment_total }}</span>
        </template>
        <template v-if="comment_total != 0" #value>
          <change-btn style="float: right" @get_type="getType" />
        </template>
      </van-cell>
      <van-list
        v-if="comment_total != 0"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <comment-detail
          v-for="item in commentList"
          :key="item.id"
          :data="item"
          @refresh="onRefreshCommentData"
        />
      </van-list>
      <van-empty v-else description="还没有人评论，快来抢沙发吧~" />
    </div>
  </div>
</template>

<style scoped>
.detail {
  background-color: #f0f1f5;
  height: 100%;

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
.detailSke {
  background-color: #fff;
}
.van-skeleton {
  padding: 20px 0;
}
</style>
