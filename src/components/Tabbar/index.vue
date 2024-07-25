<template>
  <!-- 本组件为页面底部导航栏 -->
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed active-color="#000"
      inactive-color="#999">
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
      
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const active = ref(0);
const tabbarData = reactive([
  {
    icon: "wap-home",
    title: "首页",
    to: {
      name: "Demo"
    }
  },
  {
    icon: "browsing-history",
    title: "发现",
    to: {
      name: "Find"
    }
  },
  {
    icon: "chat",
    title: "通知",
    to: {
      name: "Inform"
    }
  },
  {
    icon: "contact",
    title: "我的",
    to: {
      name: "User"
    }
  }
]);
</script>
