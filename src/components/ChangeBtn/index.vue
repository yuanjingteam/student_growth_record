<script setup>
import { getArticlesService, getCommentsService } from "@/api/article";
import { ref } from "vue";
const commentData = ref({
  article_id: "",
  comment_way: "",
  comment_count: 5
});
const props = defineProps({
  article_id: Number
});

// const res = await getArticlesService()
// console.log(res);
const isActive = ref(false);
const getNew = async state => {
  isActive.value = !isActive.value;
  commentData.value.article_id = props.article_id;
  commentData.value.comment_way = state;
  // const res = await getCommentsService(commentData)
};
</script>

<template>
  <div class="btn-box">
    <li class="new" :class="{ active: !isActive }" @click="getNew('new')">
      最新
    </li>
    <li class="hot" :class="{ active: isActive }" @click="getNew('hot')">
      最热
    </li>
  </div>
</template>

<style scoped>
* {
  list-style: none;
}

.btn-box {
  border-radius: 12px;
  width: 80px;
  height: 30px;
  background-color: #f0f1f5;
  display: flex;
  justify-content: space-between;
  padding: 2px;
  font-weight: 600;
}

.new,
.hot {
  height: 100%;
  width: 50%;
  text-align: center;
  line-height: 25px;
  font-size: 12px;
  border-radius: 12px;
  color: rgba(166, 168, 173, 1);
}

.active {
  background-color: #fff;
  color: #000;
}
</style>
