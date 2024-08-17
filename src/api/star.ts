import { http } from "@/utils/http";

type ListResult = {
  code: Number;
  msg: string;
  data: Object;
};
//获取班级成长之星列表
export function getClassStar(): Promise<ListResult> {
  return http.request({
    url: "/star/class_star",
    method: "get"
  });
}
//获取年级成长之星列表
export function getGradeStar(): Promise<ListResult> {
  return http.request({
    url: "/star/grade_star",
    method: "get"
  });
}
//获取校级成长之星列表
export function getSchoolStar(): Promise<ListResult> {
  return http.request({
    url: "/star/college_star",
    method: "get"
  });
}
