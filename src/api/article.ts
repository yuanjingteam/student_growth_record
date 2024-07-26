import { http } from "@/utils/http";

type ListResult = {
  code: String;
  msg: string;
  data: Object;
};

// export function getListApi(params?: object): Promise<ListResult> {
//   return http.request({
//     url: "/list/get",
//     method: "get",
//     params
//   });
// }

export function getCommentsService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/articles/getcomments",
    method: "post",
    data
  });
}
