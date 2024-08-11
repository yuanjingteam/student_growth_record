import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getSystemNotification,
  getManagerNotification,
  getreportEmail,
  getUserThumNotification,
  getUserStarNotification,
  getUserComNotification
} from "@/api/user";
import { useUserStore } from "@/store";
//用户信息管理
export const useInformation = defineStore(
  "notication",
  () => {
    const userStore = useUserStore();

    // 系统通知
    const system = ref({});

    // 管理员通知
    const manager = ref({});

    // 举报邮箱
    const email = ref({});

    // 互动通知
    // 点赞,评论,收藏
    const thumbs = ref({});
    const star = ref({});
    const comments = ref({});

    const page = 1;
    const username = userStore.username;
    // 获取系统消息
    const systemNotification = async () => {
      const { data } = await getSystemNotification({ page: page });
      system.value = data;
    };
    // 获取管理员消息
    const managerNotification = async () => {
      const { data } = await getManagerNotification({ page: page });
      manager.value = data;
    };
    // 获取举报邮箱
    const reportEmail = async () => {
      const { data } = await getreportEmail({ page: page });
      email.value = data;
    };

    // 获取点赞列表
    const thumNotification = async () => {
      const { data } = await getUserThumNotification({
        page: page,
        username: username
      });
      thumbs.value = data;
    };

    // 获取收藏列表
    const starNotification = async () => {
      const { data } = await getUserStarNotification({
        page: page,
        username: username
      });
      star.value = data;
    };

    // 获取评论列表
    const comNotification = async () => {
      const { data } = await getUserComNotification({
        page: page,
        username: username
      });
      comments.value = data;
    };

    systemNotification();
    managerNotification();
    reportEmail();
    getreportEmail();
    thumNotification();
    starNotification();
    comNotification();

    return {
      system,
      manager,
      email,
      thumbs,
      star,
      comments,
      systemNotification,
      managerNotification,
      reportEmail,
      thumNotification,
      starNotification,
      comNotification
    };
  },
  {
    persist: true
  }
);
