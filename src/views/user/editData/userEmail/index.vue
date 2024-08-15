<script setup>
import { useUserStore } from "@/store";
import { changeUserEmail } from "@/api/user";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { showToast } from "vant";
const userStore = useUserStore();
const router = useRouter();
const text = ref("");
text.value = userStore.userData.user_email;
// 更新用户邮箱
const submitEmail = async () => {
  const { code } = await changeUserEmail({
    username: userStore.username,
    user_email: text
  });
  if (code == 200) {
    console.log("yeah");
    userStore.userData.user_email = text;
  }
};
const onClickRight = async () => {
  try {
    await submitEmail();
    // 如果 submitEmail() 函数执行成功
    router.go(-1);
  } catch (error) {
    // 如果 submitEmail() 函数执行过程中出现异常
    console.error("提交邮箱信息失败:", error);
    showToast("提交邮箱信息失败,请稍后重试");
  }
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
