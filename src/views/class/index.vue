<script setup>
import { useClassStore } from "@/store";
import { reactive, ref } from "vue";

const useClass = useClassStore();
const classData = reactive({
  message: "班级分类",
  classList: []
});
classData.classList = useClass.classList;
</script>

<template>
  <div class="topics">
    <class-card
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
