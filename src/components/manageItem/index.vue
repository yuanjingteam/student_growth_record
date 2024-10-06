<script setup>
import { formattedContent } from "@/utils/functions/modules/formattedContent";

const props = defineProps({
  data: Object
});
// let userImg = "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg";
</script>
<template>
  <van-cell-group inset>
    <van-cell is-link>
      <template #icon>
        <van-image round width="3rem" height="3rem" :src="data.user_headshot" />
      </template>
      <template #title>
        {{ data.ID }}
      </template>
      <template #label>
        <van-text-ellipsis :content="data.msg_time" />
      </template>
      <template #right-icon>
        <div v-if="true">
          <!-- <i-icon icon="ri:more-fill" /> -->
        </div>
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
  background: linear-gradient(to right, #e7f1fa, #bfdbfe);
}
.van-image {
  margin: 2px 8px 0px 0px;
}
</style>
