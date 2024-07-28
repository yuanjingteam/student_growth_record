<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  offset: Object
});
console.log(props.offset);
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
