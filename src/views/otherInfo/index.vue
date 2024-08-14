<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { getArticlePublish } from "@/api/user";
const router = useRouter();
const userStore = useUserStore();
const list = ref([]);
const page = ref(0);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const username = userStore.username;
// 获得他人文章信息
const articlePublish = async () => {
  const { data } = await getArticlePublish({
    username: username,
    page: page.value++
  });
  list.value = [...list.value, ...data.content];
  console.log(list.value);
};
articlePublish();
const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    page.value = 0;
    refreshing.value = false;
  }

  await articlePublish();
  console.log(page.value, 31313);

  loading.value = false;

  if (list.value.length >= 20) {
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
const show = ref(false);
const banwei = () => {
  show.value = true;
};
</script>

<template>
  <div class="main">
    <van-nav-bar left-text="返回" left-arrow @click-left="router.go(-1)" />
    <div class="my-w">
      <user-info>
        <template #other />
        <template #office />
      </user-info>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group inset>
          <cell-card
            v-for="(item, index) in list"
            :key="index"
            :article="item"
            @click="console.log(1)"
          />
        </van-cell-group>
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
  margin-bottom: 10px;
}

.ban {
  position: absolute;
  top: 0px;
  right: 100px;
  z-index: 20;
}
.ban .i-icon {
  float: left;
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
</style>
