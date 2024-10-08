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
    const ifTeacher = ref(false);
    const className = ref([]);
    const grade = ref(0);
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
      ifTeacher.value = obj.ifTeacher;
      className.value = obj.class;
      grade.value = obj.grade;
    };
    const removeUserInfo = () => {
      username.value = "passenger";
      token.value = "";
      role.value = "user";
      ifTeacher.value = false;
      className.value = [];
      grade.value = 0;
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
      ifTeacher,
      userData,
      className,
      grade,
      setUserInfo,
      removeUserInfo,
      otherSwitch
    };
  },
  {
    persist: true
  }
);
