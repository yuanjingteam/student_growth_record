<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
//复选框是否勾选
const checked = ref(false)
//是否显示忘记密码弹窗
const showDialog = ref(false)
//是否显示用户协议弹窗
const showUser = ref(false)
//是否显示隐私协议弹窗
const showPrivaty = ref(false)
//用户的登录信息
const userForm = reactive({
  uid: '',
  password: '',
  verify: ''
})
//绑定表单
const formRef = ref()

//用户登录校验信息
const rules = {
  uid: [
    { required: true, message: '账号必须是1-11位的数字', pattern: /^[0-9]{1,11}$/, trigger: 'blur' },
    {
      pattern: /^[0-9]{1,11}$/,
      message: '',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码' },
    {
      pattern: /^\S{1,17}$/,
      message: '密码分类名必须在17位以内',
      trigger: 'blur'
    }
  ],
  verify: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
}

const onsubmit = async () => {
  await formRef.value.validate()
}

</script>

<template>
  <div class="login-box">
    <h2>数学科学学院</h2>
    <h1>大学生成长档案</h1>
    <van-form inset ref="formRef">
      <van-field v-model="userForm.uid" placeholder="请输入用户账号/学号" clearable name="uid" :rules="[
        { required: true, message: '请输入用户账号/学号' }]" />
      <van-field v-model="userForm.password" type="password" placeholder="请输入密码" clearable name="password" />
      <van-field v-model="userForm.verify" placeholder="请输入验证码" clearable name="verify" />

    </van-form>

    <van-button round block type="primary" native-type="submit" color="#004ae9" @click="onsubmit">
      登录
    </van-button>
    <div class="op-box">
      <span @click="showDialog = true" style="text-decoration: underline;">忘记密码</span><span
        @click="router.push('/demo')" style="text-decoration: underline;">游客登录</span>
    </div>
    <van-checkbox v-model="checked" checked-color="#000" shape="square" icon-size="20px">我已阅读并同意《<span
        @click="showUser = true">用户协议</span>》和《<span @click="showPrivaty = true">隐私协议</span>》</van-checkbox>
  </div>
  <!-- 忘记密码弹出框组件 -->
  <van-dialog v-model:show="showDialog" title="温馨提示" message="请联系您所在班级的管理员重置密码">
  </van-dialog>
  <!-- 用户协议弹出框组件 -->
  <van-dialog v-model:show="showUser" title="用户协议" message="用户协议">
  </van-dialog>
  <!-- 隐私协议弹出框组件 -->
  <van-dialog v-model:show="showPrivaty" title="隐私协议" message="隐私协议">
  </van-dialog>


</template>

<style lang="less" scoped>
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
      border: 1px solid rgba(204, 204, 204, 1)
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
}
</style>