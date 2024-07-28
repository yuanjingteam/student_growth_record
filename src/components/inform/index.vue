<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const data = reactive({
  userName: "系统通知",
  userContent: "dawdawfaaaaa打啊文金轮法王`aaaaaaaaaaaaaaaaaaaaafaw",
  time: "08:10"
});
const router = useRouter();
</script>
<template>
  <van-cell center :title="data.userName" @click="router.push('/home')">
    <template #label>
      <van-text-ellipsis :content="data.userContent" />
    </template>
    <template #value>
      <div class="va-time">{{ data.time }}</div>
    </template>
    <template #icon>
      <van-image
        round
        width="3rem"
        height="3rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </template>
  </van-cell>
</template>

<style scoped>
.van-text-ellipsis {
  color: black;
  width: 240px;
}
.va-time {
  padding-bottom: 25px;
}
.van-image {
  margin-right: 13px;
}
</style>
