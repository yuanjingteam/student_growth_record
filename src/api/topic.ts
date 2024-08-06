import { http } from "@/utils/http";

type ListResult = {
  code: String;
  msg: string;
  data: Object;
};

//获取分类详情列表
export function getTopicListService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/topic/list",
    method: "get",
    data
  });
}

//获取当前用户的注册天数
export function getRegisterDay(data?: object): Promise<ListResult> {
  return http.request({
    url: "/register/day",
    method: "post",
    data
  });
}
