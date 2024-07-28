<script setup>
import { showImagePreview } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

const show = ref(false);
const handleImagePreview = src => {
  showImagePreview({
    images: [src],
    onClose() {},
    closeable: true
  });
};
const router = useRouter();

const data = {
  userImg: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  userName: "李小龙",
  userMotto: "崇德尚能,知行合一",
  fans: 0,
  myConcern: 0,
  thumbsUp: 0,
  Integral: 0,
  level: 0
};
</script>

<template>
  <van-image-preview v-model:show="show" :images="images">
    <!-- <template v-slot:index>第{{ index + 1 }}页</template> -->
  </van-image-preview>
  <div class="my-self">
    <div class="my-outside">
      <!-- 头像 -->
      <van-image
        round
        width="4rem"
        height="4rem"
        :src="data.userImg"
        @click="handleImagePreview(data.userImg)"
      />
      <!-- 昵称 -->
      <div class="my-name">
        {{ data.userName }}
        <span>LV.{{ data.level }}</span>
      </div>
    </div>
    <!-- 头部总组件 -->
    <div class="user-header">
      <div class="my-inside" />
      <div class="change-info"><button>编辑资料</button></div>
      <!-- 我的座右铭 -->
      <div class="my-motto">
        <i-icon icon="uil:edit-alt" />
        {{ data.userMotto }}
      </div>
      <!-- 我的个人信息 -->
      <div class="user-info">
        <div>粉丝：{{ data.fans }}</div>
        <div>关注：{{ data.myConcern }}</div>
        <div>获赞：{{ data.thumbsUp }}</div>
        <div>积分：{{ data.Integral }}</div>
      </div>
      <!-- 其他人 -->
      <div class="other">
        <slot name="class" />
        <slot name="office" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-self {
  position: relative;
  margin-top: 23.3333vmin;
}
.van-image {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
}
.user-header {
  position: relative;
  margin-top: 20px;
  padding: 10.3333vmin 3.6667vmin 15px;
  background-color: #ffff;
  border-radius: 7px;
  overflow: hidden;
}
.my-outside {
  position: absolute;
  display: flex;
  top: -8.4vmin;
  left: 31px;
  z-index: 2;
}
.my-outside .my-name {
  margin-top: 1.6667vmin;
  margin-left: 12px;
  font-size: 15px;
  font-weight: 700;
}
.my-inside {
  position: absolute;
  top: -4.4vmin;
  right: -6.3333vmin;
  width: 24.6667vmin;
  height: 12.6667vmin;
  border-radius: 9.3333vmin;
  background-color: #e5edff;
}
.change-info {
  position: absolute;
  top: 4px;
  right: 4px;
  color: #4580ff;
  font-weight: 700;
}
.user-info {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.my-name span {
  font-size: 11px;
  font-weight: 700;
}
</style>
