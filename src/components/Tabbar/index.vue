<script setup lang="ts">
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useInformation } from "@/store";
const active = ref(0);

const infoStore = useInformation();
const total = computed(() => infoStore.total); // 计算属性获取 total

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

<template>
  <!-- 本组件为页面底部导航栏 -->
  <van-tabbar
    v-model="active"
    :placeholder="true"
    :route="true"
    fixed
    active-color="#000"
    inactive-color="#999"
  >
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      <template v-if="item.title == '通知'">
        <div v-if="total && total != 0">
          <van-badge :content="total" :offset="[5, -26]">
            {{ item.title }}
          </van-badge>
        </div>
        <div v-else>
          {{ item.title }}
        </div>
      </template>
      <template v-else>
        {{ item.title }}
        <!-- 默认样式 -->
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
