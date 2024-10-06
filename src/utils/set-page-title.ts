// import { pageDefaultTitle } from "@/settings";

// 设置浏览器标题  主页/大学生成长平台
export default function setPageTitle(routerTitle?: string): void {
  window.document.title = routerTitle ? `${routerTitle} ` : "大学生成长平台";
}
