import { defineStore } from "pinia";
import { ref } from "vue";
//用户信息管理
export const useInformation = defineStore(
  "notication",
  () => {
    // 系统通知
    const system = ref({});

    // 管理员通知
    const manager = ref({});

    // 互动通知
    // 点赞,评论,收藏
    const thumbs = ref({});
    const star = ref({});
    const comments = ref({});

    return {
      system,
      manager,
      thumbs,
      star,
      comments
    };
  },
  {
    persist: true
  }
);
