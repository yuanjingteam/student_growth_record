<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { showConfirmDialog, showDialog, showToast } from "vant";
import { useDarkModeStore, useUserStore, useInformation } from "@/store";

const router = new useRouter();
// const checked = ref(false);
const show = ref(false);
const useStore = useUserStore();
const userInfo = useInformation();
const darkModeStore = useDarkModeStore();
const showState = ref(false);

const clearAll = () => {
  try {
    useStore.removeUserInfo();
    userInfo.activeTab = 0;
    userInfo.userData = ref({});

    // 清空本地存储
    localStorage.clear();
    sessionStorage.clear();
    // 删除 Cookie
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    showToast("登出成功");
    router.push("./login");
  } catch {
    showToast("退出失败，请稍后重试");
  }
};

const checked = computed({
  get() {
    return darkModeStore.darkMode;
  },
  set(value) {
    darkModeStore.toggleDarkMode();
  }
});
const loginOut = () => {
  showState.value = true;
};
</script>
<template>
  <van-dialog v-model:show="show" title="标题" show-cancel-button />

  <div class="main">
    <div class="top">
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
    </div>

    <div class="bottom">
      <van-button type="primary" block @click="router.push('./changePwd')"
        >修改密码</van-button
      >
      <van-button type="primary" block @click="loginOut">退出登录</van-button>
    </div>
  </div>
  <van-dialog
    v-model:show="showState"
    title="退出登录"
    message="确认退出登录吗?"
    show-cancel-button
    showConfirmButton
    @confirm="clearAll"
  />
</template>
<style scoped>
.main {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.van-button {
  margin: 10px 0 20px;
}
</style>
