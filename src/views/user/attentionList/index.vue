<script setup>
import { getAttentionList, changeAttentionState } from "@/api/user";
import { useUserStore } from "@/store";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";

const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const buttonRefs = ref([]);
const attentionList = ref({});
const getList = async () => {
  try {
    const { data } = await getAttentionList();
    attentionList.value = data.user_concern;
  } catch (error) {
    console.error("获取关注列表失败:", error);
    showToast("获取关注列表失败");
    // 你可以在这里添加错误提示等其他处理逻辑
  }
};

const setSmallRef = el => {
  if (el) {
    buttonRefs.value.push(el);
  }
};
nextTick(() => {
  console.dir(buttonRefs.value);
});

getList();

const changeRole = index => {
  const buttonElement = buttonRefs.value[index];
  const currentText = buttonElement.textContent.trim();
  buttonElement.textContent = currentText === "已关注" ? "关注" : "已关注";
  changState();
};

const changState = async () => {
  const { code } = await changeAttentionState({
    username: username,
    othername: 1
  });
  if (code == 200) {
  }
};
</script>
<template>
  <van-nav-bar
    title="我的关注"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <van-cell-group>
    <van-cell v-for="(item, index) in attentionList" :key="index">
      <template #title>{{ item.name }}</template>
      <template #value>
        <button :ref="setSmallRef" @click="changeRole(index)">已关注</button>
      </template>
      <template #label>
        <van-text-ellipsis :content="item.user_motto" />
      </template>
      <template #icon>
        <van-image round width="3rem" height="3rem" :src="item.user_headshot" />
      </template>
    </van-cell>
  </van-cell-group>
</template>
<style scoped>
button {
  background-color: red;
  border-radius: 5px;
  width: 68px;
  padding: 3px 0;
  margin-top: 6px;
  font-weight: 700;
  font-size: 13px;
  color: #fff;
}
</style>
