<script setup>
import { useRouter } from "vue-router";
import { defineProps, ref, reactive } from "vue";

const props = defineProps({
  article: Object
});
const router = useRouter();
//获取传过来的帖子id
const articleId = props.article.article_id;

//跳转到帖子详情页
const gotoArticleDetail = () => {
  router.push(`/postDetail/${articleId}`);
};
</script>

<template>
  <div class="cell" @click="gotoArticleDetail()">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image
            round
            width="3rem"
            height="3rem"
            :src="article.user_headshot"
          />
          <div class="info">
            <p class="name">{{ article.name }}</p>
            <p class="grade">{{ article.user_class }}</p>
          </div>
        </div>
        <van-text-ellipsis rows="3" :content="article.article_content" />
      </template>
      <template #footer>
        <button class="btn">
          <i-icon icon="icon-park:message" />
          <p class="btn-title">{{ article.article_tags[0] }}</p>
        </button>
        <van-button size="mini" icon="good-job-o">{{
          article.like_amount
        }}</van-button>
        <van-button size="mini" icon="comment-o">{{
          article.collect_amount
        }}</van-button>
        <van-button size="mini" icon="star-o">{{
          article.comment_amount
        }}</van-button>
      </template>
    </van-card>
  </div>
</template>

<style lang="less" scoped>
.cell {
  padding: 0 8px;

  .van-card {
    background-color: #fff;
    border-radius: 15px;
    margin-top: 10px;
    padding: 20px;

    .info-box {
      display: flex;
      margin-bottom: 10px;

      .van-image {
        margin-right: 15px;
      }

      .name {
        font-size: 16px;
      }

      .grade {
        font-size: 12px;
        color: rgba(203, 202, 204, 1);
      }
    }

    .van-text-ellipsis {
      margin-bottom: 20px;
      font-weight: 500;
    }

    .btn {
      float: left;
      display: flex;
      width: 85px;
      height: 23px;
      background-color: rgba(0, 81, 255, 0.1);
      border-radius: 10px;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .btn-title {
        color: rgba(0, 81, 255);
      }
    }

    .van-button {
      border: none;
      font-size: 13px;
      color: rgba(203, 202, 204, 1);
    }
  }
}
</style>
