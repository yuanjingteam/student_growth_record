<script setup>
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { ref } from "vue";
const userStore = useUserStore();
const router = useRouter();
const text = ref("");
text.value = userStore.userData.user_email;
const onClickRight = () => {
  // 更新邮箱
  userStore.submitEmail({ username: userStore.username, user_email: text });
  router.go(-1);
};
</script>
<template>
  <van-nav-bar
    title="填写邮箱"
    left-text="返回"
    right-text="确定"
    left-arrow
    @click-left="router.go(-1)"
    @click-right="onClickRight"
  />
  <van-cell-group inset>
    <van-cell>
      <template #title>
        <van-field
          v-model="text"
          label="我的邮箱"
          placeholder="填写邮箱"
          label-align="top"
          :clearable="true"
        />
      </template>
      <template #label>填写邮箱，让别人更好了解你~</template>
    </van-cell>
  </van-cell-group>
</template>
