<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getVerifyImg, userLogin } from "@/api/user";
import { useUserStore } from "@/store";
import { showFailToast, showSuccessToast } from "vant";

const userStore = useUserStore();
const router = useRouter();

//复选框是否勾选
const checked = ref(false);
//是否显示忘记密码弹窗
const showDialog = ref(false);
//是否显示协议提示框
const showTip = ref(false);
//加载验证码loading效果
const loadingVerify = ref(false);
//登录loading
const loginLoading = ref(false);
//图片地址
const imageUrl = ref("");
//用户的登录信息
const userForm = reactive({
  username: "",
  password: "",
  verify: "",
  verifyId: ""
});
//绑定表单用于校验
const formRef = ref();

//真实验证码
const trueVerify = ref("");
//生成blob对象的方法
const convertBase64ToBlob = base64 => {
  const binary = atob(base64);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
};
//点击验证码换一换
const changeVerify = async () => {
  loadingVerify.value = true;
  const { data } = await getVerifyImg();
  console.log(data);
  userForm.verifyId = data.Id;
  trueVerify.value = data.Hcode;
  const base_code = data.B64;
  const base64String = base_code.split(",")[1];
  const blob = convertBase64ToBlob(base64String);
  imageUrl.value = URL.createObjectURL(blob);
  loadingVerify.value = false;
};
//登录提交并进行表单校验
const onsubmit = async () => {
  loginLoading.value = true;
  try {
    await formRef.value.validate();
  } catch {
    showFailToast("登录失败");
    loginLoading.value = false;
    return;
  }
  //用户勾选复选框后
  if (checked.value) {
    try {
      const res = await userLogin(userForm);
      sessionStorage.setItem("username", res.data.username);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("ifTeacher", res.data.ifTeacher);
      //登录页存储这个人的班级，会直接以字符串形式存储
      sessionStorage.setItem("checked3", JSON.stringify(res.data.class));
      sessionStorage.setItem("grade", res.data.grade);
      userStore.setUserInfo(res.data);
      showSuccessToast("登录成功");
      router.push("/demo");
    } catch (error) {
      showFailToast(`${error.msg}`);
      userForm.username = "";
      userForm.password = "";
      userForm.verify = "";
      checked.value = false;
    }
  } else {
    showTip.value = true;
  }
  loginLoading.value = false;
};

//展示验证码图片
const showVerify = async () => {
  changeVerify();
};
showVerify();
//提示框点击确认触发事件
const confirmTip = () => {
  showTip.value = false;
  checked.value = true;
};

//游客登录
const passengerLogin = () => {
  userStore.username = "passenger";
  userStore.token = "";
  userStore.role = "user";
  sessionStorage.setItem("username", "passenger");
  router.push("/demo");
  showSuccessToast("登录成功");
};
</script>

<template>
  <div v-if="!loginLoading" class="login-box">
    <div class="circle1" />
    <div class="circle2" />
    <div class="circle3" />
    <div class="circle4" />
    <h2>数学科学学院</h2>
    <h1>大学生成长档案</h1>
    <van-form ref="formRef" inset>
      <van-field
        v-model="userForm.username"
        placeholder="请输入用户账号/学号"
        clearable
        name="username"
        :rules="[
          { required: true, message: '请输入用户账号/学号' },
          { message: '账号必须是1-11位的数字', pattern: /^\S{1,17}$/ }
        ]"
      />
      <van-field
        v-model="userForm.password"
        type="password"
        placeholder="请输入密码"
        clearable
        name="password"
        :rules="[
          { required: true, message: '请输入密码' },
          { message: '密码必须在17位以内', pattern: /^.{1,17}$/ }
        ]"
      />
      <van-field
        v-model="userForm.verify"
        placeholder="请输入验证码"
        clearable
        name="verify"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
            :loadingVerify="loadingVerify"
            @click="changeVerify"
          />
        </template>
      </van-field>
    </van-form>

    <van-button
      round
      block
      type="primary"
      native-type="submit"
      color="#004ae9"
      @click="onsubmit"
    >
      登录
    </van-button>
    <div class="op-box">
      <span style="text-decoration: underline" @click="showDialog = true"
        >忘记密码</span
      >
      <span style="text-decoration: underline" @click="passengerLogin"
        >游客登录</span
      >
    </div>
    <van-checkbox
      v-model="checked"
      checked-color="#000"
      shape="square"
      icon-size="20px"
      >我已阅读并同意《<span>用户协议</span>》和《<span>隐私协议</span>》</van-checkbox
    >
  </div>
  <van-loading v-else vertical>
    <template #icon>
      <van-icon name="star-o" size="30" />
    </template>
    加载中...
  </van-loading>
  <!-- 忘记密码弹出框组件 -->
  <van-dialog
    v-model:show="showDialog"
    title="温馨提示"
    message="请联系您所在班级的管理员重置密码"
  />

  <van-dialog
    v-model:show="showTip"
    title="提示"
    message="请您阅读并同意相关协议"
    show-cancel-button
    showConfirmButton
    @confirm="confirmTip"
  />
</template>

<style scoped>
.login-box {
  position: relative;
  overflow: hidden;
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;

  h2 {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: 800;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 60px;
    font-weight: 800;
  }

  .van-form {
    width: 310px;

    .van-cell {
      margin-bottom: 25px;
      border-radius: 20px;
      border: 1px solid rgba(204, 204, 204, 1);
    }
  }

  .van-button {
    margin-top: 10px;
  }

  .op-box {
    width: 250px;
    display: flex;
    justify-content: space-between;
    color: #549ae9;
    margin-top: 15px;
  }

  .van-checkbox {
    margin-top: 70px;
    font-size: 13px;

    span {
      color: #549ae9;
    }
  }

  .van-field {
    .van-button {
      width: 80px;
      height: 27px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url("../../assets/image/img.jpg");
    }
  }
}

.circle1 {
  position: absolute;
  border-radius: 50%;
  left: 137px;
  top: -126px;
  width: 375px;
  height: 375px;
  opacity: 0.1;
  background: rgba(255, 214, 64, 1);
}
.circle2 {
  position: absolute;
  border-radius: 50%;
  left: -44px;
  top: -72px;
  width: 221px;
  height: 221px;
  opacity: 0.1;
  background: rgba(189, 242, 252, 1);
}
.circle3 {
  position: absolute;
  border-radius: 50%;
  left: 32px;
  top: 169px;
  width: 57px;
  height: 57px;
  opacity: 0.8;
  background: rgba(189, 242, 252, 1);
}
.circle4 {
  position: absolute;
  border-radius: 50%;
  left: 312px;
  top: 273px;
  width: 57px;
  height: 57px;
  opacity: 0.8;
  background: rgba(252, 220, 104, 1);
}
.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
