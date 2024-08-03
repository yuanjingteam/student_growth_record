import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Demo from "@/views/demo/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Demo" },
    children: [
      {
        path: "demo",
        name: "Demo",
        component: Demo,
        meta: {
          title: "首页"
        }
      },
      {
        path: "find",
        name: "Find",
        component: () => import("@/views/find/index.vue"),
        meta: {
          title: "发现"
        }
      },
      {
        path: "inform",
        name: "Inform",
        component: () => import("@/views/inform/index.vue"),
        meta: {
          title: "通知"
          //在路由更新时强制刷新页面内容，而不使用缓存中的数据。
          //控制页面是否需要被缓存。
          // noCache: true
        }
      },
      {
        path: "user",
        name: "User",
        component: () => import("@/views/user/index.vue"),
        meta: {
          title: "我的"
        }
      }
    ]
  },
  {
    path: "/editData",
    name: "editData",
    component: () => import("@/views/user/editData/index.vue"),
    meta: {
      title: "编辑资料"
    }
  },
  {
    path: "/articleWait",
    name: "articleWait",
    component: () => import("@/views/articleWait/index.vue"),
    meta: {
      title: "消息通知"
    }
  },
  {
    path: "/publish",
    name: "Publish",
    component: () => import("@/views/articlePublish/index.vue"),
    meta: {
      title: "发布文章"
    }
  },
  {
    path: "/myPublish",
    name: "myPublish",
    component: () => import("@/views/user/myPublish/index.vue"),
    meta: {
      title: "我发布的内容"
    }
  },
  {
    path: "/myCollect",
    name: "myCollect",
    component: () => import("@/views/user/myCollect/index.vue"),
    meta: {
      title: "我的收藏"
    }
  },
  {
    path: "/selfIntroduce",
    name: "selfIntroduce",
    component: () => import("@/views/user/selfIntroduce/index.vue"),
    meta: {
      title: "个人介绍"
    }
  },
  {
    path: "/feedBack",
    name: "feedBack",
    component: () => import("@/views/user/feedBack/index.vue"),
    meta: {
      title: "意见反馈"
    }
  },
  {
    path: "/sets",
    name: "sets",
    component: () => import("@/views/user/sets/index.vue"),
    meta: {
      title: "设置"
    }
  },
  {
    path: "/otherInfo",
    name: "otherInfo",
    component: () => import("@/views/otherInfo/index.vue"),
    meta: {
      title: "他人信息"
    }
  }
];

export default routes;
