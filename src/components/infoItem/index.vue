<script setup>
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
      {{ data.username }}
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
      <van-image round width="3rem" height="3rem" :src="data.user_headshot" />
    </template>
  </van-cell>
</template>

<style scoped>
.van-text-ellipsis {
  color: black;
  width: 240px;
}
</style>
