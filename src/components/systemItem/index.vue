<script setup>
import { ref } from "vue";

const props = defineProps({
  data: Object
});
let userImg =
  "https://student-grow.oss-cn-beijing.aliyuncs.com/image/system.png";
const formattedContent = content => {
  // 使用正则表达式替换 <br/> 标签为换行符
  return content.replace(/<br\s*\/?>/g, "\n");
};
</script>
<template>
  <van-cell-group inset>
    <van-cell is-link>
      <template #icon>
        <van-image
          v-if="userImg"
          round
          width="3rem"
          height="3rem"
          :src="userImg"
        />
      </template>
      <template #title>
        {{ data.ID }}
      </template>
      <template #label>
        <van-text-ellipsis :content="data.msg_time" />
      </template>
      <template #right-icon>
        <!-- <i-icon icon="ri:more-fill" /> -->
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <van-text-ellipsis
          rows="2"
          :content="formattedContent(data.msg_content)"
          expand-text="展开"
          collapse-text="收起"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<style scoped>
.van-cell-group {
  margin: 15px;
}
.van-cell {
  /* background: linear-gradient(to right, #f0f9ff, #d1ecf1); */
  background: linear-gradient(to right, #e7f1fa, #bfdbfe);
}
.van-image {
  margin: 2px 8px 0px 0px;
}
</style>
