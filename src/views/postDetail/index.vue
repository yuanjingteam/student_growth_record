<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()

// const articleId = route.params.id
// console.log(articleId);
const articleData = ref({
  article_collect_sum: 998,
  article_comment_sum: 0,
  article_content: {
    article_image: "Navic",
    article_text: "17KJyF0uOM",
    article_video: "Secur",
    article_id: 1,
    article_like_sum: 685,
    article_post_time: "6980天前",
    topic_id: "If th",
    user_class: "计科222",
    user_image: "nUYfgNlhhp",
    username: "韩韩韩"
  }
})
onMounted(() => {
  //发获取评论请求和帖子详情请求
  //得到data后


})

</script>
<template>
  <div class="detail">
    <van-nav-bar title="详情" left-arrow>
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>

    <post-more :data="articleData"></post-more>

    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">评论</span>
        <span class="comment_count">12</span>
      </template>
      <template #value>
        <change-btn :article_id="1" style="float: right"></change-btn>
      </template>
    </van-cell>

    <comment-detail></comment-detail>
    <comment-detail></comment-detail>
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