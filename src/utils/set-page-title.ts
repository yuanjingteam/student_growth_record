import { pageDefaultTitle } from "@/settings";

// 设置浏览器标题  主页|student_growth_record
export default function setPageTitle(routerTitle?: string): void {
  window.document.title = routerTitle
    ? `${routerTitle} | ${pageDefaultTitle}`
    : `${pageDefaultTitle}`;
}
