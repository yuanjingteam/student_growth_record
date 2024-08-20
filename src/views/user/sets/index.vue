<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { showConfirmDialog, showDialog } from "vant";
import { useDarkModeStore } from "@/store";

const router = new useRouter();
// const checked = ref(false);
const show = ref(false);

const darkModeStore = useDarkModeStore();
const checked = computed({
  get() {
    return darkModeStore.darkMode;
  },
  set(value) {
    darkModeStore.toggleDarkMode();
  }
});
const loginOut = () => {
  showConfirmDialog({
    // title: "退出登录",
    message: "确认退出登录吗?"
  })
    .then(() => {
      router.push("./login");
    })
    .catch(() => {
      // on cancel
      showDialog("退出异常,请稍后重试");
    });
};
</script>
<template>
  <van-dialog v-model:show="show" title="标题" show-cancel-button />

  <van-nav-bar
    left-text="返回"
    title="设置"
    left-arrow
    @click-left="router.push('/user')"
  />

  <van-cell is-link>
    <template #title>用户协议 </template>
  </van-cell>
  <van-cell>
    <template #title>深色模式</template>
    <template #value>
      <van-switch v-model="checked" />
    </template>
  </van-cell>
  <van-cell title="推荐好友" is-link />
  <van-cell is-link>
    <template #title>隐私政策</template>
  </van-cell>
  <van-cell is-link>
    <template #title>个人信息收集清单</template>
  </van-cell>

  <van-button type="primary" block @click="loginOut">退出登录</van-button>
</template>
