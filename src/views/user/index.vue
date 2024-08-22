<script setup>
// 导入 Vue Router 的 useRouter 函数
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";

// 创建 Vue Router 的实例,用于进行页面导航
const router = useRouter();
const userStore = useUserStore();
const role = userStore.role;
const username = userStore.username;
console.log(role);
// debugger;
</script>

<template>
  <to-login v-if="username === 'passenger'" />
  <div v-else class="main">
    <br />

    <!-- 个人信息 -->
    <user-info />

    <van-cell-group inset class="mid">
      <!-- 我的操作 -->
      <div class="my-operation">
        <div class="op-icon">
          <p>
            <i-icon
              icon="mingcute:calendar-time-add-line"
              @click="router.push('./myHistory')"
            />
          </p>
          浏览记录
        </div>
        <div class="op-icon" @click="router.push('./myclass')">
          <p><i-icon icon="mingcute:classify-2-fill" /></p>
          我的班级
        </div>
        <div class="op-icon" @click="router.push('./myTracks')">
          <p><i-icon icon="hugeicons:touch-interaction-04" /></p>
          我的足迹
        </div>
        <div class="op-icon" @click="router.push('./integralConverter')">
          <p><i-icon icon="mdi:account-convert" /></p>
          积分换算器
        </div>
      </div>
    </van-cell-group>

    <!-- 我的内容 -->
    <van-cell-group inset class="end">
      <van-cell
        v-if="role === 'superman'"
        title="发布通知"
        is-link
        @click="router.push('./managerPublish')"
      />
      <van-cell
        title="我发布的内容"
        is-link
        @click="router.push('./myPublish')"
      />
      <van-cell title="我的收藏" is-link @click="router.push('./myCollect')" />
      <van-cell
        title="个人介绍"
        is-link
        @click="router.push('./selfIntroduce')"
      />
      <!-- <van-cell title="意见反馈" is-link @click="router.push('./feedBack')" /> -->
      <van-cell title="关于我们" is-link @click="router.push('./feedBack')" />
      <van-cell title="设置" is-link @click="router.push('./sets')" />
    </van-cell-group>
  </div>
</template>

<style scoped>
.main {
  overflow: hidden;
  height: 85vh;
}
.mid {
  margin-top: 20px;
  margin-bottom: 20px;
}
.end {
  padding: 10px 0px 40px 0px;
}
.my-operation {
  display: flex;
  padding: 25px 2.6667vmin;
  justify-content: space-between;
}
.my-operation p {
  text-align: center;
}
.my-operation .op-icon svg {
  width: 2.2rem;
  height: 2.2rem;
}
.my-content .van-cell {
  height: 60px;
}
</style>
