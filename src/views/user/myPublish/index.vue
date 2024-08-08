<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<template>
  <div class="main">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="router.push('/user')"
    />
    <div class="my-w">
      <user-info />
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <cell-card v-for="item in list" :key="item" @click="console.log(1)" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
.main {
  background-color: #f0f1f5;
}
.my-w {
  overflow: hidden;
  margin: 0 10px;
}
</style>
