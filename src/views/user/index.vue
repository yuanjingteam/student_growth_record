<script setup>
// 导入 Vue Router 的 useRouter 函数
import { useRouter } from "vue-router";
import { ref } from "vue";

// 创建 Vue Router 的实例,用于进行页面导航
const router = useRouter();
// const res = await getUserInfo({ userId });
</script>

<template>
  <div class="my-w">
    <!-- 个人信息 -->
    <user-info />
    <!-- 我的操作 -->
    <div class="my-operation">
      <div class="op-icon">
        <p><i-icon icon="mingcute:calendar-time-add-line" /></p>
        我的成就
      </div>
      <div class="op-icon">
        <p><i-icon icon="mingcute:classify-2-fill" /></p>
        我的班级
      </div>
      <div class="op-icon">
        <p><i-icon icon="hugeicons:touch-interaction-04" /></p>
        我的互动
      </div>
      <div class="op-icon">
        <p><i-icon icon="mdi:account-convert" /></p>
        积分换算器
      </div>
    </div>
    <!-- 我的内容 -->
    <div class="my-content">
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
      <van-cell title="意见反馈" is-link @click="router.push('./feedBack')" />
      <van-cell title="设置" is-link @click="router.push('./sets')" />
    </div>
  </div>
</template>

<style scoped>
.my-w {
  overflow: hidden;
  height: 100%;
  margin: 0 10.3333vmin;
}
.my-operation {
  display: flex;
  background-color: #fff;
  margin: 10px 0;
  padding: 4.3333vmin 2.6667vmin;
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
  height: 240px;
  padding-top: 10px;
  background-color: #fff;
  border-radius: 10px;
}
.other {
  background-color: pink;
  padding: 3px;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 11px;
}
</style>
