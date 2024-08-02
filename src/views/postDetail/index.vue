<script setup>
import { ref } from 'vue'

</script>
<template>
  <div class="detail">
    <van-nav-bar title="详情" left-arrow>
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>


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
    margin-top: 20px;
  }

  .custom-title,
  .comment_count {
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>