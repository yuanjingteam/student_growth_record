<script setup>
import { useUserStore } from "@/store";
import { changeUserMotto } from "@/api/user";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { ref } from "vue";
const userStore = useUserStore();
const router = useRouter();
const text = ref("");
text.value = userStore.userData.user_motto;
// 更新用户个签
const submitMotto = async () => {
  const { code } = await changeUserMotto({
    username: userStore.username,
    user_motto: text
  });
  if (code == 200) {
    console.log("yeah");
    userStore.userData.user_motto = text;
  }
};
const onClickRight = async () => {
  // 更新个签
  try {
    await submitMotto();
    router.go(-1);
  } catch (error) {
    console.error("提交个签失败:", error);
    showToast("提交个签失败,请稍后重试");
  }
};
</script>
<template>
  <van-nav-bar
    title="个性签名"
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
          label="我的个签"
          placeholder="填写个性签名"
          label-align="top"
          :clearable="true"
        />
      </template>
      <template #label>填写个签，彰显态度~</template>
    </van-cell>
  </van-cell-group>
</template>
<style scoped></style>
