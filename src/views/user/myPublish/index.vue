<script setup>
import { useRouter } from "vue-router";
import { getArticlePublish } from "@/api/user";
import { ref } from "vue";
import { useUserStore } from "@/store";
const router = useRouter();
const useStore = useUserStore();
const username = useStore.username;
const page = ref(1);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

// 获取我的文章
const loadData = async () => {
  try {
    const { data } = await getArticlePublish({
      username: username,
      page: page.value++,
      limit: 10
    });
    list.value = [...list.value, ...data.content];
    if (data.content.length == 0) {
      finished.value = true;
    }
  } catch (error) {
    finished.value = true;
  }
};
loadData();
const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    page.value = 1;
    refreshing.value = false;
  }
  await loadData();

  loading.value = false;
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

// 声明另一个子组件userInfo绑定
const userData = ref(null);
const refresh = async () => {
  // 子传父重新获取数据
  // 重新加载当前子组件user-card
  refreshing.value = true;
  onLoad();
  // 通知另一个组件userInfo刷新
  userData.value.UerInfo();
};
</script>

<template>
  <div class="main">
    <van-nav-bar
      left-text="返回"
      left-arrow
      fixed
      placeholder
      z-index="3"
      @click-left="router.go(-1)"
    />
    <div class="my-w">
      <user-info ref="userData" />
      <van-pull-refresh
        v-if="list.length > 0"
        v-model="refreshing"
        style="min-height: 100vh"
        pull-distance
        @refresh="onRefresh"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <user-card
            v-for="(item, index) in list"
            :key="index"
            :article="item"
            :state="item.article_status"
            :isban="item.ban"
            @informRefresh="refresh"
          />
        </van-list>
      </van-pull-refresh>
      <van-empty
        v-else
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        :image-size="80"
        description="这里空空如也~"
      />
    </div>
  </div>
  <van-back-top bottom="100px" />
</template>

<style scoped>
.main {
  background-color: #f0f1f5;
}
.my-w {
  overflow: hidden;
  margin: 0 10px;
}
.van-empty {
  width: 100vw;
  height: 100vh;
}
</style>
