<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { readEmailNotice } from "@/api/user";
import { useUserStore, useInformation } from "@/store";
const userInfo = useInformation();
// 父传子
// 给一个默认值
const props = defineProps({
  base: Object
});
const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const data = ref({
  article_ban: [
    {
      article_id: 0,
      article_content: "",
      report_msg: "dawdwa",
      report_time: ""
    }
  ],
  unread_count: 0
});
const checkEmaill = async () => {
  try {
    const { code } = await readEmailNotice({ username: username });
    if (code === 200) {
      router.push("./permNotice");
    } else {
      console.error("请求失败:", res);
      showDialog("请求失败");
    }
  } catch (error) {
    console.error("请求出错:", error);
    showDialog("请求出错");
  }
};
// 获取举报邮箱
data.value = userInfo.email;
</script>
<template>
  <van-cell center @click="checkEmaill">
    <template #title>
      {{ base.userName }}
    </template>
    <template #value>
      <div class="right-content">
        <div class="va-time">{{ data.article_ban[0].report_time }}</div>
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
