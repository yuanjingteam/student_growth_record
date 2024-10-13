<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useInformation } from "@/store";

const infoStore = useInformation();
const router = useRouter();
// 父传子
const props = defineProps({
  base: Object
});

// 获取用户未读消息数
const unread_count = ref(0);
unread_count.value = computed(() => infoStore.user_count);
</script>
<template>
  <van-cell center @click="router.push('/userNotice')">
    <template #title>
      {{ base.userName }}
    </template>
    <template #value>
      <div v-if="unread_count.value !== 0" class="right-content">
        <van-badge :content="unread_count.value" />
      </div>
    </template>
    <template #label>
      <div v-if="unread_count.value !== 0" class="wid">您有新的消息通知</div>
      <div v-else class="wid">暂无消息</div>
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
