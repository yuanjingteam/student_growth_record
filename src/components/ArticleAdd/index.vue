<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
// 父传子
const props = defineProps({
  offset: Object
});
console.log(props.offset);
const handleClick = () => {
  router.push("/demo");
};
</script>
<template>
  <van-floating-bubble
    :offset="offset"
    icon="plus"
    axis="lock"
    @click="router.push('/publish')"
  />
</template>
<style scoped></style>
