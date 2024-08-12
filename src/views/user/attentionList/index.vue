<script>
import { getAttentionList } from "@/api/user";
const attentionList = ref({});
const buttonText = ref("已关注");
const getList = async () => {
  const { data } = await getAttentionList();
  attentionList = data.user_concern;
};
getList();

const changeRole = buttonText => {
  buttonText = buttonText === "已关注" ? "关注" : "已关注";
};
</script>
<template>
  <van-cell-group>
    <van-cell v-for="(item, index) in attentionList" :key="index">
      <template #title>{{ item.name }}</template>
      <template #value>
        <button @click="changeRole(buttonText)">{{ buttonText }}</button>
      </template>
      <template #label> {{ item.user_motto }} </template>
      <template #icon>
        <van-image round width="3rem" height="3rem" :src="item.user_headshot" />
      </template>
    </van-cell>
  </van-cell-group>
</template>
