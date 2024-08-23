import { defineStore } from "pinia";
import { ref } from "vue";
import { getTopicListService } from "@/api/topic";

//话题分类列表管理
export const useTopicStore = defineStore(
  "topic",
  () => {
    const topicList = ref([]);

    const getTopicList = async () => {
      const {
        data: { topic_list }
      } = await getTopicListService();
      topicList.value = topic_list;
    };
    // const findTopicId = (topicName: String) => {
    //   const topic = topicList.value.find(
    //     topic => topic.topic_name === topicName
    //   );
    //   return topic ? topic.ID : null;
    // };

    return {
      topicList,
      getTopicList
      // findTopicId
    };
  },
  {
    persist: true
  }
);
