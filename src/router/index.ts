import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized
} from "vue-router";
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";
import { getClassByGradeService } from "@/api/class";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}
const protectedRoutes = [
  "articleWait",
  "Publish",
  "editData",
  "email",
  "motto",
  "phone",
  "userFans",
  "userAttention",
  "myHistory",
  "myclass",
  "myTracks",
  "integralConverter",
  "managerPublish",
  "myPublish",
  "myCollect",
  "otherIntroduce",
  "selfIntroduce",
  "feedBack",
  "aboutOur",
  "sets",
  "changePwd",
  "otherInfo",
  "managerNotice",
  "systemNotice",
  "userNotice",
  "permNotice"
];
// 路由全局前置守卫
router.beforeEach(async (to: toRouteType, from, next) => {
  NProgress.start();
  // 路由缓存
  useCachedViewStoreHook().addCachedView(to);
  // 页面 title
  setPageTitle(to.meta.title);
  //访问demo页面时，若没有token则指定信息
  const token = sessionStorage.getItem("token");
  if (to.name == "Demo" && !token) {
    sessionStorage.setItem("grade", "2");
    const { data } = await getClassByGradeService({
      grade: 2
    });
    sessionStorage.setItem("checked3", JSON.stringify(data.grade_list));
    sessionStorage.setItem("username", "passenger");
  }
  // if (to.name != "Login") {
  //   sessionStorage.setItem("username", "passenger");
  // }

  // 判断当前路由是否在 protectedRoutes 数组中
  if (!token && protectedRoutes.includes(to.name as string)) {
    // 如果没有 token，则重定向到登录页面
    return next({ name: "Login" });
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
