<script setup>
import {
  getUserThumNotification,
  getUserComNotification,
  getUserStarNotification
} from "@/api/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// 父传子
const props = defineProps({
  base: Object
});
const unread_count = ref();
// 获取页面消息
const userNotice = async () => {
  try {
    // 获取缩略图通知的未读消息数量
    const res1 = await getUserThumNotification({
      page: 1,
      limit: 1
    });
    const thumUnreadCount = res1.data.unread_count;

    // 获取评论通知的未读消息数量
    const res2 = await getUserComNotification({
      page: 1,
      limit: 1
    });
    const comUnreadCount = res2.data.unread_count;

    // 获取关注通知的未读消息数量
    const res3 = await getUserStarNotification({
      page: 1,
      limit: 1
    });
    const starUnreadCount = res3.data.unread_count;

    // 计算总的未读消息数量
    unread_count.value = thumUnreadCount + comUnreadCount + starUnreadCount;
  } catch {}
};
userNotice();
</script>
<template>
  <van-cell center @click="router.push('/userNotice')">
    <template #title>
      {{ base.userName }}
    </template>
    <template #value>
      <div v-if="unread_count !== 0" class="right-content">
        <van-badge :content="unread_count" />
      </div>
    </template>
    <template #label>
      <div v-if="unread_count !== 0" class="wid">您有新的消息通知</div>
    </template>
    <template #icon>
      <van-image round width="3rem" height="3rem" :src="base.userImg" />
    </template>
  </van-cell>
</template>

<style scoped>
.wid {
  color: black;
  width: 210px;
}

.right-content .van-badge {
  margin: 23px 18px 0px 0px;
}

.van-image {
  margin-right: 13px;
}
</style>
