<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 立即执行函数
// (function () {
//   console.log(data.value); //这段代码要用就会立马执行,不需要再调用
// })();

// 传入的数据
const data = ref({});

// 事件处理函数
</script>

<template>
  <div class="main">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="router.push('/user')"
    />
    <user-info>
      <template #class="classProps">
        <span class="other">{{ classProps.text }}</span>
      </template>
      <template #office="officeProps">
        <span class="other">{{ officeProps.text }}</span>
      </template>
    </user-info>
  </div>
</template>

<style scoped>
.main {
  background-color: #f0f1f5;
  height: 100%;
}
.my-w {
  overflow: hidden;
  height: 100%;
  margin: 0 10.3333vmin;
}
.other {
  border-radius: 5px;
  padding: 3px;
  background-color: #e5edff;
  margin-right: 10px;
  font-size: 12px;
}
</style>
