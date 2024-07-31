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
    url: "/all/notification",
    method: "get",
    params: { userid }
  });
}
