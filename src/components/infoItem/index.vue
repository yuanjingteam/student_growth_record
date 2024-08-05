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
      {{ data.userName }}
    </template>
    <template #label>
      <span>{{ state }}</span>
      <van-text-ellipsis :content="data.message" />
    </template>
    <template #value>
      <div>
        <i-icon :icon="icon" />
      </div>
    </template>
    <template #icon>
      <van-image round width="3rem" height="3rem" :src="data.userAvatar" />
    </template>
  </van-cell>
</template>
