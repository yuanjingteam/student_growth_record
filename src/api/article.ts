import { http } from "@/utils/http";

type ListResult = {
  code: Number;
  data: Object;
  msg: string;
};
type Search = {
  code: Number;
  data: {
    content: Array<Object>;
  };
  msg: string;
};

//获取文章详情页的文章
export function getArticlesService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/content",
    method: "post",
    data: JSON.stringify(data)
  });
}
//获取文章详情页的评论
export function getCommentsService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/comment/get_lel1comment",
    method: "post",
    data: JSON.stringify(data)
  });
}
//获取二级评论
export function getCommentsSecondService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/comment/get_lel2comment",
    method: "post",
    data: JSON.stringify(data)
  });
}

//删除评论
export function deleteCommentsService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/comment/delete",
    method: "post",
    data: JSON.stringify(data)
  });
}
//首页展示搜索列表
export function searchArticleService(data?: object): Promise<Search> {
  return http.request({
    url: "/article/search_first",
    method: "post",
    data: JSON.stringify(data)
  });
}
//点赞、取消点赞     文章、评论
export function articleUpvoteService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/like",
    method: "post",
    data: JSON.stringify(data)
  });
}

//收藏文章
export function articleCollectService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/collect",
    method: "post",
    data: JSON.stringify(data)
  });
}
//发布文章评论
export function articleCommentService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/comment",
    method: "post",
    data: JSON.stringify(data)
  });
}

//举报文章
export function articleReportService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/report",
    method: "post",
    data: JSON.stringify(data)
  });
}

//封禁文章
export function articleBanService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/list/ban",
    method: "post",
    data: JSON.stringify(data)
  });
}
//确认不处理文章
export function articleIgnoreService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/report_box/ack",
    method: "post",
    data: JSON.stringify(data)
  });
}
//删除文章
export function articleDeleteService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/list/delete",
    method: "post",
    data: JSON.stringify(data)
  });
}
//获取热帖标题，一次10条
export function getHotPostService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/hotpost/title",
    method: "get",
    data: JSON.stringify(data)
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

// 获取文章话题（已弃用）
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
