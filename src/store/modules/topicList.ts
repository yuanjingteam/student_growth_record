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
      topic_list.unshift({
        ID: 0,
        topic_name: "全部话题",
        topic_content: ""
      });
      topicList.value = topic_list;
    };

    return {
      topicList,
      getTopicList
    };
  },
  {
    persist: true
  }
);
