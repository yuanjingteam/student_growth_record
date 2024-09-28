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
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
