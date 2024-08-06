import { http } from "@/utils/http";

type ListResult = {
  code: String;
  msg: string;
  data: Object;
};

export function getClassListService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/class/list",
    method: "get",
    data
  });
}