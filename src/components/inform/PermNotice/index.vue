<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { readEmailNotice } from "@/api/user";
import { useUserStore } from "@/store";
import { useInformation } from "@/store";
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

// 获取举报邮箱
data.value = userInfo.email;

// 是否已读
const checkEmaill = async () => {
  const res = await readEmailNotice({ username: username });
  if (res.code == 200) {
    router.push("/permNotice");
  }
};
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
