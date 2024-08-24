<script setup>
import { useRouter } from "vue-router";
import { readUserNotice } from "@/api/user";
import { useUserStore } from "@/store";
const router = new useRouter();
// 父传子
const props = defineProps({
  data: Object,
  icon: String,
  type: Number,
  state1: String,
  state2: String
});
const userStore = useUserStore();
const username = userStore.username;
const checkOne = async () => {
  router.push(`/postDetail/${props.data.article_id}`);
  console.log(props.type, 34280452834);
  await readUserNotice({
    msg_id: props.data.msg_id,
    type: props.type
  });
};
const goto = () => {
  if (username === props.data.username) {
    router.push(`/myPublish`);
  } else {
    router.push(`/otherInfo/${props.data.username}`);
  }
};
</script>
<template>
  <van-badge :dot="data.is_read == false" :offset="[-12, 20]">
    <van-cell center>
      <template #title>
        {{ data.name }}
      </template>
      <template #label>
        <div @click="checkOne">
          <div v-if="data.type">
            <span v-if="data.type === 0">{{ state1 }}</span>
            <span v-else>{{ state2 }}</span>
          </div>
          <div v-else>
            <span>{{ state1 }}</span>
          </div>
          <van-text-ellipsis :content="data.content" />
        </div>
      </template>
      <template #value>
        <div>
          <i-icon :icon="icon" />
        </div>
        <div class="post_time">{{ data.post_time }}</div>
      </template>
      <template #icon>
        <van-image
          round
          width="4rem"
          height="4rem"
          :src="data.user_headshot"
          @click="goto"
        />
      </template>
    </van-cell>
  </van-badge>
</template>

<style scoped>
.post_time {
  width: 70px;
}
.van-text-ellipsis {
  color: black;
  width: 210px;
}
.van-image {
  margin-right: 5px;
}
.i-icon {
  width: 25px;
  height: 25px;
}
</style>
