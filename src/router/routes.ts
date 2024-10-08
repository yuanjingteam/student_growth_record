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
    path: "/editData",
    name: "editData",
    component: () => import("@/views/user/editData/index.vue"),
    meta: {
      title: "编辑资料"
    }
  },
  {
    path: "/editData/email",
    name: "email",
    component: () => import("@/views/user/editData/userEmail/index.vue"),
    meta: {
      title: "我的邮箱"
    }
  },
  {
    path: "/editData/motto",
    name: "motto",
    component: () => import("@/views/user/editData/userMotto/index.vue"),
    meta: {
      title: "个性签名"
    }
  },
  {
    path: "/editData/phone",
    name: "phone",
    component: () => import("@/views/user/editData/userPhone/index.vue"),
    meta: {
      title: "我的电话"
    }
  },
  {
    path: "/userFans/:username",
    name: "userFans",
    component: () => import("@/views/user/fansList/index.vue"),
    meta: {
      title: "粉丝列表"
    }
  },
  {
    path: "/userAttention/:username",
    name: "userAttention",
    component: () => import("@/views/user/attentionList/index.vue"),
    meta: {
      title: "关注列表"
    }
  },
  {
    path: "/myHistory",
    name: "myHistory",
    component: () => import("@/views/user/userHistory/index.vue"),
    meta: {
      title: "浏览记录"
    }
  },
  {
    path: "/myclass",
    name: "myclass",
    component: () => import("@/views/user/myClass/index.vue"),
    meta: {
      title: "我的班级"
    }
  },
  {
    path: "/myTracks",
    name: "myTracks",
    component: () => import("@/views/user/myTracks/index.vue"),
    meta: {
      title: "我的足迹"
    }
  },
  {
    path: "/integralConverter",
    name: "integralConverter",
    component: () => import("@/views/user/integralConverter/index.vue"),
    meta: {
      title: "积分换算器"
    }
  },
  {
    path: "/managerPublish",
    name: "managerPublish",
    component: () => import("@/views/user/managerPublish/index.vue"),
    meta: {
      title: "管理员发布通知"
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
    path: "/otherInfo/otherIntroduce/:username",
    name: "otherIntroduce",
    component: () => import("@/views/otherIntroduce/index.vue"),
    meta: {
      title: "他人介绍"
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
    component: () => import("@/views/user/aboutOur/feedBack/index.vue"),
    meta: {
      title: "意见反馈"
    }
  },
  {
    path: "/aboutOur",
    name: "aboutOur",
    component: () => import("@/views/user/aboutOur/index.vue"),
    meta: {
      title: "关于我们"
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
    path: "/changePwd",
    name: "changePwd",
    component: () => import("@/views/user/sets/changPassword/index.vue"),
    meta: {
      title: "修改密码"
    }
  },
  {
    path: "/otherInfo/:username",
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
  },
  {
    path: "/star",
    name: "StarDetail",
    component: () => import("@/views/starDetail/index.vue"),
    meta: {
      title: "成长之星专题"
    }
  },
  {
    path: "/useragree",
    name: "Useragree",
    component: () => import("@/views/userAgree/index.vue"),
    meta: {
      title: "用户协议"
    }
  },
  {
    path: "/privacyagree",
    name: "Privacyagree",
    component: () => import("@/views/privacyAgree/index.vue"),
    meta: {
      title: "用户协议"
    }
  },
  // 我说,这个是用户通知消息区
  {
    path: "/managerNotice",
    name: "managerNotice",
    component: () => import("@/views/inform/managerNotice/index.vue"),
    meta: {
      title: "管理员消息"
    }
  },
  {
    path: "/systemNotice",
    name: "systemNotice",
    component: () => import("@/views/inform/systemNotice/index.vue"),
    meta: {
      title: "系统消息"
    }
  },
  {
    path: "/userNotice",
    name: "userNotice",
    component: () => import("@/views/inform/userNotice/index.vue"),
    meta: {
      title: "互动消息"
    }
  },
  {
    path: "/permNotice",
    name: "permNotice",
    component: () => import("@/views/inform/PermNotice/index.vue"),
    meta: {
      title: "举报邮箱"
    }
  }
];
export default routes;
