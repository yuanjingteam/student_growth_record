<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { readSystemNotice } from "@/api/user";
import { useUserStore } from "@/store";
import { useInformation } from "@/store";
import { showDialog } from "vant";

const useInfo = useInformation();
// 父传子
const props = defineProps({
  base: Object
});
const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const data = ref({
  admin_info: [
    {
      ID: "",
      msg_content: "",
      msg_time: ""
    }
  ],
  unread_count: 0
});

// 获取系统消息
data.value = useInfo.system;

// 是否已读
const checkSystem = async () => {
  try {
    const res = await readSystemNotice({ username: username });
    if (res.code == 200) {
      console.log("aaa");
      router.push("/systemNotice");
    }
  } catch (error) {
    console.error("请求出错", error);
    showDialog("请求出错");
  }
};
</script>
<template>
  <van-cell center @click="checkSystem">
    <template #title>
      {{ base.userName }}
    </template>
    <template #label>
      <van-text-ellipsis :content="data.admin_info[0].msg_content" />
    </template>
    <template #value>
      <div class="right-content">
        <div class="va-time">{{ data.admin_info[0].msg_time }}</div>
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
