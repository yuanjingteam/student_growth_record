import { defineStore } from "pinia";
import { ref } from "vue";
// import { getTopicListService } from "@/api/topic";

//用户信息管理
export const useUserStore = defineStore(
  "user",
  () => {
    const username = ref("");
    const token = ref("");
    const role = ref("");
    const setUserInfo = obj => {
      username.value = obj.username;
      token.value = obj.token;
      role.value = obj.role;
    };
    const removeUserInfo = () => {
      username.value = "";
      token.value = "";
      role.value = "";
    };

    return {
      username,
      token,
      role,
      setUserInfo,
      removeUserInfo
    };
  },
  {
    persist: true
  }
);
