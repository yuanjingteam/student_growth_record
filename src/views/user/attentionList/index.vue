<script setup>
import { getAttentionList, changeAttentionState } from "@/api/user";
import { useUserStore } from "@/store";
import { ref } from "vue";
const userStore = useUserStore();
const username = userStore.username;
const attentionList = ref({});
const buttonText = ref("已关注");
const getList = async () => {
  const { data } = await getAttentionList();
  attentionList.value = data.user_concern;
};
getList();
const changState = async () => {
  const { code } = await changeAttentionState({ username: username });
  if (code == 200) {
    changeRole();
  }
};
const changeRole = () => {
  buttonText.value = buttonText.value === "已关注" ? "关注" : "已关注";
};
</script>
<template>
  <van-cell-group>
    <van-cell v-for="(item, index) in attentionList" :key="index">
      <template #title>{{ item.name }}</template>
      <template #value>
        <button @click="changState()">{{ buttonText }}</button>
      </template>
      <template #label> {{ item.user_motto }} </template>
      <template #icon>
        <van-image round width="3rem" height="3rem" :src="item.user_headshot" />
      </template>
    </van-cell>
  </van-cell-group>
</template>
