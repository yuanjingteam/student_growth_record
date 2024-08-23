<script setup>
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { getUserHistory } from "@/api/user";
import { ref } from "vue";
const userStore = useUserStore();
const router = useRouter();
const myname = userStore.userData.username;
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(1);

const userHistory = ref([]);
const mystar = async () => {
  try {
    const { data } = await getUserHistory({
      username: myname,
      page: page.value++,
      limit: 10
    });
    userHistory.value = [...userHistory.value, ...data.history];
    if (data.history.length == 0) {
      finished.value = true;
    }
  } catch {
    finished.value = true;
  }
};
mystar();
const onLoad = async () => {
  if (refreshing.value) {
    userHistory.value = [];
    page.value = 0;
    refreshing.value = false;
  }
  await mystar();
  console.log(page.value, 31313);

  loading.value = false;

  // 数据全部加载完成
  if (userHistory.value.length >= 20) {
    finished.value = true;
  }
};
// 刷新列表
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
  <van-nav-bar
    left-text="返回"
    title="浏览记录"
    left-arrow
    @click-left="router.go(-1)"
  />
  <div class="main">
    <van-pull-refresh
      v-if="userHistory.length > 0"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group v-for="(item, index) in userHistory" :key="index">
          <van-cell @click="router.push(`/postDetail/${item.article_id}`)">
            <template #title
              >{{ item.name }}
              <div class="content">
                <van-text-ellipsis rows="2" :content="item.article_content" />
                <p class="remark">
                  <!-- <span>{{ item.name }}</span> -->
                  <span
                    ><i-icon icon="ph:eye-bold" />{{ item.like_amount }}</span
                  >
                  <span
                    ><i-icon icon="lets-icons:comment" />{{
                      item.comment_amount
                    }}</span
                  >
                </p>
              </div>
            </template>
            <template #icon>
              <van-image
                round
                width="2rem"
                height="2rem"
                :src="item.user_headshot"
              />
            </template>
            <template #right-icon>
              <van-image
                v-if="item.article_pic"
                width="8rem"
                height="6rem"
                :src="item.article_pic"
                class="right"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <van-empty
      v-else
      image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
      :image-size="80"
      description="暂无浏览记录"
      style="width: 100%; height: 100%"
    />
  </div>
  <van-back-top bottom="100px" />
</template>
<style scoped>
.main {
  background-color: #f0f1f5;
  height: 100%;
}
.content {
  margin-top: 5px;
}
.van-image {
  margin: 0 10px 0 5px;
}
.remark {
  margin: 5px 0 2px;
  font-size: 12px;
  font-weight: 700;
  span {
    margin: 0 2px;
  }
}
</style>
