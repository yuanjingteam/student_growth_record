<script setup>
import { useRouter } from "vue-router";

const router = new useRouter();
// 父传子
const props = defineProps({
  data: Object,
  icon: String,
  state: String
});
</script>
<template>
  <van-cell center>
    <template #title>
      {{ data.name }}
    </template>
    <template #label>
      <span>{{ state }}</span>
      <van-text-ellipsis :content="data.article_content" />
    </template>
    <template #value>
      <div>
        <i-icon :icon="icon" />
      </div>
      <div>{{ data.not_time }}</div>
    </template>
    <template #icon>
      <van-image
        round
        width="4rem"
        height="4rem"
        :src="data.user_headshot"
        @click="router.push(`/otherInfo/${data.username}`)"
      />
    </template>
  </van-cell>
</template>

<style scoped>
.van-text-ellipsis {
  color: black;
  width: 240px;
}
.van-image {
  margin-right: 5px;
}
.i-icon {
  width: 25px;
  height: 25px;
}
</style>
