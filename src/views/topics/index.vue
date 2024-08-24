<script setup>
import { useTopicStore } from "@/store";
import { reactive, ref } from "vue";

const useTopic = useTopicStore();
const topicData = reactive({
  message: "话题分类",
  topicList: []
});
topicData.topicList = useTopic.topicList;
</script>

<template>
  <div class="topics">
    <topic-card
      :message="topicData.message"
      :list="topicData.topicList.slice(1)"
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
