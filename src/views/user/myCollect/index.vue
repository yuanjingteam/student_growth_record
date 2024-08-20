<script setup>
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { getStar } from "@/api/user";
import { ref } from "vue";
const userStore = useUserStore();
const router = useRouter();
const myname = userStore.userData.name;
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const page = ref(0);

const userStar = ref([]);
const mystar = async () => {
  try {
    const { data } = await getStar({
      username: myname,
      page: page.value++
    });
    userStar.value = [...userStar.value, ...data.star];
  } catch {
    finished.value = true;
  }
};

const onLoad = async () => {
  if (refreshing.value) {
    userStar.value = [];
    page.value = 0;
    refreshing.value = false;
  }
  await mystar();
  console.log(page.value, 31313);

  loading.value = false;
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
  <van-empty
    v-if="userStar.length === 0"
    image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
    :image-size="80"
    description="页面努力加载中。。。"
    style="width: 100%; height: 100%"
  />
  <van-nav-bar
    left-text="返回"
    title="我的收藏"
    left-arrow
    @click-left="router.go(-1)"
  />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group v-for="(item, index) in userStar" :key="index">
        <van-cell @click="router.push(`/postDetail/${item.article_id}`)">
          <template #title
            >{{ item.name }}
            <div class="content">
              <van-text-ellipsis rows="2" :content="item.article_content" />
              <p class="remark">
                <span>{{ item.name }}</span>
                <span><i-icon icon="ph:eye-bold" />{{ item.like_total }}</span>
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
              width="3rem"
              height="3rem"
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
</template>
<style scoped>
.content {
  margin-top: 2px;
}
.van-image {
  margin: 2px 10px 0 5px;
}
.remark {
  margin: 5px 0 2px;
  font-size: 12px;
  span {
    margin: 0 2px;
  }
}
</style>
