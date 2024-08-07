import { http } from "@/utils/http";

type ListResult = {
  code: Number;
  message: string;
  data: Object;
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
export function getUserInfo(username?: number): Promise<ListResult> {
  return http.request({
    url: "/user/profiles",
    method: "get",
    params: { username }
  });
}

//获取图形验证码
export function getVerifyImg(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/code",
    method: "post",
    data
  });
}
//登录
export function userLogin(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/user/login",
    method: "post",
    data
  });
}

// 获取通知消息
export function getAllNotification(username?: number): Promise<ListResult> {
  return http.request({
    url: "/all/get_notification",
    method: "get",
    params: { username }
  });
}

// 获取系统消息
export function getSystemNotification() {
  return http.request({
    url: "/system/get_notification",
    method: "get"
  });
}

// 获取管理员消息
export function getManagerNotification() {
  return http.request({
    url: "/manager/get_notification",
    method: "get"
  });
}

// 获取用户自述
export function getSelfCotnent(data?: Object): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/student/getSelfCotnent",
    method: "post",
    data
  });
}

// 修改用户自述
export function changeSelfCotnent(data?: Object): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/student/updateSelfContent",
    method: "post",
    data
  });
}

// 获取用户资料
export function getUserData(data?: Object): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/getUserData",
    method: "get",
    data
  });
}

// 修改用户资料
export function changeUserData(data?: Object): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/updateUserData",
    method: "post",
    data
  });
}

// 获取互动消息点赞列表
export function getUserThumNotification(data?: Object): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/get_thumbList",
    method: "get",
    data
  });
}

// 获取互动消息评论列表
export function getUserComNotification(data?: Object): Promise<ListResult> {
  data = JSON.stringify({
    ...data
  });
  return http.request({
    url: "/user/get_comList",
    method: "get",
    data
  });
}

// 获取互动消息收藏列表
export function getUserStarNotification(data?: Object): Promise<ListResult> {
  data = JSON.stringify({
    ...data
  });
  return http.request({
    url: "/user/get_starList",
    method: "get",
    data
  });
}
