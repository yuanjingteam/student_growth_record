<script setup>
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { ref } from "vue";

const userStore = useUserStore();
const router = useRouter();
const text = ref("");
text.value = userStore.userData.user_motto;

const onClickRight = () => {
  // 更新个签
  userStore.submitMotto({ username: userStore.username, user_motto: text });
  router.go(-1);
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
