import { http } from "@/utils/http";

type ListResult = {
  code: Number;
  msg: string;
  data: Object;
};
type Register = {
  data: {
    plus_time: string;
  };
  code: Number;
  msg: string;
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
export function getRegisterDay(data?: Object): Promise<Register> {
  return http.request({
    url: "/user/register/day",
    method: "post",
    data
  });
}
