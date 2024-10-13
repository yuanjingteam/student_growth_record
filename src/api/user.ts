import { http } from "@/utils/http";

type ListResult = {
  code: number;
  msg: string;
  data: Object;
};

// 用户信息
// type userList = {
//   code: number;
//   data: {
//     username: string;
//     user_headshot: string;
//     user_motto: string;
//     userfans: number;
//     user_concern: number;
//     user_like: number;
//     score: 0;
//     user_class: string;
//     user_Identity: string;
//   };
//   msg: string;
// };

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
type systemList = {
  code: 0;
  data: {
    admin_info: [
      {
        ID: string;
        msg_content: string;
        msg_time: string;
        username: string;
        user_headshot: string;
      }
    ];
    unread_count: number;
  };
  msg: string;
};

// 管理员通知列表
type adminList = {
  code: 0;
  data: {
    manager_info: [
      {
        ID: string;
        msg_content: string;
        msg_time: string;
        username: string;
        user_headshot: string;
        info_id: string;
      }
    ];
    unread_count: number;
  };
  msg: string;
};

// 点赞列表
type thumbsList = {
  code: number;
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
  msg: string;
};

// 收藏列表
type starList = {
  code: number;
  data: {
    star: [
      {
        username: string;
        article_content: string;
        user_headshot: string;
        not_time: string;
      }
    ];
    unread_count: number;
  };
  msg: string;
};

// 评论列表
type comList = {
  code: number;
  data: {
    comments: [
      {
        username: string;
        article_content: string;
        user_headshot: string;
        not_time: string;
      }
    ];
    unread_count: number;
  };
  msg: string;
};

//举报邮箱列表
type emailList = {
  code: number;
  data: {
    article_ban: [
      {
        article_id: number;
        article_content: string;
        report_content: [
          {
            report_time: string;
            report_msg: string;
          }
        ];
      }
    ];
    unread_count: number;
  };
  msg: string;
};

// 获取用户信息
export function getUserInfo(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/profiles_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 用户之间是否相互关注
export function getConcernOther(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/isConcern_get",
    method: "post",
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
    url: "/user/userData_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改用户头像
export function changeUserHeadshot(formdata?: FormData): Promise<ListResult> {
  return http.request({
    url: "/user/userHeadshot_update",
    method: "post",
    data: formdata
  });
}

// 修改用户个性签名
export function changeUserMotto(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/userMotto_update",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改用户手机号
export function changeUserPhone(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/userPhone_update",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改用户邮箱
export function changeUserEmail(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/userEmail_update",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取系统消息列表
export function getSystemNotification(data?: Object): Promise<systemList> {
  return http.request({
    url: "/message/get_system",
    method: "post",
    data: JSON.stringify(data)
  });
}
// 获取管理员消息列表
export function getManagerNotification(data?: Object): Promise<adminList> {
  return http.request({
    url: "/message/get_manager",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 删除管理员消息
export function delManagerInfo(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/manager/del_manager",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取举报邮箱
export function getreportEmail(data?: Object): Promise<emailList> {
  return http.request({
    url: "/report_box/getlist",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 已读系统消息
export function readSystemNotice(): Promise<ListResult> {
  return http.request({
    url: "/message/ack_systemMsg",
    method: "post"
  });
}

// 已读管理员消息
export function readManagerNotice(): Promise<ListResult> {
  return http.request({
    url: "/message/ack_managerMsg",
    method: "post"
  });
}

// 已读邮箱消息
export function readEmailNotice(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/report_box/ack",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 已读互动消息
export function readUserNotice(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/message/ack_interactMsg",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取互动消息点赞列表
export function getUserThumNotification(data?: Object): Promise<thumbsList> {
  return http.request({
    url: "/message/get_thumbList",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取互动消息收藏列表
export function getUserStarNotification(data?: Object): Promise<starList> {
  return http.request({
    url: "/message/get_starList",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取互动消息评论列表
export function getUserComNotification(data?: Object): Promise<comList> {
  return http.request({
    url: "/message/get_comList",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取班级成员
export function getUserClass(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/class_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取用户粉丝列表
export function getUserFansList(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/fans_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取用户关注列表
export function getAttentionList(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/concern_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 改变关注状态
export function changeAttentionState(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/concern_change",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取浏览历史
export function getUserHistory(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/history_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取我的足迹
export function getUserTracks(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/tracks_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取用户发布的文章
export function getArticlePublish(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/article_get",
    method: "get",
    params: data
  });
}
// 获取用户收藏
export function getStar(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/star_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取用户自述
export function getSelfCotnent(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/selfCotnent_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改用户自述
export function changeSelfCotnent(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/selfContent_update",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 获取用户积分统计表
export function getUserPoints(): Promise<ListResult> {
  return http.request({
    url: "/user/points_get",
    method: "get"
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
    url: "/user/unban",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 发布系统通知
export function publishSystemMsg(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/message/publish_systemMsg",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 发布管理员通知
export function publishManagerMsg(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/message/publish_managerMsg",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 意见反馈
export function toFeedBack(data?: Object): Promise<ListResult> {
  return http.request({
    url: "user/advice_get",
    method: "post",
    data: JSON.stringify(data)
  });
}

// 修改密码
export function toChangePwd(data?: Object): Promise<ListResult> {
  return http.request({
    url: "user/pwd_update",
    method: "post",
    data: JSON.stringify(data)
  });
}
