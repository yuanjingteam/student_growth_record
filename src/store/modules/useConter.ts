import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
//用户信息管理
export const useUserStore = defineStore(
  "user",
  () => {
    const username = ref("passenger");
    const token = ref("");
    const role = ref("user");
    const router = useRouter();
    // https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg
    // 用户详细资料
    const userData = ref({
      name: "",
      user_headshot: "",
      user_class: "",
      user_Identity: "",
      user_gender: "",
      user_motto: "",
      phone_number: 111,
      user_email: "",
      user_year: ""
    });

    const setUserInfo = obj => {
      username.value = obj.username;
      token.value = obj.token;
      role.value = obj.role;
    };
    const removeUserInfo = () => {
      username.value = "";
      token.value = "";
      role.value = "user";
    };

    // 区分身份信息
    const otherSwitch = user => {
      // 如果是自己的主页就跳自己
      if (user === username.value) {
        router.push(`/user`);
      } else {
        // 否则跳他人主页
        router.push(`./otherInfo/${user}`);
      }
    };

    return {
      username,
      token,
      role,
      userData,
      setUserInfo,
      removeUserInfo,
      otherSwitch
    };
  },
  {
    persist: true
  }
);
