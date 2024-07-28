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
    path: "/ publish",
    name: "Publish",
    component: () => import("@/views/articlePublish/index.vue"),
    meta: {
      title: "发布文章"
    }
  }
];

export default routes;
