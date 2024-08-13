<script setup>
import { showImagePreview } from "vant";
import { ref } from "vue";
import { getUserInfo } from "@/api/user";
// 导入自定义的 useUserStore 函数,该函数返回 Pinia 中的 useCounterStore 实例
import { useUserStore } from "@/store";

import { useRoute, useRouter } from "vue-router";

// 调用 useUserStore 函数,获取 Pinia 中的 useCounterStore 实例
const userStore = useUserStore();
const router = useRouter();

const own = ref(false);
const route = useRoute();
// 获取普通属性:
const username = ref(userStore.username); // 0
// 如果能解析出用户信息,说明不是当前用户,是他人主页
const routerName = route.params.username;
if (routerName) {
  if (routerName == username.value) {
    // 说明是本人,不渲染班级
    own.value = true;
    console.log(own.value);
  } else {
    // 赋值一个新的username,就是对当前username进行操作的
    username.value = router.currentRoute.value.params.username;
    console.log(21312424);
  }
}

const data = ref({
  username: "",
  name: "",
  user_headshot: "",
  user_motto: "",
  userfans: 0,
  score: 0,
  user_concern: 0,
  user_like: 0,
  user_class: "",
  user_Identity: ""
});

// 获取用户基本信息
const UerInfo = async () => {
  const res = await getUserInfo({ username: username });
  data.value = res.data;
};
UerInfo();

const show = ref(false);
const handleImagePreview = src => {
  showImagePreview({
    images: [src],
    closeable: true
  });
};
</script>

<template>
  <van-image-preview v-model:show="show">
    <!-- <template v-slot:index>第{{ index + 1 }}页</template> -->
  </van-image-preview>
  <div class="my-self">
    <div class="my-outside">
      <!-- 头像 -->
      <van-image
        round
        width="4rem"
        height="4rem"
        :src="data.user_headshot"
        @click="handleImagePreview(data.user_headshot)"
      />
      <!-- 昵称 -->
      <div class="my-name">
        {{ data.name }}
        <!-- 用户等级 -->
        <!-- <span>LV.{{ userInfo.level }}</span> -->
      </div>
    </div>
    <!-- 头部总组件 -->
    <van-cell-group inset>
      <div class="user-header">
        <!-- 编辑资料部分 -->
        <div>
          <slot name="self" />
        </div>
        <div>
          <slot name="other" />
        </div>
        <!-- 我的座右铭 -->
        <div class="my-motto">
          <i-icon icon="uil:edit-alt" />
          <van-text-ellipsis :content="data.user_motto" class="my-motto" />
        </div>
        <!-- 我的个人信息 -->
        <div class="user-info">
          <div @click="router.push('./userFans')">
            粉丝：{{ data.userfans }}
          </div>
          <div @click="router.push('./userAttention')">
            关注：{{ data.user_concern }}
          </div>
          <div>获赞：{{ data.user_like }}</div>
          <div>积分：{{ data.score }}</div>
        </div>
        <!-- 其他人,不是本人才给插槽 -->
        <div v-if="!own" class="other">
          <slot name="class" :text="data.user_class" />
          <slot name="office" :text="data.user_Identity" />
        </div>
      </div>
    </van-cell-group>
  </div>
</template>

<style scoped>
.my-self {
  position: relative;
  margin-top: 55px;
}

.van-image {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
}

.user-header {
  position: relative;
  padding: 10vmin 3.6667vmin 15px;
  border-radius: 7px;
  overflow: hidden;
}

.my-motto .i-icon {
  margin-top: 3px;
  float: left;
}

.my-outside {
  position: absolute;
  display: flex;
  top: -30px;
  left: 31px;
  z-index: 2;
}

.my-outside .my-name {
  margin-top: 1.6667vmin;
  margin-left: 12px;
  font-size: 15px;
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
