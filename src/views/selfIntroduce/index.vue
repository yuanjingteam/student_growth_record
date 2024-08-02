<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCounterStoreHook } from "@/store/modules/useConter";
import { getSelfCotnent, changeSelfCotnent } from "@/api/user";
const userStore = useCounterStoreHook();
const router = new useRouter();

// 获取用户id
const userId = userStore.userId;
const formRef = ref();

// 获取自述内容
const content = ref();

// 表单校验规则
const rules = ref();

// 获取自述
const getSelf = async () => {
  const { data } = await getSelfCotnent({ id: userId });
  content.value = data;
  console.log(content, 111222);
};

// 提交修改后的自述
const onSubmit = async () => {
  await formRef.value.validate();
  const { code, msg } = await changeSelfCotnent({ content: content });
  if (code == 200) {
    console.log(msg);
  } else {
    console.log(msg);
  }
};
</script>

<template>
  <div class="main">
    <van-nav-bar title="编辑自述">
      <template #left>
        <div class="top">
          <span class="back" @click="router.go(-1)"
            ><i-icon icon="weui:back-filled" /></span
          >|
          <span class="home" @click="router.push('./demo')"
            ><i-icon icon="fa6-solid:house"
          /></span>
        </div>
      </template>
      <template #right>
        <div class="top">
          <span class="more"><i-icon icon="ri:more-fill" /></span>|
          <span class="handle"
            ><i-icon icon="icon-park-solid:handle-round"
          /></span>
        </div>
      </template>
    </van-nav-bar>
    <div class="my-w">
      <van-form ref="formRef">
        <van-cell title="个人介绍" />
        <van-field
          v-model="content"
          placeholder="介绍一下自己吧"
          maxlength="2000"
          show-word-limit
          autocomplete="off"
          name="self_account"
          :rules="rules"
          :autosize="{ minHeight: 630, maxHeight: 630 }"
          type="textarea"
        />
        <div class="sub">
          <van-button type="primary" block @click="onSubmit"
            >确认提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<style scoped>
.main {
  /* background-color: #f0f1f5; */
  height: 100%;
}
.my-w {
  overflow: hidden;
  height: 100%;
  margin: 0 5px;
}
.van-nav-bar {
  margin-bottom: 10px;
}
.sub {
  margin-top: 20px;
  padding: 10px;
  /* background-color: #fff; */
}
.sub .van-button {
  border-radius: 20px;
  background-color: #004ae9;
}
.i-icon {
  color: black;
  font-size: 18px;
}
.home {
  margin-left: 10px;
}
.more {
  margin-right: 10px;
}
.top {
  border: 1px solid #000;
  border-radius: 5px;
  padding: 3px 0;
  span {
    margin: 0 5px;
  }
}
</style>
