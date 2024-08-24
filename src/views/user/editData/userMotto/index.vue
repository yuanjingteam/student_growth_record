<script setup>
import { useUserStore } from "@/store";
import { changeUserMotto } from "@/api/user";
import { useRouter } from "vue-router";
import { showToast, showConfirmDialog } from "vant";
import { ref } from "vue";
const userStore = useUserStore();
const router = useRouter();
const text = ref("");
const formRef = ref();
const showState = ref(false);
text.value = userStore.userData.user_motto;
// 更新用户个签
const submitMotto = async () => {
  try {
    const { code } = await changeUserMotto({
      username: userStore.username,
      user_motto: text.value
    });
    showToast("修改成功");
    userStore.userData.user_motto = text;
    router.go(-1);
  } catch {
    showToast("修改失败,请稍后重试");
  }
};

const rules = [
  {
    validator: value => {
      // 个性签名长度校验
      if (value.trim().length === 0) {
        text.value = "";
        return "请输入内容";
      }
      if (value.length > 20) {
        return "个性签名不能超过20个字符";
      }
      // 个性签名内容校验
      const specialCharsRegex = /[`~!@#$%^&*()_+\-=[\]{};:"\\|,.<>/?]+/;
      if (specialCharsRegex.test(value)) {
        return "个性签名不能包含特殊字符";
      }
      return true;
    },
    message: error => error
  }
];

const onClickRight = async () => {
  await formRef.value.validate();
  showState.value = true;
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
  <van-form ref="formRef">
    <van-cell-group inset>
      <van-cell>
        <template #title>
          <van-field
            v-model="text"
            label="我的个签"
            placeholder="填写个性签名"
            label-align="top"
            :clearable="true"
            :rules="rules"
            :maxlength="20"
            type="textarea"
            show-word-limit
          />
        </template>
        <template #label>填写个签，彰显态度~</template>
      </van-cell>
    </van-cell-group>
  </van-form>
  <van-dialog
    v-model:show="showState"
    title="提交个签"
    message="确认修改个性签名吗"
    show-cancel-button
    showConfirmButton
    @confirm="submitMotto"
  />
</template>
<style scoped></style>
