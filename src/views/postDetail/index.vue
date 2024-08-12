<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const articleId = route.params.id;
const articleData = ref({
  if_ban: false,
  user_headshot: "http://dummyimage.com/180x150",
  name: "马强",
  username: "2555",
  user_class: "计科222",
  tag_name: "考研复习",
  post_time: "2天前",
  article_content: {
    article_image: "http://dummyimage.com/120x90",
    article_text:
      "西切议已以利活之采克究件称。照别大定适角众然理般全权世活实合价。空按多层务除等做向取而强整相战规利。七米律族报设流形为定质明江年。美且情实程白且这王队走平织。西相规过眼式等合好亲向速广市办。多六白东战价程响满条内水验近要土。",
    article_video: 79
  },
  article_like_sum: 72,
  article_collect_sum: 46,
  article_comment_sum: 75,
  if_like: true,
  if_collect: true
});

onMounted(() => {
  //发获取评论请求和帖子详情请求
  //得到data后渲染
  console.log(111);
});
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
        <span class="comment_count">12</span>
      </template>
      <template #value>
        <change-btn :article_id="1" style="float: right" />
      </template>
    </van-cell>

    <comment-detail />
    <comment-detail />
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
