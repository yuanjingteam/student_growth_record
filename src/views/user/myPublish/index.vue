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
// 子传父重新获取数据
const refresh = async () => {
  refreshing.value = true;
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
      <van-pull-refresh
        v-if="list.length > 0"
        v-model="refreshing"
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
            @informRefresh="refresh"
          />
        </van-list>
      </van-pull-refresh>
      <van-empty
        v-else
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        :image-size="80"
        description="这里空空如也~"
        style="width: 100%; height: 100%"
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
</style>
