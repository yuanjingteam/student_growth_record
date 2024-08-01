<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
const id = route.params.id
console.log(id);
</script>
<template>
  <div>topicDetail</div>
</template>