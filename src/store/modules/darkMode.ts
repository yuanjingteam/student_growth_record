import { defineStore } from "pinia";
// import { store } from "@/store";

const darkModeKey = "__dark_mode__";
const isDarkMode = () => {
  const darkMode = window.localStorage.getItem(darkModeKey);
  if (darkMode) {
    return darkMode === "true";
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
};

// 定义一个名为 "dark-mode" 的 Pinia 状态管理器
export const useDarkModeStore = defineStore({
  id: "dark-mode",

  // 状态部分
  state: () => ({
    // 初始化深色模式状态为系统默认的深色模式设置
    darkMode: isDarkMode()
  }),

  // 行为部分
  actions: {
    // 切换深色模式的方法
    toggleDarkMode() {
      // 反转当前的深色模式状态
      this.darkMode = !this.darkMode;

      // 如果当前是深色模式
      if (this.darkMode) {
        // 在 HTML 文档根元素上添加 "dark" class
        document.documentElement.classList.add("dark");
        // 将深色模式状态保存到本地存储中
        window.localStorage.setItem(darkModeKey, "true");
      }
      // 如果当前是浅色模式
      else {
        // 在 HTML 文档根元素上移除 "dark" class
        document.documentElement.classList.remove("dark");
        // 将深色模式状态保存到本地存储中
        window.localStorage.setItem(darkModeKey, "false");
      }
    }
  }
});

// export function useDarkModeStoreHook() {
//   return useDarkModeStore(store);
// }
