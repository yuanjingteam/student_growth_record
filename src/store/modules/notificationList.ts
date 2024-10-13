import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getManagerNotification } from "@/api/user";
import { getreportEmail } from "@/api/user";
import { getSystemNotification } from "@/api/user";
import {
  getUserThumNotification,
  getUserComNotification,
  getUserStarNotification
} from "@/api/user";
// import { showToast } from "vant";
//用户信息管理
export const useInformation = defineStore(
  "notication",
  () => {
    // 系统最新一条通知
    const systemData = ref({});
    // 管理员最新一条通知
    const managerData = ref({});

    // 用户未读消息
    const thumb = ref(0);
    const comment = ref(0);
    const star = ref(0);
    // 管理员未读消息数
    const manager_count = ref(0);
    // 系统未读消息数
    const system_count = ref(0);
    // 邮箱未读消息数
    const email_count = ref(0);

    // 用户消息未读数
    const user_count = computed(() => {
      return thumb.value + comment.value + star.value;
    });

    // 总数
    // 使用计算属性动态获取 total
    const total = computed(() => {
      return (
        user_count.value +
        manager_count.value +
        system_count.value +
        email_count.value
      );
    });
    // 互动通知
    // 默认活跃的tab栏
    const activeTab = ref(0);

    // 获取系统消息
    const systemNotice = async () => {
      const res = await getSystemNotification({
        page: 1,
        limit: 1
      });
      systemData.value = res.data;
      system_count.value = res.data.unread_count;
    };

    // 获取管理员消息
    const managerNotice = async () => {
      try {
        const res = await getManagerNotification({
          page: 1,
          limit: 1
        });
        managerData.value = res.data;
        manager_count.value = res.data.unread_count;
      } catch {}
    };

    // 获取缩略图通知的未读消息数量
    const userThumNotification = async () => {
      const res1 = await getUserThumNotification({
        page: 1,
        limit: 1
      });
      const thumUnreadCount = res1.data.unread_count;
      if (thumUnreadCount !== undefined) {
        thumb.value = thumUnreadCount;
      }
    };

    // 获取评论通知的未读消息数量
    const userComNotification = async () => {
      const res2 = await getUserComNotification({
        page: 1,
        limit: 1
      });
      const comUnreadCount = res2.data.unread_count;
      if (comUnreadCount !== undefined) {
        comment.value = comUnreadCount;
      }
    };

    // 获取关注通知的未读消息数量
    const userStarNotification = async () => {
      const res3 = await getUserStarNotification({
        page: 1,
        limit: 1
      });

      const starUnreadCount = res3.data.unread_count;
      if (starUnreadCount !== undefined) {
        star.value = starUnreadCount;
      }
    };

    // 获取页面消息
    const userNotice = async () => {
      userThumNotification();
      userComNotification();
      userStarNotification();
    };

    // 获取举报邮箱消息
    const reportEmail = async () => {
      try {
        const res = await getreportEmail({ page: 1, limit: 1 });
        email_count.value = res.data.unread_count;
      } catch {}
    };

    // 当前用户身份
    const storedRole = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("username");
    // 初始化函数
    const initNotifications = async () => {
      await Promise.all([systemNotice(), managerNotice(), userNotice()]);
      if (storedRole !== "user") {
        await reportEmail();
      }
      // 打印 total，确保它是最新的
      console.log("Total after initialization:", total.value);
    };

    // 连接SSE
    // 定义SSE链接参数
    const sseChatParams = {
      onopen: () => {
        console.log("建立无敌 SSE 连接成功");
      },
      url:
        import.meta.env.VITE_BASE_API +
        "/notification/socket_connection?username=" +
        encodeURIComponent(username),
      onmessage: event => {
        // 收到消息
        console.log("收到消息：", event.data);

        // 假设 event.data 是 JSON 格式的字符串，解析它
        const chunk = JSON.parse(event.data);

        // 根据 notice_type 处理不同的通知类型
        switch (chunk.notice_type) {
          case "0":
            userThumNotification();
            break;
          case "1":
            userStarNotification();
            break;
          case "2":
            userComNotification();
            break;
          case "3":
            systemNotice();
            break;
          case "4":
            managerNotice();
            break;
          case "5":
            // 暂时搁置,用其他方法代替
            if (storedRole !== "user") {
              reportEmail();
            }
            break;
          default:
            console.warn("未知通知类型：", chunk.notice_type);
        }
      },
      onclose: () => {
        console.log("连接已关闭");
      }
    };

    // 初始化 SSE 连接
    const initializeSSE = () => {
      const eventSource = new EventSource(sseChatParams.url);

      // 监听连接打开事件
      eventSource.onopen = sseChatParams.onopen;

      // 监听消息事件
      eventSource.onmessage = sseChatParams.onmessage;

      // 监听错误事件
      eventSource.onerror = event => {
        console.error("SSE 连接发生错误：", event);
      };

      // 可选：处理连接关闭
      eventSource.close = sseChatParams.onclose;
    };

    // 初始化消息
    initNotifications();
    // 调用函数以初始化 SSE
    initializeSSE();

    return {
      systemData,
      managerData,
      manager_count,
      system_count,
      user_count,
      email_count,
      total,
      activeTab,
      systemNotice,
      managerNotice,
      userThumNotification,
      userComNotification,
      userStarNotification,
      reportEmail,
      initNotifications
    };
  },
  {
    persist: true
  }
);
