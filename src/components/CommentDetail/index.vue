<script setup>
const text =
  '那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消失，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。';
</script>


<template>
  <div class="cell">
    <van-card>
      <template #tags>
        <div class="info-box">
          <van-image round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          <div class="info">
            <p class="name">赵一鸣</p>
            <van-text-ellipsis rows="3" :content="text" />
          </div>
        </div>
      </template>
      <template #footer>
        <button class="btn">
          <i-icon icon="icon-park:message"></i-icon>
          <p class="btn-title">文体活动</p>
        </button>
        <van-button size="mini" icon="good-job-o">26</van-button>
        <van-button size="mini" icon="comment-o">12</van-button>
        <van-button size="mini" icon="star-o">180</van-button>
      </template>
    </van-card>
  </div>


</template>

<style scoped>
.cell {

  .van-card {
    background-color: #fff;
    margin-top: 1px;

    .info-box {
      display: flex;

      .van-image {
        margin-right: 10px;
        height: 45px;
        width: 45px;
      }

      .info {
        display: flex;
        flex-direction: column;

        .name {
          margin-top: 5px;
          font-size: 16px;
          color: rgba(166, 168, 173, 1);
        }
      }



    }

    .van-text-ellipsis {
      margin-left: 50px;
      margin-bottom: 20px;
      font-weight: 500;
      font-size: 15px;
      color: #000;
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