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
export function getArticlesService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/content",
    method: "post",
    data
  });
}
export function getCommentsService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/articles/getcomments",
    method: "post",
    data
  });
}
export function getHotPostService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/hotpost/title",
    method: "get",
    data
  });
}
export function searchArticleService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/search/article",
    method: "post",
    data
  });
}
