<script setup>
import { readUserNotice } from "@/api/user";
import { useUserStore } from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useInformation } from "@/store";
const userInfo = useInformation();
const router = useRouter();
// 父传子
const props = defineProps({
  base: Object
});
const userStore = useUserStore();
const username = userStore.username;
const data = ref({
  thumbsUp: [
    {
      not_time: ""
    }
  ],
  unread_count: 0
});

// 获取页面消息
data.value = userInfo.thumbs;

// 是否已读
const checkUser = async () => {
  try {
    const { data, code, msg } = await readUserNotice({ username: username });
    if (code === 200) {
      console.log("ccc");
      router.push("./userNotice");
    } else {
      console.error("获取用户通知失败:", msg);
    }
  } catch (error) {
    console.error("获取用户通知出错:", error);
  }
};
</script>
<template>
  <van-cell center @click="checkUser">
    <template #title>
      {{ base.userName }}
    </template>
    <template #value>
      <div class="right-content">
        <div class="va-time">{{ data.thumbsUp[0].not_time }}</div>
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
