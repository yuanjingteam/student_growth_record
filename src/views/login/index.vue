<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getVerifyImg, getLoginTitle, userLogin } from "@/api/user";
import { useUserStore } from "@/store";
// import { showToast } from "vant";

const userStore = useUserStore();
const router = useRouter();
//复选框是否勾选
const checked = ref(false);
//是否显示忘记密码弹窗
const showDialog = ref(false);
//是否显示用户协议弹窗
const showUser = ref(false);
//是否显示隐私协议弹窗
const showPrivaty = ref(false);
//是否显示协议提示框
const showTip = ref(false);
//用户的登录信息
const userForm = reactive({
  username: "",
  password: "",
  verify: "",
  verifyId: ""
});
//绑定表单
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
//验证码换一换
const changeVerify = async () => {
  const { data } = await getVerifyImg();
  console.log(data.Hcode);
  userForm.verifyId = data.Id;
  trueVerify.value = data.Hcode;
  const base_code = data.B64;
  const base64String = base_code.split(",")[1];
  const blob = convertBase64ToBlob(base64String);
  imageUrl.value = URL.createObjectURL(blob);
};
//提交时的表单校验
const onsubmit = async () => {
  await formRef.value.validate();
  if (checked.value) {
    const res = await userLogin(userForm);
    if (res.code == 200) {
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      userStore.setUserInfo(res.data);
      // showSuccessToast("登录成功");
      router.push("/demo");
    } else {
      // showFailToast("登录失败");
      userForm.username = "";
      userForm.password = "";
      userForm.verify = "";
      checked.value = false;
    }
  } else {
    showTip.value = true;
  }
};
//图片地址
const imageUrl = ref("");
//登录页标题
const loginTitle = ref("");
//展示标题
const showTitle = async () => {
  const {
    data: { title }
  } = await getLoginTitle();
  loginTitle.value = title;
};
// showTitle();
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
  localStorage.setItem("username", "passenger");
  router.push("/demo");
};
</script>

<template>
  <div class="login-box">
    <h2>数学科学学院</h2>
    <h1>{{ loginTitle }}</h1>
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
      >我已阅读并同意《<span @click="showUser = true">用户协议</span>》和《<span
        @click="showPrivaty = true"
        >隐私协议</span
      >》</van-checkbox
    >
  </div>
  <!-- 忘记密码弹出框组件 -->
  <van-dialog
    v-model:show="showDialog"
    title="温馨提示"
    message="请联系您所在班级的管理员重置密码"
  />
  <!-- 用户协议弹出框组件 -->
  <van-dialog v-model:show="showUser" title="用户协议" message="用户协议" />
  <!-- 隐私协议弹出框组件 -->
  <van-dialog v-model:show="showPrivaty" title="隐私协议" message="隐私协议" />
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
</style>
