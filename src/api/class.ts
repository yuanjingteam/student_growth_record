import { http } from "@/utils/http";

type classList = {
  code: Number;
  msg: string;
  data: {
    class_list: Array<Object>;
  };
};

type ListResult = {
  code: Number;
  msg: string;
  data: Object;
};

type GradeResult = {
  code: Number;
  msg: string;
  data: {
    grade_list: Array<Object>;
  };
};
export function getClassListService(data?: object): Promise<classList> {
  return http.request({
    url: "/class/list",
    method: "post",
    data
  });
}

export function getClassDetailService(data?: object): Promise<ListResult> {
  return http.request({
    url: "/article/class_search",
    method: "post",
    data: JSON.stringify(data)
  });
}
export function getClassByGradeService(data?: object): Promise<GradeResult> {
  return http.request({
    url: "/class/get_class_by_grade",
    method: "post",
    data: JSON.stringify(data)
  });
}
