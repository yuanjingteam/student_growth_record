import { defineStore } from "pinia";
import { ref } from "vue";
import {
  changeUserHeadshot,
  changeUserMotto,
  changeUserPhone,
  changeUserEmail,
  getUserTracks,
  getUserData
} from "@/api/user";
// import { getTopicListService } from "@/api/topic";

//用户信息管理
export const useUserStore = defineStore(
  "user",
  () => {
    const username = ref("passenger");
    const token = ref("");
    const role = ref("0");

    const tracks = ref({});
    const page = 1;
    // 用户详细资料
    const userData = ref({
      name: "",
      user_headshot: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
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
      role.value = "";
    };

    // 获取我的足迹
    const getTracks = async () => {
      const res = await getUserTracks({
        username: username,
        page: page
      });
      tracks.value = res.data;
    };

    // 获取用户详细信息
    const baseUserData = async () => {
      const res = await getUserData({ username: username });

      userData.value = res.data;
      console.log(userData);
    };

    // 更新用户头像
    const submitHeadshot = async data => {
      const { code } = await changeUserHeadshot(data);
      if (code == 200) {
        console.log("yeah");
        userData.value.user_headshot = data.user_headshot;
      }
    };

    // 更新用户个签
    const submitMotto = async data => {
      const { code } = await changeUserMotto(data);
      if (code == 200) {
        console.log("yeah");
        userData.value.user_motto = data.user_motto;
        // 一个修改成功的弹窗
      }
    };

    // 更新用户电话
    const submitPhone = async data => {
      const { code } = await changeUserPhone(data);
      if (code == 200) {
        console.log("yeah");
        userData.value.phone_number = data.phone_number;
        // 一个修改成功的弹窗
      }
    };

    // 更新用户邮箱
    const submitEmail = async data => {
      const { code } = await changeUserEmail(data);
      if (code == 200) {
        console.log("yeah");
        // 一个修改成功的弹窗
        userData.value.user_email = data.user_email;
      }
    };

    // 初始化用户详细信息
    baseUserData();

    // 初始化我的足迹
    getTracks();

    return {
      username,
      token,
      role,
      tracks,
      userData,
      setUserInfo,
      removeUserInfo,
      submitEmail,
      submitPhone,
      submitMotto,
      submitHeadshot
    };
  },
  {
    persist: true
  }
);
