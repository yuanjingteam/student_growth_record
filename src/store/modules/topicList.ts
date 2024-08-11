import { defineStore } from "pinia";
import { ref } from "vue";
// import { getTopicListService } from "@/api/topic";

//话题分类列表管理
export const useTopicStore = defineStore(
  "topic",
  () => {
    const topicList = ref([
      {
        topic_id: "1",
        topic_name: "全部",
        topic_content: "hi复古式的回复i说大话覅u收到回复i是"
      },
      {
        topic_id: "2",
        topic_name: "学习成绩",
        topic_content: "hi复古式的回复i说大话覅u收到回复i是"
      },
      {
        topic_id: "3",
        topic_name: "获奖荣誉",
        topic_content: "hi复古式的回复i说大话覅u收到回复i是"
      },
      {
        topic_id: "4",
        topic_name: "志愿公益",
        topic_content: "hi复古式的回复i说大话覅u收到回复i是"
      },
      {
        topic_id: "5",
        topic_name: "文体活动",
        topic_content: "hi复古式的回复i说大话覅u收到回复i是"
      },

      {
        topic_id: "6",
        topic_name: "生活日常",
        topic_content: "hi复古式的回复i说大话覅u收到回复i是"
      }
    ]);

    const getTopicList = async () => {
      // const {
      //   data: { topic_list }
      // } = await getTopicListService();
      // topicList.value = topic_list;
      console.log("话题已更新");
    };

    const findTopicId = topicName => {
      const topic = topicList.value.find(
        topic => topic.topic_name === topicName
      );
      return topic ? topic.topic_id : null;
    };
    const findTopic = topicId => {
      const topic = topicList.value.find(topic => topic.topic_id === topicId);
      return topic ? topic : null;
    };
    return {
      topicList,
      getTopicList,
      findTopicId,
      findTopic
    };
  },
  {
    persist: true
  }
);
