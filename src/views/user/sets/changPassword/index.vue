<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toChangePwd } from "@/api/user";
import { showToast } from "vant";
const router = useRouter();
const currPwd = ref("");
const newPwd = ref("");
const isNewPwd = ref("");
const showDig = ref(false);

const validateNewPassword = value => {
  return value !== currPwd.value; // 新密码不能与当前密码相同
};
const validateConfirmPassword = value => {
  return value === newPwd.value; // 确认密码需与新密码一致
};

const changPwd = async () => {
  try {
    await formRef.value.validate();
    const { data } = await toChangePwd();
    if (data.pwd_check) {
      showToast("修改成功");
      router.go(-1);
    } else {
      showDig.value = true;
    }
  } catch (error) {
    console.log(error);

    showToast("数据异常,稍后重试");
  }
};
</script>
<template>
  <van-dialog
    v-model:show="showDig"
    show-cancel-button
    message="当前密码错误,请重新输入"
  />
  <van-nav-bar title="修改密码" left-arrow @click-left="router.go(-1)" />
  <van-form>
    <van-cell-group inset>
      <van-field
        v-model="currPwd"
        type="password"
        name="密码"
        label="当前密码："
        placeholder="当前登录密码"
        :rules="[
          { required: true, message: '请输入密码' },
          { message: '密码必须在17位以内', pattern: /^.{1,17}$/ }
        ]"
      />
      <van-field
        v-model="newPwd"
        type="password"
        name="密码"
        label="新密码："
        placeholder="登录新密码"
        :rules="[
          { required: true, message: '请输入修改后的密码' },
          { message: '密码必须在17位以内', pattern: /^.{1,17}$/ },
          {
            message: '新密码不能与当前密码相同',
            validator: validateNewPassword
          }
        ]"
      />
      <van-field
        v-model="isNewPwd"
        type="password"
        name="密码"
        label="确认密码："
        placeholder="确认登录新密码"
        :rules="[
          { required: true, message: '请确认修改后的密码' },
          { message: '密码必须在17位以内', pattern: /^.{1,17}$/ },
          {
            message: '两次输入的密码不一致',
            validator: validateConfirmPassword
          }
        ]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button block type="primary" native-type="submit" @click="changPwd">
        确认修改
      </van-button>
    </div>
  </van-form>
</template>
