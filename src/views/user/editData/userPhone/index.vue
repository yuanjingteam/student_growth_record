<script setup>
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { ref } from "vue";
const userStore = useUserStore();
const router = useRouter();
const text = ref(0);
text.value = userStore.userData.phone_number;
const onClickRight = () => {
  // 更新电话
  userStore.submitPhone({ username: userStore.username, phone_number: text });
  router.go(-1);
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
