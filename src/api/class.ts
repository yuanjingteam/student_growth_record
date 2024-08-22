import { http } from "@/utils/http";

type classList = {
  code: String;
  msg: string;
  data: {
    class_list: Array<Object>;
  };
};

export function getClassListService(data?: object): Promise<classList> {
  return http.request({
    url: "/class/list",
    method: "post",
    data
  });
}
