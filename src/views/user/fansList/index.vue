<script setup>
import { getUserFansList, changeAttentionState } from "@/api/user";
import { useUserStore } from "@/store";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const buttonRefs = ref([]);
const fansList = ref({});
const getList = async () => {
  const { data } = await getUserFansList();
  fansList.value = data.userfans;
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
  buttonElement.textContent = currentText === "关注" ? "已关注" : "关注";
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
    title="我的粉丝"
    left-text="返回"
    left-arrow
    @click-left="router.go(-1)"
  />
  <van-cell-group>
    <van-cell v-for="(item, index) in fansList" :key="index" center>
      <template #title>{{ item.name }}</template>
      <template #value>
        <button :ref="setSmallRef" @click="changeRole(index)">关注</button>
      </template>
      <template #label>
        <van-text-ellipsis :content="item.user_motto" />
      </template>
      <template #icon>
        <van-image
          round
          width="3rem"
          height="3rem"
          :src="item.user_headshot"
          @click="router.push(`/otherInfo/${item.username}`)"
        />
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
.van-image {
  margin-right: 5px;
}
</style>
