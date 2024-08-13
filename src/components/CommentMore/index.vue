<script setup>
import { ref, defineProps, reactive } from "vue";

const props = defineProps({
  data: Object
});

const showPopover = ref(false);
const actions = [{ text: "举报" }, { text: "删除" }];
const select = (action, index) => {
  console.log(action, index);
};
</script>

<template>
  <div class="cell">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image
            width="5rem"
            height="3rem"
            round
            :src="data.user_headshot"
          />
          <div class="info">
            <div class="info-row">
              <p class="name">{{ data.name }}</p>
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
            <p class="comment-comtent">{{ data.comment_text }}</p>
            <div class="comment-footer">
              <p class="btn-title">{{ data.comment_time }}</p>
              <div>
                <van-button size="mini" icon="good-job-o">{{
                  data.comment_like
                }}</van-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </van-card>
  </div>
</template>

<style scoped>
.cell {
  .van-card {
    background-color: #fff;
    margin-top: 1px;
    padding: 15px 15px;
    overflow: hidden;

    .info-box {
      display: flex;

      .info {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .info-row {
          display: flex;
          justify-content: space-between;

          .name {
            margin-top: 5px;
            font-size: 16px;
            color: rgba(166, 168, 173, 1);
          }

          .i-icon {
            font-size: 25px;
            color: rgba(166, 168, 173, 1);
          }
        }

        .comment-comtent {
          margin-top: 10px;
          margin-bottom: 20px;
          font-weight: 500;
          font-size: 15px;
          color: #000;
        }

        .comment-footer {
          display: flex;
          justify-content: space-between;

          .btn-title {
            font-size: 12px;
            color: rgba(166, 168, 173, 1);
          }

          .van-button {
            border: none;
            font-size: 13px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
