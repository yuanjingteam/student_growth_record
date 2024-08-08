import { http } from "@/utils/http";

type ListResult = {
  code: number;
  message: string;
  data: Object;
};

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
export function getLoginTitle(data?: ListResult): Promise<ListResult> {
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
export function getVerifyImg(data?: ListResult): Promise<ListResult> {
  return http.request({
    url: "/user/code",
    method: "post",
    data
  });
}
//登录
export function userLogin(data?: ListResult): Promise<ListResult> {
  return http.request({
    url: "/user/login",
    method: "post",
    data
  });
}

// 获取用户自述
export function getSelfCotnent(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/student/getSelfCotnent",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改用户自述
export function changeSelfCotnent(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/student/updateSelfContent",
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

// 修改用户生日
export function changeUserBirth(data?: Object): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/updateUserBirth",
    method: "post",
    data
  });
}

// 获取系统消息列表
export function getSystemNotification(): Promise<adminList> {
  return http.request({
    url: "/system/get_notification",
    method: "get"
  });
}

// 获取管理员消息列表
export function getManagerNotification(): Promise<managerList> {
  return http.request({
    url: "/manager/get_notification",
    method: "get"
  });
}

// 获取互动消息列表
export function getUserNotification(data?: Object): Promise<managerList> {
  return http.request({
    url: "/user/get_notification",
    method: "get",
    data: JSON.stringify(data)
  });
}

// 已读系统消息
export function readSystemNotice(data?: Object): Promise<managerList> {
  return http.request({
    url: "/system/read_notice",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 已读管理员消息
export function readManagerNotice(data?: Object): Promise<managerList> {
  return http.request({
    url: "/manager/read_notice",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 已读互动消息
export function readUserNotice(data?: Object): Promise<managerList> {
  return http.request({
    url: "/user/read_notice",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取互动消息点赞列表
export function getUserThumNotification(data?: Object): Promise<thumbsList> {
  return http.request({
    url: "/user/get_thumbList",
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
