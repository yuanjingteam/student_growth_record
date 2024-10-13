<script setup>
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { readSystemNotice } from "@/api/user";
import { formattedContent } from "@/utils/functions/modules/formattedContent";
import { useInformation } from "@/store";

const infoStore = useInformation();
// 父传子
const props = defineProps({
  base: Object
});
const router = useRouter();
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
data.value = infoStore.systemData;
// 是否已读
const checkSystem = async () => {
  router.push("/systemNotice");
  await readSystemNotice();

  // 获取最新
  infoStore.systemNotice();
};

watch(
  () => infoStore.systemData,
  newVal => {
    data.value = newVal; // 更新 data.value
  }
);
</script>
<template>
  <van-cell center @click="checkSystem">
    <template #title>
      {{ base.userName }}
    </template>
    <template #label>
      <div v-if="data.admin_info.length !== 0">
        <van-text-ellipsis
          :content="formattedContent(data.admin_info[0].msg_content)"
        />
      </div>
    </template>
    <template #value>
      <div class="right-content">
        <div v-if="data.admin_info.length !== 0" class="va-time">
          {{ data.admin_info[0].msg_time }}
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
