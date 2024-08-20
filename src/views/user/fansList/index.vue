<script setup>
import { getUserFansList, changeAttentionState } from "@/api/user";
import { useUserStore } from "@/store";
import { ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { showToast } from "vant";

const router = useRouter();
const userStore = useUserStore();
let username = userStore.username;
// 解析路由获取是否为本人
let routerName = route.params.username;
const own = ref(true);
// 解析路由参数
const route = useRoute();
// 判断是否有路由
if (routerName) {
  username = routerName;
  console.log(username, "他人用户信息");
}
const buttonRefs = ref([]);
const fansList = ref({});
const getList = async () => {
  try {
    const { data } = await getUserFansList({ username: username });
    fansList.value = data.user_fans;
  } catch (error) {
    showToast("获取粉丝列表失败");
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

const changeRole = throttle(async (othername, index) => {
  try {
    const { code } = await changeAttentionState({
      username: username,
      othername: othername
    });
    if (code == 200) {
      const buttonElement = buttonRefs.value[index];
      const currentText = buttonElement.textContent.trim();
      buttonElement.textContent = currentText === "关注" ? "已关注" : "关注";
    }
  } catch {
    showToast("修改异常请稍后重试");
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
        <button :ref="setSmallRef" @click="changeRole(item.username, index)">
          关注
        </button>
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
