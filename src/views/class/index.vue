<script setup>
import { reactive, ref } from "vue";

const classData = reactive({
  message: "班级分类",
  classList: [
    {
      id: 1,
      topic: "计科222",
      content: "超级大美女韩硕博"
    },
    {
      id: 2,
      topic: "计科223",
      content: "王2晗"
    },
    {
      id: 3,
      topic: "教育222",
      content: "方土匪"
    }
  ]
});
</script>

<template>
  <div class="topics">
    <category-card
      :message="classData.message"
      :list="classData.classList"
      :ifNeed="true"
    />
  </div>
</template>

<style scoped lang="less">
.topics {
  overflow: hidden;
  height: 100%;
  background-color: #f0f1f5;
}
</style>
