<script setup>
import { getSelfCotnent } from "@/api/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
const other = ref({});
const router = useRouter();
const getOther = async () => {
  const { data } = await getSelfCotnent();
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
