import { http } from "@/utils/http";

type ListResult = {
  code: String;
  msg: string;
  data: Object;
};

export function getTopicListService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/topic/list",
    method: "get",
    data
  });
}