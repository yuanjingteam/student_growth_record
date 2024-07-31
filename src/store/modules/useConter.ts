import { defineStore } from "pinia";
import { store } from "@/store";

// 全局存储用户信息
// 通过 defineStore 函数定义的对象就是一个全局的 Store 实例。
// 这个 Store 实例可以在整个 Vue 应用中被访问和使用。
export const useCounterStore = defineStore("counter", {
  state: () => ({
    userId: 123,
    userInfo: null
  }),
  actions: {
    login(userId, userInfo) {
      this.userId = userId;
      this.userInfo = userInfo;
    },
    // 登出时清空 userId 和 userInfo
    logout() {
      this.userId = null;
      this.userInfo = null;
    }
  }
});
export function useCounterStoreHook() {
  return useCounterStore(store);
}
