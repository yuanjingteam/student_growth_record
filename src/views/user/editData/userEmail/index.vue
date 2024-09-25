<script setup>
import { useUserStore } from "@/store";
import { changeUserEmail } from "@/api/user";
import { showConfirmDialog } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { showToast } from "vant";
const userStore = useUserStore();
const router = useRouter();
const text = ref("");
const formRef = ref();
const showState = ref(false);
text.value = userStore.userData.user_email;
// 更新用户邮箱
const submitEmail = async () => {
  try {
    const { code } = await changeUserEmail({
      username: userStore.username,
      user_email: text.value
    });
    userStore.userData.user_email = text;
    showToast("修改成功");
    router.go(-1);
  } catch {
    showToast("修改失败，请稍后重试");
  }
};

// 表单校验
const rules = [
  {
    validator: value => {
      // 邮箱正则表达式
      const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!emailRegex.test(value)) {
        // error.value = "邮箱格式不正确";
        return false;
      }
      // error.value = "";
      return true;
    },
    message: "邮箱格式不正确"
  }
];

const onClickRight = async () => {
  await formRef.value.validate();
  showState.value = true;
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
  <van-form ref="formRef">
    <van-cell-group inset>
      <van-cell>
        <template #title>
          <van-field
            v-model="text"
            label="我的邮箱"
            placeholder="填写邮箱"
            label-align="top"
            :clearable="true"
            :rules="rules"
          />
        </template>
        <template #label>请填写个人邮箱</template>
      </van-cell>
    </van-cell-group>
  </van-form>
  <van-dialog
    v-model:show="showState"
    title="个人邮箱"
    message="确认更改个人邮箱吗"
    show-cancel-button
    showConfirmButton
    @confirm="submitEmail"
  />
</template>
