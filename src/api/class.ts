import { http } from "@/utils/http";

type classList = {
  code: Number;
  msg: string;
  data: {
    class_list: Array<Object>;
  };
};

type ListResult = {
  code: Number;
  msg: string;
  data: Object;
};
export function getClassListService(data?: object): Promise<classList> {
  return http.request({
    url: "/class/list",
    method: "post",
    data
  });
}

export function getClassDetailService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/class_search",
    method: "post",
    data: JSON.stringify(data)
  });
}
