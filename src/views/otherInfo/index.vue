<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getArticlePublish } from "@/api/user";
const router = useRouter();
const route = useRoute();
const list = ref([]);
const page = ref(1);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

// 解析路由参数
let username = route.params.username;
// 获得用户文章信息
const articlePublish = async () => {
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
  } catch {
    finished.value = true;
  }
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
</script>

<template>
  <div class="main">
    <van-nav-bar left-text="返回" left-arrow @click-left="router.go(-1)" />
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
            state="other"
            @click="console.log(1)"
          />
        </van-list>
      </van-pull-refresh>
      <van-empty
        v-else
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        :image-size="80"
        description="该用户还未公开文章"
        style="width: 100%; height: 100%"
      />
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

.van-pull-refresh {
  margin-top: 10px;
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
</style>
