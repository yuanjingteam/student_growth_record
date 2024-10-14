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
import { showToast } from "vant";
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

    // 通用的获取未读通知数量的函数
    const fetchNotificationCount = async (fetchFunction, refData, refCount) => {
      try {
        const res = await fetchFunction({ page: 1, limit: 1 });
        if (refData != null) {
          refData.value = res.data;
        }
        refCount.value = res.data.unread_count;
      } catch (error) {
        console.error("获取通知时发生错误：", error);
      }
    };

    // 获取系统消息
    const systemNotice = () => {
      fetchNotificationCount(getSystemNotification, systemData, system_count);
    };

    // 获取管理员消息
    const managerNotice = () => {
      fetchNotificationCount(
        getManagerNotification,
        managerData,
        manager_count
      );
    };

    // 获取点赞通知的未读消息数量
    const userThumNotification = () => {
      fetchNotificationCount(getUserThumNotification, null, thumb);
    };

    // 获取评论通知的未读消息数量
    const userComNotification = () => {
      fetchNotificationCount(getUserComNotification, null, comment);
    };

    // 获取收藏通知的未读消息数量
    const userStarNotification = () => {
      fetchNotificationCount(getUserStarNotification, null, star);
    };

    // 获取举报邮箱消息
    const reportEmail = async () => {
      fetchNotificationCount(getreportEmail, null, email_count);
    };

    // 获取页面消息
    const userNotice = async () => {
      await Promise.all([
        userThumNotification(),
        userComNotification(),
        userStarNotification()
      ]);
    };

    // 当前用户身份
    const storedRole = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("username");
    // 初始化函数
    const initNotifications = () => {
      systemNotice();
      managerNotice();
      userNotice();
      if (storedRole !== "user") {
        reportEmail();
      }
      // 打印 total，确保它是最新的
      console.log("Total after initialization:", total.value);
    };

    // 连接SSE
    // 定义SSE链接参数
    const sseChatParams = {
      onopen: () => {
        console.log("建立 SSE 连接成功");
      },
      url:
        import.meta.env.VITE_BASE_API +
        "/notification/socket_connection?username=" +
        encodeURIComponent(username),
      onmessage: event => {
        // 收到消息
        const chunk = JSON.parse(event.data);
        console.log("收到的类型：", chunk.NoticeType, 222);

        // 根据 notice_type 处理不同的通知类型
        switch (chunk.NoticeType) {
          case 0:
            userThumNotification();
            break;
          case 1:
            userStarNotification();
            break;
          case 2:
            userComNotification();
            break;
          case 3:
            systemNotice();
            break;
          case 4:
            managerNotice();
            break;
          case 5:
            // 暂时搁置,用其他方法代替
            if (storedRole !== "user") {
              reportEmail();
            }
            break;
          default:
            console.warn("未知通知类型：", chunk.NoticeType);
        }
        showToast({
          message: "您有新的消息通知",

          position: "top"
        });
      }
    };

    // 初始化 SSE 连接
    let eventSource: EventSource;
    const initializeSSE = () => {
      // 监听连接打开事件
      eventSource = new EventSource(sseChatParams.url);
      eventSource.onopen = sseChatParams.onopen;

      // 监听消息事件
      eventSource.onmessage = sseChatParams.onmessage;

      // 监听错误事件
      eventSource.onerror = event => {
        console.error("SSE 连接发生错误：", event);
      };
    };

    // 关闭 SSE 连接
    const closeConnection = () => {
      eventSource.close();
      console.log("SSE 连接已手动关闭");
    };

    if (username != "passenger") {
      // 初始化消息
      initNotifications();
      // 初始化 SSE
      initializeSSE();
    }

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
      closeConnection
    };
  },
  {
    persist: true
  }
);
