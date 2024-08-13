<script setup>
// 导入 Vue Router 的 useRouter 函数
import { useRouter } from "vue-router";

// 创建 Vue Router 的实例,用于进行页面导航
const router = useRouter();
</script>

<template>
  <div class="main">
    <div class="my-w">
      <!-- 个人信息 -->
      <user-info>
        <template #self>
          <div class="my-inside" />
          <div class="change-info" @click="router.push('./editData')">
            <button>编辑资料</button>
          </div>
        </template>
      </user-info>
      <!-- 我的操作 -->
      <div class="my-operation">
        <div class="op-icon">
          <p>
            <i-icon
              icon="mingcute:calendar-time-add-line"
              @click="router.push('./myPublish')"
            />
          </p>
          我发布的内容
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
      <!-- 我的内容 -->
      <div class="my-content">
        <!-- <van-cell
          title="我发布的内容"
          is-link
          @click="router.push('./myPublish')"
        /> -->
        <van-cell
          title="我的收藏"
          is-link
          @click="router.push('./myCollect')"
        />
        <van-cell
          title="个人介绍"
          is-link
          @click="router.push('./selfIntroduce')"
        />
        <van-cell title="意见反馈" is-link @click="router.push('./feedBack')" />
        <van-cell title="设置" is-link @click="router.push('./sets')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  overflow: hidden;
  background-color: #f0f1f5;
}
.my-w {
  margin: 0 10px;
}
.my-operation {
  display: flex;
  background-color: #fff;
  margin: 10px 0;
  padding: 25px 2.6667vmin;
  border-radius: 3.3333vmin;
  justify-content: space-between;
}
.my-operation p {
  text-align: center;
}
.my-operation .op-icon svg {
  width: 2.2rem;
  height: 2.2rem;
}
.my-content {
  padding-top: 15px;
  background-color: #fff;
  border-radius: 10px;
}
.my-content .van-cell {
  height: 60px;
}

.my-inside {
  position: absolute;
  top: -4.4vmin;
  right: -6.3333vmin;
  width: 24.6667vmin;
  height: 12.6667vmin;
  border-radius: 9.3333vmin;
  background-color: #e5edff;
}

.change-info {
  position: absolute;
  top: 4px;
  right: 4px;
  color: #4580ff;
  font-weight: 700;
}

/* .other {
  background-color: pink;
  padding: 3px;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 11px;
} */
</style>
