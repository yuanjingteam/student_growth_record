<script setup>
import { ref } from "vue";

const props = defineProps({
  data: Object
});
let userImg = "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg";
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
        {{ data.m_id }}
      </template>
      <template #label>
        <van-text-ellipsis :content="data.not_time" />
      </template>
      <template #right-icon>
        <i-icon icon="ri:more-fill" />
      </template>
    </van-cell>
    <van-cell>
      <template #title>
        <van-text-ellipsis
          rows="2"
          :content="data.m_content"
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
  background-color: pink;
}
</style>
