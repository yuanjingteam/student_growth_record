<script setup>
import { showImagePreview } from "vant";
import { ref } from "vue";

// 导入自定义的 useCounterStoreHook 函数,该函数返回 Pinia 中的 useCounterStore 实例
import { useCounterStoreHook } from "@/store/modules/useConter";

// 导入 Pinia 中的 storeToRefs 函数,用于从 Pinia store 中解构出响应式的 ref 对象
import { storeToRefs } from "pinia";

// 导入自定义的 getUserInfo 函数,用于获取用户信息
import { getUserInfo } from "@/api/user";
import { useRouter } from "vue-router";

// 调用 useCounterStoreHook 函数,获取 Pinia 中的 useCounterStore 实例
const userStore = useCounterStoreHook();

// 获取响应式属性:
// 使用 storeToRefs 函数,从 userStore 中解构出 userId 属性,并将其设为响应式的 ref 对象
// const { userId } = storeToRefs(userStore);

// 获取普通属性:
const userId = userStore.userId;
const router = useRouter();
const data = ref({});
// 发送请求
const getUser = async () => {
  const userInfo = await getUserInfo(userId);
  data.value = userInfo.data;
};
// 调用加载
getUser();

const show = ref(false);
const handleImagePreview = src => {
  showImagePreview({
    images: [src],
    onClose() {},
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
        {{ data.username }}
        <!-- 用户等级 -->
        <!-- <span>LV.{{ data.level }}</span> -->
      </div>
    </div>
    <!-- 头部总组件 -->
    <div class="user-header">
      <div class="my-inside" />
      <div class="change-info" @click="router.push('./editData')">
        <button>编辑资料</button>
      </div>
      <!-- 我的座右铭 -->
      <div class="my-motto">
        <i-icon icon="uil:edit-alt" />
        {{ data.user_motto }}
      </div>
      <!-- 我的个人信息 -->
      <div class="user-info">
        <div>粉丝：{{ data.userfans }}</div>
        <div>关注：{{ data.user_concern }}</div>
        <div>获赞：{{ data.user_like }}</div>
      </div>
      <!-- 其他人 -->
      <div class="other">
        <slot name="class" :text="data.user_class" />
        <slot name="office" :text="data.user_Identity" />
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
.my-motto {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
