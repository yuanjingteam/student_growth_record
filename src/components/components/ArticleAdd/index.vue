<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <van-floating-bubble
    icon="plus"
    axis="lock"
    :style="{ top: '-150px' }"
    @click="router.push('/publish')"
  />
</template>
<style scoped></style>
