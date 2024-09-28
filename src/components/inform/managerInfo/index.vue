<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { readManagerNotice } from "@/api/user";
import { showDialog } from "vant";
import { getManagerNotification } from "@/api/user";
import { formattedContent } from "@/utils/functions/modules/formattedContent";

// 父传子
const props = defineProps({
  base: Object
});
const router = useRouter();
const data = ref({
  manager_info: [
    {
      id: "",
      msg_content: "",
      msg_time: ""
    }
  ],
  unread_count: 0
});

// 获取管理员消息
const managerNotification = async () => {
  try {
    const res = await getManagerNotification({
      page: 1,
      limit: 1
    });
    data.value = res.data;
  } catch {}
};
managerNotification();
// 是否已读
const checkManager = async () => {
  router.push("./managerNotice");
  const { code } = await readManagerNotice();
};
</script>
<template>
  <van-cell center @click="checkManager">
    <template #title>
      {{ base.userName }}
    </template>
    <template #label>
      <div v-if="data.manager_info.length !== 0">
        <van-text-ellipsis
          :content="formattedContent(data.manager_info[0].msg_content)"
        />
      </div>
    </template>
    <template #value>
      <div class="right-content">
        <div v-if="data.manager_info.length !== 0" class="va-time">
          {{ data.manager_info[0].msg_time }}
        </div>
        <div v-if="data.unread_count !== 0">
          <van-badge :content="data.unread_count" max="99" />
        </div>
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
  width: 210px;
}

.right-content .van-badge {
  margin: 10px 18px 0px 0px;
}

.van-image {
  margin-right: 13px;
}
</style>
