<script setup>
import { getUserFansList, changeAttentionState } from "@/api/user";
import { useUserStore } from "@/store";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { showDialog, showToast } from "vant";

const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const buttonRefs = ref([]);
const fansList = ref({});
const getList = async () => {
  try {
    const { data } = await getUserFansList();
    fansList.value = data.userfans;
  } catch (error) {
    console.error("获取粉丝列表失败:", error);
    showToast("获取粉丝列表失败");
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

// 节流函数
function throttle(func, delay) {
  let lastTime = 0;
  return function (...args) {
    const nowTime = new Date().getTime();
    if (nowTime - lastTime > delay) {
      lastTime = nowTime;
      func.apply(this, args);
    }
  };
}

const changeRole = throttle(async index => {
  try {
    const { code } = await changeAttentionState({
      username: username,
      othername: 1
    });
    if (code == 200) {
      const buttonElement = buttonRefs.value[index];
      const currentText = buttonElement.textContent.trim();
      buttonElement.textContent = currentText === "关注" ? "已关注" : "关注";
    }
  } catch {
    console.error("Error in changeRole:", error);
    showDialog("修改异常请稍后重试");
  }
}, 800);
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
  background-color: #1989fa;
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
.van-text-ellipsis {
  width: 200px;
}
</style>
