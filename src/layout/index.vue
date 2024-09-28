<script setup lang="ts">
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { computed } from "vue";

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <tabbar />
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

@font-family-medium: "思源宋体 Medium";

@font-face {
  font-family: @font-family-medium;
  src: url("../icons/song_2/lw9kIwcGVUnH.woff2") format("woff");
  font-weight: 400;
  font-style: normal;
}

/* 深色模式样式 */
.dark {
  background-color: black; /* 根元素的背景颜色 */
  color: white; /* 根元素的字体颜色 */
}

/* 其他元素的深色模式样式 */
.dark .app-wrapper {
  background-color: black;
  color: white;
}

.app-wrapper {
  .clearfix();
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f0f1f5;
  font-family: @font-family-medium, sans-serif;
}
</style>
