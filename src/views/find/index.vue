<script setup>
import { getCommentsService } from '@/api/article'

const data = {
  "article_id": "string",
  "comment_way": "string",
  "comment_count": 0
}


const res = await getCommentsService(data)
console.log(res);



</script>

<template>
  <div>发现页find</div>
</template>