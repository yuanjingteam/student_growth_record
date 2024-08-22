<script setup>
import { getSelfCotnent } from "@/api/user";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const other = ref({});
const router = useRouter();

// 解析路由参数
const route = useRoute();

// 解析路由获取他人参数
let username = route.params.username;
const getOther = async () => {
  const { data } = await getSelfCotnent({ username: username });
  other.value = data;
};
getOther();
</script>
<template>
  <van-nav-bar
    left-text="返回"
    title="用户资料"
    left-arrow
    @click-left="router.go(-1)"
  />
  <van-cell-group inset>
    <van-cell title="详细资料" />
    <van-field v-model="other.selfContent" type="textarea" autosize readonly />
  </van-cell-group>
</template>
