<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = new useRouter();
// 父传子
const props = defineProps({
  data: Object,
  icon: String,
  state1: String,
  state2: String
});
</script>
<template>
  <van-badge :dot="data.is_read">
    <van-cell center>
      <template #title>
        {{ data.name }}
      </template>
      <template #label>
        <div v-if="data.type">
          <span v-if="data.type === 0">{{ state1 }}</span>
          <span v-else>{{ state2 }}</span>
        </div>
        <div v-else>
          <span>{{ state1 }}</span>
        </div>
        <van-text-ellipsis :content="data.content" />
      </template>
      <template #value>
        <div>
          <i-icon :icon="icon" />
        </div>
        <div>{{ data.post_time }}</div>
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
  </van-badge>
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
