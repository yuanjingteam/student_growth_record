import { http } from "@/utils/http";

type ListArticle = {
  code: number;
};

type LittleTag = {
  code: number;
};

// 文章发布
export function publishArticle(params?: object): Promise<ListArticle> {
  return http.request({
    url: "/list/get",
    method: "get",
    params
  });
}

// 获取小话题标签
export function littleTag(params?: object): Promise<LittleTag> {
  return http.request({
    url: "/article/publish",
    method: "post",
    params
  });
}
