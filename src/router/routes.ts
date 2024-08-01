import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Demo from "@/views/demo/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Login" },
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
    component: () => import("@/views/myPublish/index.vue"),
    meta: {
      title: "我发布的内容"
    }
  },
  {
    path: "/myCollect",
    name: "myCollect",
    component: () => import("@/views/myCollect/index.vue"),
    meta: {
      title: "我的收藏"
    }
  },
  {
    path: "/selfIntroduce",
    name: "selfIntroduce",
    component: () => import("@/views/selfIntroduce/index.vue"),
    meta: {
      title: "个人介绍"
    }
  },
  {
    path: "/feedBack",
    name: "feedBack",
    component: () => import("@/views/feedBack/index.vue"),
    meta: {
      title: "意见反馈"
    }
  },
  {
    path: "/sets",
    name: "sets",
    component: () => import("@/views/sets/index.vue"),
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
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/class",
    name: "Class",
    component: () => import("@/views/class/index.vue"),
    meta: {
      title: "全部班级分类"
    }
  },
  {
    path: "/topics",
    name: "Topics",
    component: () => import("@/views/topics/index.vue"),
    meta: {
      title: "全部话题分类"
    }
  },
  {
    path: "/topicDetail/:id",
    name: "TopicDetail",
    component: () => import("@/views/topicDetail/index.vue"),
    meta: {
      title: "话题专题"
    }
  },
  {
    path: "/postDetail/:id",
    name: "PostDetail",
    component: () => import("@/views/postDetail/index.vue"),
    meta: {
      title: "帖子详情"
    }
  },
  {
    path: "/classDetail/:id",
    name: "ClassDetail",
    component: () => import("@/views/classDetail/index.vue"),
    meta: {
      title: "班级专题"
    }
  }
];

export default routes;
