<script setup>
import { getUserFansList, changeAttentionState } from "@/api/user";
import { useUserStore } from "@/store";
const userStore = useUserStore();
const username = userStore.username;
import { ref } from "vue";
const fansList = ref({});
const buttonText = ref("关注");
const getList = async () => {
  const { data } = await getUserFansList();
  fansList.value = data.userfans;
};

const changState = async () => {
  const { code } = await changeAttentionState({ username: username });
  if (code == 200) {
    changeRole();
  }
};
getList();
const changeRole = () => {
  buttonText.value = buttonText.value === "关注" ? "已关注" : "关注";
};
</script>
<template>
  <van-cell-group>
    <van-cell v-for="(item, index) in fansList" :key="index">
      <template #title>{{ item.name }}</template>
      <template #value>
        <button @click="changState()">{{ buttonText }}</button>
      </template>
      <template #label>{{ item.user_motto }}</template>
      <template #icon>
        <van-image round width="3rem" height="3rem" :src="item.user_headshot" />
      </template>
    </van-cell>
  </van-cell-group>
</template>
