<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// 父传子
const props = defineProps({
  base: Object,
  data: Object
});
// console.log(props.data);
const router = useRouter();
</script>
<template>
  <van-cell center>
    <template #title>
      {{ base.userName }}
    </template>
    <template #label>
      <van-text-ellipsis :content="data.message" />
    </template>
    <template #value>
      <div class="right-content">
        <div class="va-time">{{ data.time }}</div>
        <van-badge :content="data.count" max="99" />
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
  width: 240px;
}

.right-content .van-badge {
  margin: 10px 18px 0px 0px;
}

.van-image {
  margin-right: 13px;
}
</style>
