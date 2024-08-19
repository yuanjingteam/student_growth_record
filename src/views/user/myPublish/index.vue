<script setup>
import { useRouter } from "vue-router";
import { getArticlePublish } from "@/api/user";
import { ref } from "vue";
import { useUserStore } from "@/store";
const router = useRouter();
const userStore = useUserStore();
const username = userStore.username;
const page = ref(0);
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
  } catch (error) {
    console.error("获取我发布的文章失败");
    finished.value = true;
  }
};
const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    page.value = 0;
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
</script>

<template>
  <van-empty
    v-if="list.length === 0"
    image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
    :image-size="80"
    description="页面努力加载中。。。"
    style="width: 100%; height: 100%"
  />
  <div class="main">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="router.push('/user')"
    />
    <div class="my-w">
      <user-info />
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
            :state="item.article_state"
            @click="console.log(1)"
          />
        </van-list>
      </van-pull-refresh>
    </div>
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
