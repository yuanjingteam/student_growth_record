import { http } from "@/utils/http";

type ListResult = {
  code: Number;
  msg: string;
  data: Object;
};
//获取班级成长之星列表
export function getClassStar({
  startTime,
  endTime,
  page,
  limit
}): Promise<ListResult> {
  return http.request({
    url: `/star/class_star?startTime=${startTime}&endTime=${endTime}&page=${page}&limit=${limit}`,
    method: "get"
  });
}
//获取年级成长之星列表
export function getGradeStar({
  startTime,
  endTime,
  page,
  limit
}): Promise<ListResult> {
  return http.request({
    url: `/star/grade_star?startTime=${startTime}&endTime=${endTime}&page=${page}&limit=${limit}`,
    method: "get"
  });
}
//获取校级成长之星列表
export function getSchoolStar({
  startTime,
  endTime,
  page,
  limit
}): Promise<ListResult> {
  return http.request({
    url: `/star/college_star?startTime=${startTime}&endTime=${endTime}&page=${page}&limit=${limit}`,
    method: "get"
  });
}
//获取成长之星最大最小年份
export function getMStarService(): Promise<ListResult> {
  return http.request({
    url: `/star/time`,
    method: "get"
  });
}
