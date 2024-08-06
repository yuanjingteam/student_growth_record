<script setup>
import { ref } from "vue";
const props = defineProps({
  data: Object
});

const showPopover = ref(false);
const actions = [{ text: "举报" }, { text: "选项二" }];
const select = (action, index) => {
  console.log(action, index);
};
</script>

<template>
  <div class="cell">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image round :src="data.article_content.user_image" />
          <div class="info">
            <div style="display: flex; justify-content: space-between">
              <p class="name">{{ data.article_content.username }}</p>
              <van-popover
                v-model:show="showPopover"
                theme="dark"
                :actions="actions"
                placement="left"
                @select="select"
              >
                <template #reference>
                  <i-icon icon="ant-design:more-outlined" />
                </template>
              </van-popover>
            </div>
            <p class="grade">{{ data.article_content.user_class }}</p>
          </div>
        </div>
        <p class="post-content">{{ data.article_content.article_text }}</p>
        <div>
          <button class="btn">
            <i-icon icon="icon-park:message" />
            <p class="btn-title">文体活动</p>
          </button>
        </div>
        <p class="time">{{ data.article_content.article_post_time }}</p>
      </template>
      <template #footer>
        <div class="btn-box">
          <van-button size="mini" icon="star-o">{{
            data.article_collect_sum
          }}</van-button>
          <van-button size="mini" icon="comment-o">{{
            data.article_comment_sum
          }}</van-button>
          <van-button size="mini" icon="good-job-o">{{
            data.article_content.article_like_sum
          }}</van-button>
        </div>
      </template>
    </van-card>
  </div>
</template>

<style scoped lang="less">
.cell {
  position: relative;

  .van-card {
    background-color: #fff;
    padding: 20px;

    .info-box {
      display: flex;
      margin-bottom: 10px;

      .van-image {
        margin-right: 15px;
        width: 40px;
        height: 40px;
      }

      .info {
        width: 100%;

        .name {
          font-size: 16px;
        }

        .grade {
          font-size: 12px;
          color: rgba(203, 202, 204, 1);
        }

        .i-icon {
          font-size: 25px;
          color: rgba(166, 168, 173, 1);
        }
      }
    }

    .post-content {
      margin-bottom: 20px;
      font-weight: 500;
      font-size: 15px;
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
      font-size: 18px;
    }

    .btn-box {
      display: flex;
      justify-content: space-evenly;
      margin-top: 10px;
    }

    .time {
      margin-left: 280px;
      font-size: 12px;
      color: rgba(166, 168, 173, 1);
    }
  }
}
</style>
