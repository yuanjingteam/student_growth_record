<script setup>
import { useUserStore } from "@/store";
import { changeUserPhone } from "@/api/user";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { ref } from "vue";
const userStore = useUserStore();
const router = useRouter();
const text = ref(0);
text.value = userStore.userData.phone_number;

// 更新用户电话
const submitPhone = async () => {
  const { code } = await changeUserPhone({
    username: userStore.username,
    phone_number: text
  });
  if (code == 200) {
    console.log("yeah");
    userStore.userData.phone_number = text;
  }
};
const onClickRight = async () => {
  // 更新电话
  try {
    await submitPhone();
    router.go(-1);
  } catch (error) {
    console.error("提交手机号码失败:", error);
    showToast("提交手机号码失败,请稍后重试");
  }
};
</script>
<template>
  <van-nav-bar
    title="电话号码"
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
          label="我的电话"
          placeholder="填写手机号"
          label-align="top"
          :clearable="true"
        />
      </template>
      <template #label>个人联系方式</template>
    </van-cell>
  </van-cell-group>
</template>
