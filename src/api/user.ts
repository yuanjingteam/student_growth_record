import { http } from "@/utils/http";

type ListResult = {
  code: number;
  message: string;
  data: Object;
};

// 用户信息
type userList = {
  code: number;
  data: {
    username: string;
    user_headshot: string;
    user_motto: string;
    userfans: number;
    user_concern: number;
    user_like: number;
    score: 0;
    user_class: string;
    user_Identity: string;
  };
  msg: string;
};

// 用户详细资料
type UserData = {
  code: number;
  message: string;
  data: {
    name: string;
    user_headshot: string;
    user_class: string;
    user_gender: string;
    user_motto: string;
    user_Identity: string;
    phone_number: number;
    user_email: string;
    user_year: string;
  };
};

// 系统通知列表
type adminList = {
  code: 0;
  data: {
    admin_info: [
      {
        a_id: string;
        a_content: string;
        not_time: string;
      }
    ];
    unread_count: number;
  };
};

// 管理员列表
type managerList = {
  code: 0;
  data: {
    manager_info: [
      {
        m_id: string;
        m_content: string;
        not_time: string;
      }
    ];
    unread_count: number;
  };
};

// 点赞列表
type thumbsList = {
  code: 0;
  data: {
    thumbsUp: [
      {
        username: string;
        article_content: string;
        user_headshot: string;
        not_time: string;
      }
    ];
    unread_count: number;
  };
};

// 收藏列表
type starList = {
  code: 0;
  data: {
    star: [
      {
        username: "";
        article_content: "";
        user_headshot: "";
        not_time: "";
      }
    ];
    unread_count: 0;
  };
};

// 评论列表
type comList = {
  code: 0;
  data: {
    comments: [
      {
        username: "";
        article_content: "";
        user_headshot: "";
        not_time: "";
      }
    ];
    unread_count: 0;
  };
};

// 获取登录页标题
export function getLoginTitle(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/title",
    method: "get",
    data
  });
}

// 获取用户信息
export function getUserInfo(data?: Object): Promise<userList> {
  return http.request({
    url: "/user/profiles",
    method: "get",
    data: JSON.stringify(data)
  });
}

//获取图形验证码
export function getVerifyImg(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/code",
    method: "post",
    data: JSON.stringify(data)
  });
}
//登录
export function userLogin(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/qlogin",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取用户资料
export function getUserData(data?: Object): Promise<UserData> {
  return http.request({
    url: "/user/getUserData",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 修改用户头像
export function changeUserHeadshot(formdata?: FormData): Promise<ListResult> {
  return http.request({
    url: "/user/updateUserHeadshot",
    method: "post",
    data: formdata
  });
}

// 修改用户个性签名
export function changeUserMotto(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/updateUserMotto",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改用户手机号
export function changeUserPhone(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/updateUserPhone",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改用户邮箱
export function changeUserEmail(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/updateUserEmail",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取系统消息列表
export function getSystemNotification(data?: Object): Promise<adminList> {
  return http.request({
    url: "/message/get_system",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取管理员消息列表
export function getManagerNotification(data?: Object): Promise<managerList> {
  return http.request({
    url: "/message/get_manager",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取举报邮箱
export function getreportEmail(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/report_box/getlist",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 已读系统消息
export function readSystemNotice(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/system/read_notice",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 已读管理员消息
export function readManagerNotice(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/manager/read_notice",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 已读邮箱消息
export function readEmailNotice(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/report_box/getlist",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取互动消息点赞列表
export function getUserThumNotification(data?: Object): Promise<thumbsList> {
  return http.request({
    url: "/message/get_thumbList",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取互动消息收藏列表
export function getUserStarNotification(data?: Object): Promise<starList> {
  return http.request({
    url: "/user/get_starList",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取互动消息评论列表
export function getUserComNotification(data?: Object): Promise<comList> {
  return http.request({
    url: "/user/get_comList",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取班级成员
export function getUserClass(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/get_class",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取用户粉丝列表
export function getUserFansList(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/fans_get",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取用户关注列表
export function getAttentionList(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/atttention_get",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 改变关注状态
export function changeAttentionState(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/attention_change",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取浏览历史
export function getUserHistory(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/history_get",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取我的足迹
export function getUserTracks(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/tracks_get",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取用户发布的文章
export function getArticlePublish(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/article_publish",
    method: "get",
    data: JSON.stringify(data)
  });
}
// 获取用户收藏
export function getStar(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/star_get",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 获取用户自述
export function getSelfCotnent(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/getSelfCotnent",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改用户自述
export function changeSelfCotnent(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/updateSelfContent",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取用户积分统计表
export function getUserPoints(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/points_get",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 封禁用户
export function userIsBan(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/ban",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 解封用户
export function userUnBan(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/Unban",
    method: "post",
    data: JSON.stringify(data)
  });
}
