<script setup>
import { useRouter } from "vue-router";
import { defineProps, ref, reactive } from "vue";

const props = defineProps({
  article: Object
});
console.log(props.article);

const router = useRouter();
//获取传过来的帖子id
const articleId = ref();
articleId.value = props.article.article_id;

//跳转到帖子详情页
const gotoArticleDetail = () => {
  router.push(`/postDetail/${articleId.value}`);
};
</script>

<template>
  <div class="cell" @click="gotoArticleDetail">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image
            round
            width="3rem"
            height="3rem"
            :src="
              article.user_headshot
                ? article.user_headshot
                : 'https://picsum.photos/200/300'
            "
          />
          <div class="info">
            <p class="name">
              {{ article.name ? article.name : "用户已被删除" }}
            </p>
            <p v-if="article.username != ''" class="grade">
              {{ article.user_class }}
            </p>
          </div>
        </div>
        <p class="article-content" v-html="article.article_content.trim()" />
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
          article.comment_amount
        }}</van-button>
        <van-button size="mini" icon="star-o">{{
          article.collect_amount
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
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name {
          font-size: 16px;
        }

        .grade {
          font-size: 12px;
          color: rgba(203, 202, 204, 1);
        }
      }
    }

    .article-content {
      margin-bottom: 20px;
      font-weight: 500;
      display: -webkit-box; /* 兼容 WebKit 浏览器 */
      -webkit-line-clamp: 3; /* 限制行数为 3 行 */
      -webkit-box-orient: vertical; /* 垂直排列盒子内容 */
      overflow: hidden; /* 隐藏超出的内容 */
      text-overflow: ellipsis; /* 超出部分用省略号表示 */
      line-height: 1.5em; /* 行高，调整为合适的值 */
      max-height: 4.5em;
    }

    .btn {
      float: left;
      display: flex;
      height: 23px;
      background-color: rgba(0, 81, 255, 0.1);
      border-radius: 10px;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .btn-title {
        color: rgba(0, 81, 255);
        margin-left: 5px;
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
