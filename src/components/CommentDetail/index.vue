<script setup>
import { ref } from "vue";
const text =
  "那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。";

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
          <van-image
            round
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <div class="info">
            <div class="info-row">
              <p class="name">赵一鸣</p>
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
            <p class="comment-comtent">{{ text }}</p>
            <div class="comment-footer">
              <p class="btn-title">1小时前</p>
              <div>
                <van-button size="mini" icon="comment-o">12</van-button>
                <van-button size="mini" icon="good-job-o">26</van-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </van-card>
  </div>
</template>

<style scoped lang="less">
.cell {
  .van-card {
    background-color: #fff;
    margin-top: 1px;
    padding: 15px 15px;
    overflow: hidden;

    .info-box {
      display: flex;

      .van-image {
        height: 40px;
        width: 300px;
      }

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
