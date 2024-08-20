<script setup>
import { useUserStore } from "@/store";
import { changeUserPhone } from "@/api/user";
import { useRouter } from "vue-router";
import { showToast, showConfirmDialog } from "vant";
import { ref } from "vue";
const userStore = useUserStore();
const router = useRouter();
const text = ref(0);
const formRef = ref();

text.value = userStore.userData.phone_number;

// 更新用户电话
const submitPhone = async () => {
  const { code } = await changeUserPhone({
    username: userStore.username,
    phone_number: text
  });
  if (code == 200) {
    userStore.userData.phone_number = text;
  }
};

const rules = [
  {
    validator: value => {
      // 手机号正则
      const phoneRegex = /^1[3-9]\d{9}$/;
      return phoneRegex.test(value);
    },
    message: "请输入正确的手机号"
  }
];
const onClickRight = async () => {
  await formRef.value.validate();
  showConfirmDialog({
    title: "我的电话",
    message: "确认修改手机号吗?"
  })
    .then(async () => {
      // 更新电话
      try {
        await submitPhone();
        router.go(-1);
      } catch (error) {
        console.error("提交手机号码失败:", error);
        showToast("提交手机号码失败,请稍后重试");
      }
    })
    .catch(() => {
      // on cancel
    });
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
  <van-form ref="formRef">
    <van-cell-group inset>
      <van-cell>
        <template #title>
          <van-field
            v-model="text"
            label="我的电话"
            placeholder="填写手机号"
            label-align="top"
            :clearable="true"
            :rules="rules"
          />
        </template>
        <template #label>个人联系方式</template>
      </van-cell>
    </van-cell-group>
  </van-form>
</template>
