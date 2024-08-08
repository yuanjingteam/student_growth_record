import { http } from "@/utils/http";

type ListResult = {
  code: number;
  data: Object;
  msg: string;
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

// 文章发布
export function newArticlePublish(formData?: FormData): Promise<ListResult> {
  return http.request({
    url: "/article/publish",
    method: "post",
    data: formData
  });
}

// 获取文章话题
export function getArticleTags(): Promise<ListResult> {
  return http.request({
    url: "/article/get_topic",
    method: "get"
  });
}

// 获取文章小标签
export function getLittleTags(data?: Object): Promise<ListResult> {
  return http.request({
    url: "/article/publish/get_tags",
    method: "get",
    data: JSON.stringify(data)
  });
}
