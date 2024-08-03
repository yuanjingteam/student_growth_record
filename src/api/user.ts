import { http } from "@/utils/http";

type ListResult = {
  code: String;
  message: string;
  data: Object;
};

export function getListApi(params?: object): Promise<ListResult> {
  return http.request({
    url: "/list/get",
    method: "get",
    params
  });
}

export function getListApiError(data?: object): Promise<ListResult> {
  return http.request({
    url: "/list/error",
    method: "post",
    data
  });
}

// 获取用户信息
export function getUserInfo(userid?: number): Promise<object> {
  return http.request({
    url: "/user/profiles",
    method: "get",
    params: { userid }
  });
}

// 获取通知消息
export function getAllNotification(userid?: number): Promise<object> {
  return http.request({
    url: "/all/get_notification",
    method: "get",
    params: { userid }
  });
}

// 文章发布
export function newArticlePublish(formData?: FormData): Promise<object> {
  return http.request({
    url: "/article/publish",
    method: "post",
    data: formData
  });
}

// 获取文章话题
export function getArticleTags(data?: Object): Promise<object> {
  return http.request({
    url: "/article/publish/get_tags",
    method: "post",
    data
  });
}

// 获取文章小标签
export function getLittleTags(data?: Object): Promise<object> {
  data = JSON.stringify(data);
  return http.request({
    url: "/article/publish/get_tags",
    method: "post",
    data
  });
}

// 获取用户自述
export function getSelfCotnent(data?: Object): Promise<object> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/getSelfCotnent",
    method: "post",
    data
  });
}

// 修改用户自述
export function changeSelfCotnent(data?: Object): Promise<object> {
  data = JSON.stringify(data);
  return http.request({
    url: "/student/updateSelfContent",
    method: "post",
    data
  });
}

// 修改用户资料
export function changeUserData(data?: Object): Promise<object> {
  data = JSON.stringify(data);
  return http.request({
    url: "/user/updateSelfContent",
    method: "post",
    data
  });
}
