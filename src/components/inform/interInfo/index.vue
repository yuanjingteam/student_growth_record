<script setup>
import { getUserNotification, readUserNotice } from "@/api/user";
import { useUserStore } from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// 父传子
const props = defineProps({
  base: Object
});
const userStore = useUserStore();
const username = userStore.username;
const data = ref({
  unread_count: 0,
  not_time: ""
});

// 是否已读
const checkUser = async () => {
  const res = await readUserNotice({ username: username });
  if (res.code == 200) {
    console.log("ccc");
  }
  router.push("./userNotice");
};

// 获取页面消息
const userNitification = async () => {
  const res = await getUserNotification({ username: username });
  data.value = res.data;
};
userNitification();
</script>
<template>
  <van-cell center @click="checkUser">
    <template #title>
      {{ base.userName }}
    </template>
    <template #value>
      <div class="right-content">
        <div class="va-time">{{ data.not_time }}</div>
        <van-badge :content="data.unread_count" />
      </div>
    </template>
    <template #icon>
      <van-image round width="3rem" height="3rem" :src="base.userImg" />
    </template>
  </van-cell>
</template>

<style scoped>
.van-text-ellipsis {
  color: black;
  width: 240px;
}

.right-content .van-badge {
  margin: 10px 18px 0px 0px;
}

.van-image {
  margin-right: 13px;
}
</style>
