<script setup>
import { useRouter } from "vue-router";
import { defineProps, ref, reactive } from "vue";

const props = defineProps({
  articleList: Array
});

console.log(props.articleList);

const router = useRouter();
const text =
  "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。";
// const articleId = ref('')

const gotoArticleDetail = articleId => {
  router.push(`/postDetail/${articleId}`);
};
</script>

<template>
  <div class="cell" @click="gotoArticleDetail('1')">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image
            round
            width="3rem"
            height="3rem"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <div class="info">
            <p class="name">赵一鸣</p>
            <p class="grade">计科222</p>
          </div>
        </div>
        <van-text-ellipsis rows="3" :content="text" />
      </template>
      <template #footer>
        <button class="btn">
          <i-icon icon="icon-park:message" />
          <p class="btn-title">文体活动</p>
        </button>
        <van-button size="mini" icon="good-job-o">26</van-button>
        <van-button size="mini" icon="comment-o">12</van-button>
        <van-button size="mini" icon="star-o">180</van-button>
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
