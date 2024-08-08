import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserInfo } from "@/api/user";
// import { getTopicListService } from "@/api/topic";

//用户信息管理
export const useUserStore = defineStore(
  "user",
  () => {
    const username = ref(0);
    const token = ref("");
    const role = ref("");
    const userInfo = ref({});
    const setUserInfo = obj => {
      username.value = obj.username;
      token.value = obj.token;
      role.value = obj.role;
    };
    const removeUserInfo = () => {
      username.value = 0;
      token.value = "";
      role.value = "";
    };
    // 获取用户信息
    const getUerInfo = async () => {
      const { data } = await getUserInfo(username.value);
      console.log(1111);

      userInfo.value = data;
    };
    getUerInfo();
    return {
      username,
      token,
      role,
      userInfo,
      getUerInfo,
      setUserInfo,
      removeUserInfo
    };
  },
  {
    persist: true
  }
);
