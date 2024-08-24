<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getreportEmail } from "@/api/user";
// 父传子
// 给一个默认值
const props = defineProps({
  base: Object
});
const router = useRouter();
const data = ref({
  article_ban: [
    {
      article_id: 0,
      article_content: "",
      report_msg: "",
      report_time: ""
    }
  ],
  unread_count: 0
});

// 获取举报邮箱
const reportEmail = async () => {
  try {
    const res = await getreportEmail({ limit: 1, page: 1 });
    data.value = res.data;
  } catch {}
};
reportEmail();
</script>
<template>
  <van-cell center @click="router.push('/permNotice')">
    <template #title>
      {{ base.userName }}
    </template>
    <template #value>
      <div class="right-content">
        <div v-if="data.unread_count !== 0">
          <van-badge :content="data.unread_count" max="99" />
        </div>
      </div>
    </template>
    <template #label>
      <div class="wid">
        <div v-if="data.unread_count !== 0">有待处理的消息</div>
        <div v-if="data.unread_count === 0">
          没有待处理的消息,去别的地方逛逛吧~
        </div>
      </div>
    </template>
    <template #icon>
      <van-image round width="3rem" height="3rem" :src="base.userImg" />
    </template>
  </van-cell>
</template>

<style scoped>
.wid {
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
