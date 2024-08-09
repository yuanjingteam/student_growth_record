<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { readManagerNotice } from "@/api/user";
import { useUserStore } from "@/store";
import { useInformation } from "@/store";

const userInfo = useInformation();
// 父传子
const props = defineProps({
  base: Object
});
const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const data = ref({
  manager_info: [
    {
      m_id: "",
      m_content: "",
      not_time: ""
    }
  ],
  unread_count: 0
});

// 获取管理员消息
data.value = userInfo.manager;

// 是否已读
const checkManager = async () => {
  const res = await readManagerNotice({ username: username });
  if (res.code == 200) {
    console.log("bbb");
  }

  router.push("./managerNotice");
};
</script>
<template>
  <van-cell center @click="checkManager">
    <template #title>
      {{ base.userName }}
    </template>
    <template #label>
      <van-text-ellipsis :content="data.manager_info[0].m_content" />
    </template>
    <template #value>
      <div class="right-content">
        <div class="va-time">{{ data.manager_info[0].not_time }}</div>
        <van-badge :content="data.unread_count" max="99" />
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
