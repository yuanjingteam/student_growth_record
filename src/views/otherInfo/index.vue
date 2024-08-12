<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
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
    <van-nav-bar left-text="返回" left-arrow @click-left="router.go(-1)" />
    <div class="my-w">
      <user-info>
        <template #class="classProps">
          <span class="other">{{ classProps.text }}</span>
        </template>
        <template #office="officeProps">
          <span class="other">{{ officeProps.text }}</span>
        </template>
      </user-info>
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
  height: 100%;
}
.my-w {
  overflow: hidden;
  margin: 0 10px 20px;
}
.other {
  border-radius: 5px;
  padding: 3px;
  background-color: #e5edff;
  margin-right: 10px;
  font-size: 12px;
}
</style>
