import { http } from "@/utils/http";

type ListResult = {
  code: String;
  message: string;
  data: Object;
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
export function getUserInfo(username?: number): Promise<object> {
  return http.request({
    url: "/user/profiles",
    method: "get",
    params: { username }
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

// 获取通知消息
export function getAllNotification(username?: number): Promise<object> {
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

// 文章发布
export function newArticlePublish(formData?: FormData): Promise<ListResult> {
  return http.request({
    url: "/article/publish",
    method: "post",
    data: formData
  });
}

// 获取文章话题
export function getArticleTags(data?: Object): Promise<object> {
  data = JSON.stringify(data);
  return http.request({
    url: "/article/littletag",
    method: "post",
    data
  });
}

// 获取文章小标签
export function getLittleTags(data?: ListResult): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/article/publish/get_tags",
    method: "post",
    data
  });
}

// 获取用户自述
export function getSelfCotnent(data?: ListResult): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/student/getSelfCotnent",
    method: "post",
    data
  });
}

// 修改用户自述
export function changeSelfCotnent(data?: ListResult): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/student/updateSelfContent",
    method: "post",
    data
  });
}

// 获取用户资料
export function getUserData(data?: Object): Promise<object> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/getUserData",
    method: "get",
    data
  });
}

// 修改用户资料
export function changeUserData(data?: ListResult): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/updateUserData",
    method: "post",
    data
  });
}

// 获取互动消息点赞列表
export function getUserThumNotification(
  data?: ListResult
): Promise<ListResult> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/get_thumbList",
    method: "get",
    data
  });
}

// 获取互动消息评论列表
export function getUserComNotification(data?: ListResult): Promise<ListResult> {
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
export function getUserStarNotification(
  data?: ListResult
): Promise<ListResult> {
  data = JSON.stringify({
    ...data
  });
  return http.request({
    url: "/user/get_starList",
    method: "get",
    data
  });
}
